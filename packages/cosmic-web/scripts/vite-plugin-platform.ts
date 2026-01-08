import {resolve} from 'path';
import crypto from 'crypto';
import fs from 'fs';
import {ssrDocsHandler} from './ssr-docs';

const componentSplitedDict = new Map();
const md5 = content => crypto.createHash('md5').update(content).digest('hex').substring(0, 7);

const setPlatform = (platform, code) => code.replace(
    /import ([\S]+) from ['"]([\S]+)['"]/g,
    (...args) => {
        if (/(\.\.\/)+/g.test(args[2])) {
            return `import ${args[1]} from '${args[2]}?platform=${platform}'`;
        }
        return args[0];
    }
);
const idPattern = /import \{?([^\s}]+)\}? from ('|")@cosui\/(?!cosmic-dynamic-ui\b)(cosmic([\w-]+)?)\/?(\S*)('|");/g;
const replacePCComponentsId = code => code.replace(
    idPattern,
    (match: string, p1: string, p2: string, p3: string) => {
        return `import {${p1}} from '@cosui/${p3}/pc';`;
    }
);
const replaceMobileComponentsId = code => code.replace(
    idPattern,
    (match: string, p1: string, p2: string, p3: string) => {
        return `import {${p1}} from '@cosui/${p3}';`;
    }
);

/**
 * 从id中获取平台信息
 *
 * @param id 包含平台参数的id字符串
 * @returns 返回平台参数，如果未找到则返回undefined
 */
function getPlatformFromId(id: string) {
    const searchParams = new URLSearchParams(id.split('?')[1]);
    return searchParams.get('platform');
}

/**
 * 获取e2eCache中的数据
 * @param filePath 当前文件路径
 * @returns {}
 */
function getCacheData(filePath: string) {
    const path = filePath.split('?')[0];
    const lastIndex = path.lastIndexOf('/');
    if (lastIndex < 0) {
        return;
    }
    const cachePath = path.slice(0, lastIndex + 1) + 'e2e-cache.json';
    try {
        // 读取JSON文件,并解析成JSON对象
        const jsonData = fs.readFileSync(cachePath, 'utf8');
        return JSON.parse(jsonData);
    }
    catch (error) {
        return;
    }
}

/**
 * 修改文件引用路径，将组件引用路径改成相对引用e2e测试的文件
 * @param filePath 当前文件路径
 * @param virtualComponent 组件文档内容
 * @param type 类型，mobile或pc
 */
function changeReferencePath(filePath: string, virtualComponent: string, type: 'mobile' | 'pc' = 'mobile') {
    const cacheData = getCacheData(filePath);
    if (!cacheData) {
        return virtualComponent;
    }

    // 将@cosui/cosmic/radio类似的组件引用改成相对路径引用
    return virtualComponent.replace(new RegExp(`['"]${cacheData.name}['"]`, 'g'), `'${cacheData[type]}'`);
}

// path: './orange-outline.module.less';
// name: 'orange_outline'
function getNameFromPath(path: string) {
    const pathArr = path.split('/');
    const lastPath = pathArr[pathArr.length - 1];
    const filename = lastPath.split('.')[0];

    return filename.replace(/-/g, '_');
}

const ssrComponents = [
    'packages/cosmic/',
    'packages/cosmic-dqa/',
    'packages/cosmic-card/'
];

export default function () {

    return {
        name: 'vite-plugin-platform',
        enforce: 'post',
        async transform(raw, id) {
            const isE2e = process.env?.NODE_ENV_TYPE === 'e2e';
            if (/\/.*\.md\.Component([0-9a-z_])+\.vpms/.test(id)) {
                const component = id.replace(/\.Component([0-9a-z_])+\.vpms(\?[\S]+)?/, '');
                const cssModules = [];
                const cssModuleImports = [];
                const virTualModulePrefix = 'virtual:';
                // 将组件的内容里相对路径依赖替换成绝对路径，并作为虚拟模块输出
                let virtualComponent = raw.replace(
                    /import( {? ?([\w]+) ?}?)?( from)? ('|")(\.+\/[\S]+)('|");?/g, (...args) => {
                        const realPath = resolve(component, '../', args[5]);
                        const isGlobalImport = args[1] === undefined
                            && args[2] === undefined
                            && args[3] === undefined;
                        if (args[5].endsWith('.less')) {
                            if (isGlobalImport) {
                                const name = getNameFromPath(args[5]);
                                cssModules.push(`_${name}_code`);
                                cssModuleImports.push(`import _${name}_code from '${realPath}?inline';`);
                            }
                            else {
                                cssModules.push(`_${args[2]}_code`);
                                cssModuleImports.push(`import _${args[2]}_code from '${realPath}?inline';`);
                            }
                        }

                        return isGlobalImport
                            ? `import '${realPath}';`
                            : `import ${args[1]} from '${realPath}';`;
                    }
                );

                // e2e场景将组件的代码替换成对应的引用，默认不带platform参数引用mobile的组件
                if (isE2e && id.includes('/doc/')) {
                    const isPc = id.includes('platform=pc');
                    virtualComponent = changeReferencePath(id, virtualComponent, isPc ? 'pc' : 'mobile');
                }

                componentSplitedDict.set(component, virtualComponent);
                // 当前文件只输出两个平台虚拟模块的引用，以及依赖的cssModule的实际样式内容
                let bridge = '';
                if (cssModuleImports.length) {
                    bridge += `
                    ${cssModuleImports.reduce((str, imports) => `${str}${imports}\n`, bridge)}
                    const __styles = ${cssModules.join(' + ')};\nexport {__styles};\n
                    `;
                }

                const platform = getPlatformFromId(id);
                const rawMd5 = md5(raw);
                if (platform === 'pc') {
                    // eslint-disable-next-line
                    bridge += `export {default as PcPreviewDemo} from '${virTualModulePrefix}pc${component}.tmp${rawMd5}';`;
                }
                else if (platform === 'mobile') {
                    // eslint-disable-next-line
                    bridge += `export {default as MobilePreviewDemo} from '${virTualModulePrefix}mobile${component}.tmp${rawMd5}';`;
                }
                else {
                    // eslint-disable-next-line
                    bridge += `export {default as PcPreviewDemo} from '${virTualModulePrefix}pc${component}.tmp${rawMd5}';export {default as MobilePreviewDemo} from '${virTualModulePrefix}mobile${component}.tmp${rawMd5}';`;
                }

                bridge += 'let __ssrError = null;\n';
                bridge += 'let __pcRenderHtml = \'\';\n';
                bridge += 'let __mobileRenderHtml = \'\';\n';

                // 过滤 cosmic-chat 等无 ssr 产物的组件库
                if (isE2e
                    || process.env.RENDER_TYPE !== 'ssr'
                    || !ssrComponents.some(cmp => id.includes(cmp))
                ) {
                    bridge += `export {__pcRenderHtml};\n
                        export {__mobileRenderHtml};\n
                        export {__ssrError};\n`;
                    return bridge;
                }

                bridge = await ssrDocsHandler(id, platform, component, bridge);
                return bridge;
            }

            // e2e场景检测组件路径，解决分端实现的场景下偶现引用的组件路径不正确的问题
            if (isE2e && /virtual:.*?cosmic\/packages.*?\/doc\/.*?\.md/.test(id)) {
                const isPc = id.includes('virtual:pc');
                const firstSlashIndex = id.indexOf('/');
                // 取出第一个斜杠及其后面的内容
                const result = id.substring(firstSlashIndex);
                const cacheData = getCacheData(result);
                if (!cacheData || cacheData.mobile === cacheData.pc) {
                    return raw;
                }

                const rightStr = isPc ? cacheData.pc : cacheData.mobile;
                const errStr = isPc ? cacheData.mobile : cacheData.pc;

                if (raw.includes(errStr)) {
                    raw = raw.replace(new RegExp(`['"]${errStr}['"]`, 'g'), `'${rightStr}'`);
                }
            }

            return raw;
        },
        resolveId(id) {
            if (/virtual:(pc)|(mobile)|(component)\//.test(id)) {
                return '\0' + id;
            }
        },
        load(id) {
            if (/virtual:pc\//.test(id)) {
                const component = id.replace(/\0+virtual:pc/, '').replace(/\.tmp([0-9a-z_])+/, '');
                // 检测PC的示例的虚拟模块引用，内容都替换为PC平台的
                return setPlatform('pc', replacePCComponentsId(
                    componentSplitedDict.get(component)
                ));
            }
            if (/virtual:mobile\//.test(id)) {
                const component = id.replace(/\0+virtual:mobile/, '').replace(/\.tmp([0-9a-z_])+/, '');
                // 检测Wise的示例的虚拟模块引用，内容都替换为Wise平台的
                return setPlatform('mobile', replaceMobileComponentsId(
                    componentSplitedDict.get(component)
                ));
            }
        }
    };
}