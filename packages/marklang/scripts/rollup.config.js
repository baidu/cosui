/* eslint-disable */
const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs').default;
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser').default;
const ignore = require('./rollup-plugin-ignore.js');
const injectDynamicLoader = require('./rollup-plugin-inject-loader.js');
const tsConfig = require('../tsconfig.json');
const babelConfig = require('../babel.config.js');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
delete tsConfig.extends;
const resolveFile = function (filePath) {
    return path.join(__dirname, '..', filePath)
}

const extensions = ['.js', '.ts', '.cjs', '.mjs'];

// 从 Rollup 环境变量获取 NODE_ENV，默认为 production
const isProduction = process.env.NODE_ENV !== 'development';

// 动态插件加载器代码（注入到 UMD wrapper 内部）
const pluginLoaderCode = `// 动态插件加载器 - 支持 AMD/CommonJS/全局变量
var _loadPlugin = (function() {
    var _pluginPaths = {
        './plugins/remark-math': 'marklangRemarkMath',
        './plugins/rehype-katex': 'marklangRehypeKatex',
        './plugins/rehype-highlight': 'marklangRehypeHighlight'
    };
    return function(path) {
        return new Promise(function(resolve, reject) {
            var globalName = _pluginPaths[path];
            if (typeof define === 'function' && define.amd) {
                var umdPath = path.replace('./plugins/', 'marklang/plugins/');
                require([umdPath], resolve, reject);
            } else if (typeof module === 'object' && module.exports) {
                try {
                    var umdPath = path.replace('./plugins/', 'marklang/plugins/');
                    resolve(require(umdPath));
                } catch (e) { reject(e); }
            } else if (typeof window !== 'undefined' && globalName && window[globalName]) {
                resolve(window[globalName]);
            } else if (typeof window !== 'undefined') {
                var script = document.createElement('script');
                script.src = path.replace('./plugins/', 'plugins/').replace('.js', '.umd.js');
                script.onload = function() { window[globalName] ? resolve(window[globalName]) : reject(new Error('Plugin global not found: ' + globalName)); };
                script.onerror = function() { reject(new Error('Failed to load plugin: ' + path)); };
                document.head.appendChild(script);
            } else {
                reject(new Error('Unknown environment for dynamic import: ' + path));
            }
        });
    };
})();
`;

