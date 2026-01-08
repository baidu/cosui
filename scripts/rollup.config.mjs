/**
 * @file 构建配置，产出组件 ES 产物，用于发布 npm package
 */

import {builtinModules} from 'module';
import {resolve, join} from 'path';
import {fileURLToPath} from 'url';
import {readFileSync} from 'fs';
import multiInput from 'rollup-plugin-multi-input';
import esbuild from 'rollup-plugin-esbuild';
import nodeResolve from '@rollup/plugin-node-resolve';
import styles from "rollup-plugin-styles";
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import {externalLibs, COSMIC_PACKAGE_EXTERNAL_CONFIG, parseExternalPath} from './external-libs.mjs';
import {getEntries, getComponentPath} from './get-entries.mjs';
import alias from '@rollup/plugin-alias';
import token from './rollup-plugin-token.mjs';

const __dirname = fileURLToPath(import.meta.url);
const tsConfig = JSON.parse(readFileSync(resolve(__dirname, '../../tsconfig.json')));

/**
 *
 * @param {object} options
 * @param {string} [options.package = cosmic] - 目标编译包名
 * @param {string} [options.watch = false] - watch模式
 *
 */
export function getRollupOptions(options = {}) {

    const root = options.root || resolve(__dirname, '../../');
    const packageName = options.package || 'cosmic';
    const packageRoot = resolve(root, 'packages', packageName);
    const json = JSON.parse(readFileSync(resolve(packageRoot, 'package.json')));
    const moduleName = json.name; // '@cosui/cosmic-card'
    const terminal = options.terminal || 'all';

    const externalCosmicPackage = COSMIC_PACKAGE_EXTERNAL_CONFIG[packageName] ||  COSMIC_PACKAGE_EXTERNAL_CONFIG.default;

    const external = [
        ...externalCosmicPackage.external,
        ...externalLibs,
        ...builtinModules.flatMap(p => [p, `node:${p}`])
    ];

    function createConfig(terminal) {
        return {
            input: [
                ...getEntries(packageRoot, terminal),
                resolve(root, 'packages', packageName, `src/index.${terminal}.ts`)
            ],
            output: getOutputOptions({packageName, root, terminal}),
            external,
            plugins: getPluginOptions({root, packageName, terminal, moduleName}),
        };
    }

    if (terminal === 'all') {
        return [createConfig('mobile'), createConfig('pc')];
    }

    return [createConfig(terminal)];
}


function getOutputOptions({packageName, root, terminal}) {
    return [
        {
            format: 'es',
            dir: resolve(root, 'packages', packageName, 'dist', terminal),
            sourcemap: 'hidden',
            // 不保留源码中的模块目录结构，使用 rollup 处理 bundle
            // 若单文件使用的 chunk 会默认打在文件内，多文件复用根据 chunkFileNames 中配置的处理
            preserveModules: false,
            // 不提升组件内的依赖到入口
            hoistTransitiveImports: false,

            /**
             * 处理业务组件中引用通用组件的情况：业务组件中引用的通用组件已经被 external，所以只能在 paths 中处理，不能在 alias 插件中处理
             * from: import "@cosui/cosmic/xxx"
             * to:
             * - pc: import "@cosui/cosmic/pc/xxx"
             * - mobile: import "@cosui/cosmic/xxx"
             */
            paths(id) {
                const {matchCosmicExternal, depPkgName, depComponentPath} = parseExternalPath(packageName, id);
                if (!matchCosmicExternal) {
                    return id;
                }

                return join(depPkgName, terminal === 'mobile' ? '' : terminal, depComponentPath);
            },
            entryFileNames() {
                return '[name].js';
            },
            chunkFileNames(chunkInfo) {
                const moduleId = Object.keys(chunkInfo.modules)[0];
                const pathArray = moduleId.split('/');
                const index = pathArray.indexOf('src');
                const dir = pathArray[index + 1];
                // 非 src 下的 chunk 统一放在 util 里
                return dir ? `${dir}/[name].js` : 'util/chunk-[name].js';
            },
            assetFileNames(assetInfo) {
                return assetInfo.name.replace(`.${terminal}`, '');
            },
            /**
             * 将 src/util 下的文件打成单独的 chunk，避免 rollup 的默认打包会合并组件&util 代码
             */
            manualChunks(moduleId) {
                if (moduleId.includes('src/util')) {
                    const match = moduleId.match(/util\/([^\/]+)\.\w+$/);
                    if (match) {
                        return match[1];
                    }
                }
            }
        }
    ];
}

function getPluginOptions({root, terminal, packageName, moduleName}) {
    return [
        alias({
            entries: [
                {
                    find: /\/\@\/(\S+)/,
                    replacement: `${moduleName}-${terminal}/$1`,
                },
                {
                    find: /(@cosui\/cosmic\S+)/,
                    replacement: '$1',

                    /**
                     * 处理通用组件或业务组件的内部组件之间引用的情况：改为相对路径引用
                     * from: import '@cosui/cosmic-card/link'
                     * to:
                     * - import '../link'
                     * - import '../link/pc' | '../link/mobile'
                     * - import '../../link'
                     * - import '../../link/pc' | '../../link/mobile'
                     */
                    customResolver(source) {
                        const sourceModuleName = join(source.split('/')[0], source.split('/')[1]);
                        const componentName = source.split('/')[2];

                        if (sourceModuleName === moduleName) {
                            return getComponentPath(terminal, componentName);
                        }

                        return source;
                    }
                }
            ]
        }),
        multiInput.default({
            relative: resolve(root, 'packages', packageName, 'src'),
            transformOutputPath(output, input) {
                return output
                    .replace(`.${terminal}`, '')
                    .replace(`/${terminal}`, '');
            }
        }),
        nodeResolve({
            resolveOnly: [
                'merge'
            ],
            mainFields: ['module'],
            exportConditions: ['node']
        }),
        styles({
            mode: "extract",
            plugins: [
                autoprefixer(),
                cssnano()
            ],
            less: {
                paths: [
                    // resolve(root, 'packages', packageName, 'src/token', terminal),
                    resolve(root, 'packages/cosmic/src/token', terminal),
                    resolve(root, 'packages', packageName, 'src')
                ]
            }
        }),
        token({root, packageName, terminal}),
        esbuild({
            tsconfig: resolve(__dirname, '../../tsconfig.json'),
            target: 'es2019',
            charset: 'utf8'
        }),
    ];
}
