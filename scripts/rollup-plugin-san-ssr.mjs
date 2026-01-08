/**
 * @file wrap san-ssr for rollup
 */

import fs from 'fs';
import path from 'path';
import {cacheFreeRequire} from 'cache-free-require';
import {
    SanProject,
    markExternalComponent,
    cancelMarkExternalComponent
} from 'san-ssr';
import ejs from 'ejs';
import {fileURLToPath} from 'url';
import {camelCase} from 'lodash-es';

const __dirname = fileURLToPath(import.meta.url);

// NOTICE: 若存在需要在 ssr 阶段使用的工具函数，统一放在 src 或组件内部 util/common 目录下
const ssrUtilList = [
    '/util',
    '/common'
];

function isSSRUtil(name) {
    // 若是 cosmic 提供的工具函数，需要 external
    // NOTICE: 因此 cosmic util 不能在 ssr 阶段使用
    if (name.startsWith('@cosui/cosmic')) {
        return false;
    }
    for (const item of ssrUtilList) {
        if (name.includes(item)) {
            return true;
        }
    }
    return false;
}

export default function sanSSR({moduleName, deps}) {
    return {
        name: 'rollup-plugin-san-ssr',
        writeBundle(options, bundle) {
            if (options.format === 'cjs') {
                const ssrEntryData = [];

                Object.keys(bundle).forEach(fileName => {
                    const indexPath = `${options.dir}/${fileName}`;
                    const classPath = indexPath.replace('.js', '.class.js');
                    fs.copyFileSync(indexPath, classPath);

                    // 组件一级目录
                    const compDir = fileName.split('/')[0];
                    const compName = camelCase(compDir);

                    markExternalComponent({
                        isExternalComponent(specifier) {
                            // 入口需要正常引入，不能 external
                            return specifier !== indexPath
                                // 若存在需要在 ssr 阶段使用的工具函数，不能 external
                                && !isSSRUtil(specifier)
                                // 遇到正常组件，可以 external
                                && (
                                    specifier.startsWith('./')
                                    || specifier.startsWith('../')
                                    || specifier.startsWith('@cosui/cosmic')
                                )
                        }
                    });

                    // fix `pnpm sync` not updated bug by require from file without cache
                    let code = cacheFreeRequire(classPath, __dirname);
                    cancelMarkExternalComponent();

                    const components = Object.keys(code);
                    emitSanSSRHelper(options.dir);

                    if (components.includes('template')) {
                        const sanSSR = new SanProject();
                        code.id = 'default';
                        let render = sanSSR.compileToSource(code, 'js', {
                            useProvidedComponentClass: {
                                // componentName: 'default',
                                componentPath: `../${fileName.replace('.js', '.class.js')}`,
                            },
                            importHelpers: '../san-ssr-helper',
                        });
                        fs.writeFileSync(indexPath, formatSpecifier(render, compDir, moduleName, deps));

                        if (!ssrEntryData.find(item => item.compName === compName)) {
                            ssrEntryData.push({
                                compName,
                                classPath: classPath.replace(options.dir, '.'),
                                renderPath: indexPath.replace(options.dir, '.')
                            });
                        }
                    }
                    else {
                        // 不是 san 组件，删除 class.js 文件
                        if (fs.existsSync(classPath)) {
                            fs.unlinkSync(classPath);
                        }
                    }
                });

                makeSSREntry(ssrEntryData, options.dir);
            }
        }
    };
}

/**
 * - 没有 ssr entry，只支持结果页卡片中按需引用的写法
 * import Title from '@cosui/cosmic/Title/Title';
 * - 增加 ssr entry，可以支持解构引用的写法
 * import {Title, Paragraph} from '@cosui/cosmic';
 */
function makeSSREntry(data, dir) {
    const inputPath = path.resolve(__dirname, '../san-ssr-entry.ejs');
    const outputPath = path.resolve(dir, 'index.js');
    const input = fs.readFileSync(inputPath).toString();
    const output = ejs.render(input, {list: data});
    fs.writeFileSync(outputPath, output);
}

/**
 * 构造 san-ssr-helper
 *
 * @param {string} dir helper 函数根目录
 */
function emitSanSSRHelper(dir) {
    const sanProject = new SanProject();
    const helper = sanProject.emitHelpers('js');
    const filepath = path.resolve(dir, 'san-ssr-helper.js');
    fs.writeFileSync(filepath, helper);
}

/**
 * 替换 specifier 的相对路径为包路径
 *
 * @param {string} content render 代码
 * @param {string} name 组件名
 * @returns
 */
function formatSpecifier(content, componentName, moduleName, deps) {
    const version = deps && deps[moduleName] || '';
    let packageName = moduleName.replace('@cosui/', '');
    if (version) {
        packageName += `/${version}`;
    }
    return content
        // from:
        // {specifier: "../icon/index.js", id: "default"}
        // to:
        // {specifier: "@cosui/cosmic/1.0.1/icon"}
        // {specifier: "@cosui/cosmic/1.0.1/icon/id"}
        .replace(/(\{specifier\:\s)"(\.\.\/)([\w-\/]+)\/index\.js"(,\sid)/g, `$1"@cosui/${packageName}/$3"$4`)
        // from: {specifier: "./xx.js", id: "default"}
        // to: {specifier: "@cosui/cosmic/1.0.1/icon/xx"}
        .replace(/(\{specifier\:\s)"(\.\/)([\w-\/]+)\.js"(,\sid)/g, `$1"@cosui/${packageName}/${componentName}/$3"$4`)
}