module.exports = [
    // 核心包 - UMD 格式（兼容浏览器直接引用）
    {
        input: resolveFile('src/client.ts'),
        output: {
            file: resolveFile('lib/browser.js'),
            format: 'umd',
            name: 'marklang',
            intro: pluginLoaderCode
        },
        // 按需加载的插件单独打包，不包含在核心包中
        external: ['./plugins/remark-math', './plugins/rehype-katex', './plugins/rehype-highlight'],
        plugins: [
            nodeResolve({
                extensions,
                browser: true
            }),
            commonjs({
                include: /node_modules/
            }),
            babel({
                ...babelConfig,
                extensions,
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            ignore('browser'),
            injectDynamicLoader()
            // terser({
            //     compress: {
            //         drop_console: isProduction,
            //         drop_debugger: isProduction
            //     }
            // })
        ],
        treeshake: {
            preset: 'recommended',
            moduleSideEffects: false
        }
    },
    // 核心包 - ES 格式（支持 tree-shaking 和动态导入）
    {
        input: resolveFile('src/client.ts'),
        output: {
            file: resolveFile('lib/browser.esm.js'),
            format: 'es'
        },
        // ES 格式：将插件标记为外部依赖，由打包工具处理代码分割
        external: ['./plugins/remark-math', './plugins/rehype-katex', './plugins/rehype-highlight'],
        plugins: [
            nodeResolve({
                extensions,
                browser: true
            }),
            commonjs({
                include: /node_modules/
            }),
            babel({
                ...babelConfig,
                extensions,
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            ignore('browser'),
            injectDynamicLoader()
            // terser({
            //     compress: {
            //         drop_console: isProduction,
            //         drop_debugger: isProduction
            //     }
            // })
        ],
        treeshake: {
            preset: 'recommended',
            moduleSideEffects: false
        }
    },
    // remark-math 插件 - ES 格式
    {
        input: resolveFile('src/plugins/remark-math.ts'),
        output: {
            file: resolveFile('lib/plugins/remark-math.esm.js'),
            format: 'es'
        },
        plugins: [
            nodeResolve({
                extensions,
                browser: true
            }),
            commonjs({
                include: /node_modules/
            }),
            babel({
                ...babelConfig,
                extensions,
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser({
                compress: {
                    drop_console: isProduction,
                    drop_debugger: isProduction
                }
            })
        ],
        treeshake: {
            preset: 'recommended',
            moduleSideEffects: false
        }
    },
    // remark-math 插件 - UMD 格式
    {
        input: resolveFile('src/plugins/remark-math.ts'),
        output: {
            file: resolveFile('lib/plugins/remark-math.js'),
            format: 'umd',
            name: 'marklangRemarkMath'
        },
        plugins: [
            nodeResolve({
                extensions,
                browser: true
            }),
            commonjs({
                include: /node_modules/
            }),
            babel({
                ...babelConfig,
                extensions,
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser({
                compress: {
                    drop_console: isProduction,
                    drop_debugger: isProduction
                }
            })
        ],
        treeshake: {
            preset: 'recommended',
            moduleSideEffects: false
        }
    },
    // rehype-katex 插件 - ES 格式
    {
        input: resolveFile('src/plugins/rehype-katex.ts'),
        output: {
            file: resolveFile('lib/plugins/rehype-katex.esm.js'),
            format: 'es'
        },
        plugins: [
            nodeResolve({
                extensions,
                browser: true
            }),
            commonjs({
                include: /node_modules/
            }),
            babel({
                ...babelConfig,
                extensions,
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser({
                compress: {
                    drop_console: isProduction,
                    drop_debugger: isProduction
                }
            })
        ],
        treeshake: {
            preset: 'recommended',
            moduleSideEffects: (id) => id.includes('contrib/mhchem')
        }
    },
    // rehype-katex 插件 - UMD 格式
    {
        input: resolveFile('src/plugins/rehype-katex.ts'),
        output: {
            file: resolveFile('lib/plugins/rehype-katex.js'),
            format: 'umd',
            name: 'marklangRehypeKatex'
        },
        plugins: [
            nodeResolve({
                extensions,
                browser: true
            }),
            commonjs({
                include: /node_modules/
            }),
            babel({
                ...babelConfig,
                extensions,
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser({
                compress: {
                    drop_console: isProduction,
                    drop_debugger: isProduction
                }
            })
        ],
        treeshake: {
            preset: 'recommended',
            moduleSideEffects: (id) => id.includes('contrib/mhchem')
        }
    },
    // rehype-highlight 插件 - ES 格式
    {
        input: resolveFile('src/plugins/rehype-highlight.ts'),
        output: {
            file: resolveFile('lib/plugins/rehype-highlight.esm.js'),
            format: 'es'
        },
        plugins: [
            nodeResolve({
                extensions,
                browser: true
            }),
            commonjs({
                include: /node_modules/
            }),
            babel({
                ...babelConfig,
                extensions,
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser({
                compress: {
                    drop_console: isProduction,
                    drop_debugger: isProduction
                }
            })
        ],
        treeshake: {
            preset: 'recommended',
            moduleSideEffects: false
        }
    },
    // rehype-highlight 插件 - UMD 格式
    {
        input: resolveFile('src/plugins/rehype-highlight.ts'),
        output: {
            file: resolveFile('lib/plugins/rehype-highlight.js'),
            format: 'umd',
            name: 'marklangRehypeHighlight'
        },
        plugins: [
            nodeResolve({
                extensions,
                browser: true
            }),
            commonjs({
                include: /node_modules/
            }),
            babel({
                ...babelConfig,
                extensions,
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser({
                compress: {
                    drop_console: isProduction,
                    drop_debugger: isProduction
                }
            })
        ],
        treeshake: {
            preset: 'recommended',
            moduleSideEffects: false
        }
    },
    {
        input: resolveFile('src/server.ts'),
        output: [{
            file: resolveFile('lib/node.js'),
            format: 'umd',
            name: 'marklang'
        },{
            file: resolveFile('lib/node.esm.js'),
            format: 'es',
        }],
        plugins: [
            nodeResolve({
                extensions,
                preferBuiltins: true
            }),
            commonjs({
                include: /node_modules/
            }),
            babel({
                ...babelConfig,
                extensions,
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser({
                compress: {
                    drop_console: isProduction,
                    drop_debugger: isProduction
                }
            }),
            ignore('node')
        ],
        // Tree-shaking 配置：消除未使用的代码，减小输出文件体积
        treeshake: {
            // preset: 使用 Rollup 推荐的内置预设进行代码消除
            // 'recommended' 级别会在保持代码正确性的前提下最大程度消除死代码
            preset: 'recommended',
            // moduleSideEffects: 假设模块没有副作用
            // false 表示 Rollup 可以安全地移除未被使用的导入模块
            // 这对于库文件特别有用，因为库通常不依赖特定的执行顺序
            moduleSideEffects: false
        }
    },
];
