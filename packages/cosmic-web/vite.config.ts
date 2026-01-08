import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import amd from 'rollup-plugin-amd';
import fs from 'fs';
import mdSan from 'vite-plugin-md-san';
import prismjs from 'vite-plugin-prismjs';
import mockUmd from './scripts/vite-plugin-umd-mock';
import mdPlatform from './scripts/vite-plugin-platform';
import pluginServer from './scripts/vite-plugin-server';

export const resolve = pathname => path.resolve(__dirname, '..', pathname);

const templatePath = resolve('cosmic-web/src/theme/preview.template');
const template = fs.readFileSync(templatePath, {encoding: 'utf-8'});
const templateWidget = fs.readFileSync(resolve('cosmic-web/src/theme/widget.template'), {encoding: 'utf-8'});

// https://vitejs.dev/config/
export default defineConfig((config => {
    process.env = {...process.env, ...loadEnv(config.mode, __dirname)};
    return {
        root: './src',
        base: process.env.NODE_ENV_TYPE === 'production' ? '/cosui/' : '/',
        define: {
            '__NAME__': JSON.stringify('Cosmic Design'),
            'process.env.ASSISTANT_HOST': JSON.stringify(process.env.VITE_ASSISTANT_HOST)
        },
        build: {
            rollupOptions: {
                input: {
                    'index': '/index.html',
                    'mobile/index': '/mobile/index.html'
                },
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            if (id.includes('echarts')) {
                                return 'vendor_echarts';
                            }
                            if (id.includes('lottie')) {
                                return 'vendor_lottie';
                            }
                            const chunk = id.toString().split('node_modules/')[1].split('/')[0];
                            return `vendor_${chunk}`;
                        }
                    }
                }
            },
            outDir: path.resolve(__dirname, 'dist'),
            reportCompressedSize: false,
            emptyOutDir: false
        },
        resolve: {
            alias: [
                {
                    find: /(@cosui\/cosmic\S+)/,
                    replacement: '$1',
                    customResolver(source, importer) {
                        const e2eReg = /.*\/\..*\.ts$/;
                        const cosmicReg = /(@cosui\/cosmic\S+)/;

                        // 不是 e2e 的文件或者不是引用组件，直接返回
                        // 只有e2e的ts引用相同package下的组件需要替换一下路径
                        if (!e2eReg.test(importer || '') || !cosmicReg.test(source || '')) {
                            return;
                        }

                        const sourceArr = source.split('/');
                        if (!sourceArr[1]) {
                            return;
                        }

                        const packagePath = `packages/${sourceArr[1]}/`;
                        const packagesPathReg = new RegExp(packagePath);

                        if (!packagesPathReg.test(importer || '')) {
                            return;
                        }

                        const isPc = importer?.includes('pc');

                        // 只有引用相同package的组件需要拼接一下路径
                        const endPath = `dist/${isPc ? 'pc' : 'mobile'}/${sourceArr[2]}/index.js`;
                        return resolve(`./cosmic-web/node_modules/${sourceArr[0]}/${sourceArr[1]}/${endPath}`);
                    }
                },
                {
                    find: 'tokens.less',
                    replacement: '',
                    customResolver(source, importer) {
                        // 检查 importer 是否包含特定字符串，以决定使用哪个路径
                        if (importer?.includes('cosmic-web')) {
                            return path.resolve(
                                __dirname,
                                'node_modules/@cosui/cosmic/src/token/pc/tokens.less'
                            );
                        }
                        if (importer?.includes('cosmic-card')) {
                            return path.resolve(
                                __dirname,
                                'node_modules/@cosui/cosmic/src/token/mobile/tokens.less'
                            );
                        }
                        if (importer?.includes('cosmic')) {
                            return path.resolve(__dirname, 'node_modules/@cosui/cosmic/src/token/mobile/tokens.less');
                        }
                    }
                },
                {
                    find: /^marklang(?:\/lib\/style\.css)?$/,
                    replacement: (matched: string) => {
                        // 匹配基础路径 → 指向 client.ts
                        if (matched === 'marklang') {
                            return resolve('./marklang/lib/browser.esm.js');
                        }
                        return matched;
                    }
                }
            ]
        },
        // server: {
        //     host: '0.0.0.0',
        //     port: 8999,
        //     open: true,
        //     hmr: {
        //         path: resolve('./packages')
        //     },
        //     proxy: {
        //         '/api': {
        //             target: 'http://apiserver',
        //             changeOrigin: true
        //         }
        //     }
        // },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    globalVars: {
                        // 'prefix': 'cos'
                    },
                    paths: [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, '../cosmic/src'),
                        path.resolve(__dirname, './src')
                    ]
                }
            },
            modules: {
                localsConvention: 'camelCaseOnly'
            }
        },
        // assetsInclude: ['**/*.md'],
        plugins: [
            prismjs({
                languages: ['ts', 'css']
            }),
            mdSan({
                template(data) {
                    let metadata = data.metadata && JSON.parse(data.metadata);
                    if (metadata.type === 'widget') {
                        return templateWidget;
                    }
                    return template;
                },
                export: 'component'
            }),
            amd({
                include: [
                    /versions-compare/
                ]
            }),
            mockUmd(),
            mdPlatform(),
            pluginServer()
        ],
        optimizeDeps: {
            include: [
                'san',
                'san-router'
            ],
            exclude: [
                'versions-compare'
            ]
        }
    };
}));
