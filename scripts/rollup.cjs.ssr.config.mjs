/**
 * @file 构建配置，产出组件 CJS 和 San-SSR 产物，用于 cosmic-web 预览 SSR 场景
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
import {externalLibs, externalLibsExcludeInServer, COSMIC_PACKAGE_EXTERNAL_CONFIG, parseExternalPath} from './external-libs.mjs';
import {getEntries, getComponentPath} from './get-entries.mjs';
import alias from '@rollup/plugin-alias';
import token from './rollup-plugin-token.mjs';
import commonjs from '@rollup/plugin-commonjs';
import sanSSR from './rollup-plugin-san-ssr.mjs';
import removeLibsInServer from './rollup-plugin-remove-libs-in-server.mjs';

const __dirname = fileURLToPath(import.meta.url);
const tsConfig = JSON.parse(readFileSync(resolve(__dirname, '../../tsconfig.json')));

function excludeFileInCJS(fileToExclude) {
    return {
        name: 'exclude-file-in-cjs',
        generateBundle(options, bundle) {
            if (options.format === 'cjs') {
                // 遍历 bundle，删除特定的文件
                Object.keys(bundle).forEach((fileName) => {
                    if (bundle[fileName]?.facadeModuleId === fileToExclude) {
                        delete bundle[fileName];
                    }
                });
            }
        }
    }
};

function getCommonOutputOptions({packageName, terminal}) {
    return {
        // 不保留源码中的模块目录结构，使用 rollup 处理 bundle
        // 若单文件使用的 chunk 会默认打在文件内，多文件复用根据 chunkFileNames 中配置的处理
        preserveModules: false,
        // 不提升组件内的依赖到入口
        hoistTransitiveImports: false,

        chunkFileNames(chunkInfo) {
            const moduleId = Object.keys(chunkInfo.modules)[0];
            const pathArray = moduleId.split('/');
            const index = pathArray.indexOf('src');
            const dir = pathArray[index + 1];
            // 非 src 下的 chunk 统一放在 util 里
            return dir ? `${dir}/[name].js` : 'util/chunk-[name].js';
        },
        assetFileNames(assetInfo) {
            return assetInfo?.name?.replace(`.${terminal}`, '');
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
    };
}

function getCJSOutputOptions({packageName, root, terminal}) {
    return {
        format: 'cjs',
        dir: resolve(root, 'packages/cosmic-web/dist/node_modules/@cosui', packageName, terminal === 'pc' ? terminal : ''),
        entryFileNames() {
            return '[name].js';
        },
        chunkFileNames() {
            return '[name].js';
        },
        paths(id) {
            const {matchCosmicExternal, depPkgName, depComponentPath} = parseExternalPath(packageName, id);
            if (!matchCosmicExternal) {
                return id;
            }

            return join(depPkgName, terminal === 'mobile' ? '' : terminal, depComponentPath);
        },
        sourcemap: false,
        exports: 'auto',
        ...getCommonOutputOptions({packageName, terminal}),
    };
}

function getPluginOptions({root, terminal, packageName, moduleName}, str, startTime) {
    return [
        excludeFileInCJS(resolve(root, 'packages', packageName, `src/index.${terminal}.ts`)),
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
        commonjs(),
        esbuild({
            tsconfig: resolve(__dirname, '../../tsconfig.json'),
            target: 'es2019',
            charset: 'utf8'
        }),
        styles({
            mode: "extract",
            plugins: [
                autoprefixer(),
                cssnano()
            ],
            less: {
                paths: [
                    resolve(root, 'packages/cosmic/src/token', terminal),
                    resolve(root, 'packages', packageName, 'src')
                ]
            }
        }),
        token({root, packageName, terminal}),
        removeLibsInServer([...externalLibsExcludeInServer]),
        sanSSR({
            moduleName,
            deps: {
                excludeExtensions: ['.less', '.css']
            }
        })
    ];
}

/**
 *
 * @param {object} options
 * @param {string} [options.package = cosmic] - 目标编译包名
 * @param {string} [options.watch = false] - watch模式
 *
 */
export function getRollupOptions(options = {}) {

    const root = options.root || resolve(__dirname, '../../');
    const packageNames = options.package
        ? [options.package]
        : ['cosmic', 'cosmic-dqa', 'cosmic-card', 'cosmic-shop'];
    const terminal = options.terminal || 'all';

    return packageNames.flatMap(packageName => {
        const packageRoot = resolve(root, 'packages', packageName);
        const json = JSON.parse(readFileSync(resolve(packageRoot, 'package.json')));
        const moduleName = json.name;

        const externalCosmicPackage = COSMIC_PACKAGE_EXTERNAL_CONFIG[packageName] ||  COSMIC_PACKAGE_EXTERNAL_CONFIG.default;
        const external = [
            ...externalCosmicPackage.external,
            ...externalLibs,
            ...builtinModules.flatMap(p => [p, `node:${p}`])
        ];

        function createConfig(terminal) {
            console.log(`==========开始编译 ${packageName} ${terminal} 端==========\n`);
            const startTime = Date.now();
            const config = {
                input: [
                    ...getEntries(packageRoot, terminal),
                    resolve(root, 'packages', packageName, `src/index.${terminal}.ts`)
                ],
                output: [
                    getCJSOutputOptions({ packageName, root, terminal})
                ],
                external,
                plugins: getPluginOptions({root, packageName, terminal, moduleName}, 'common', startTime)
            };

            config.plugins.push({
                writeBundle() {
                    const endTime = Date.now();
                    console.log(`==========完成编译 ${packageName} ${terminal} 端，耗时: ${Math.floor((endTime - startTime) / 1000)}s==========`);
                }
            });
            return config;
        }

        if (terminal === 'all') {
            return [
                createConfig('mobile'),
                createConfig('pc'),
            ];
        }

        return [
            createConfig(terminal)
        ];
    });
}