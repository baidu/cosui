import {resolve, dirname} from 'path';
import fs from 'fs';
import tmp from 'tmp';
import {rollup} from 'rollup';
// import image from '@rollup/plugin-image';
import virtual from '@rollup/plugin-virtual';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {cacheFreeRequire} from 'cache-free-require';
import {
    SanProject,
    markExternalComponent,
    cancelMarkExternalComponent
} from 'san-ssr';

interface TempFile {
    name: string;
    fd: number;
    removeCallback: () => void;
}

export const ssrDocsHandler = async function (
    id: string,
    platform: string | null,
    component: fs.PathOrFileDescriptor,
    bridge: string
) {
    let tempCjsComponent: TempFile | null = null;
    // 构建 SSR 产物
    try {
        const getRenderHTML = async (platform: 'pc' | 'mobile') => {
            const demoContent = fs.readFileSync(component, 'utf-8');
            const matches = demoContent.match(/```\s*san\s+export=preview\s+[^`\n]*\n([\s\S]*?)```/);
            if (!matches) {
                return '';
            }

            // 构建示例 commonjs 产物
            const bundle = await rollup({
                input: 'virtual-module.js',
                external: [
                    /@cosui\/cosmic/,
                    /^node_modules\//,
                    /^(\.{1,2}\/)?.*\.(less|css)$/,
                    'san'
                ],
                plugins: [
                    virtual({
                        'virtual-module.js': matches[1]
                    }),
                    {
                        name: 'custom-resolver',
                        resolveId(source) {
                            if (!/\.\w+$/.test(source) && (source.startsWith('./') || source.startsWith('../'))) {
                                const extensions = ['.ts', '.js', '.md'];
                                for (const ext of extensions) {
                                    const resolvedPath = resolve(dirname(component), `${source}${ext}`);
                                    if (fs.existsSync(resolvedPath)) {
                                        return resolvedPath;
                                    }
                                }
                            }
                            if (source.startsWith('./') || source.startsWith('../')) {
                                return resolve(component, '..', source);
                            }
                            return null;
                        }
                    },
                    nodeResolve(),
                    commonjs()
                    // base64 耗费内存，暂时不启用
                    // image()
                ]
            });

            if (!bundle) {
                throw new Error('generate bundle error');
            }

            // 生成 CommonJS 代码
            const {output} = await bundle.generate({
                format: 'cjs'
            });
            let componentCjsContent = output[0].code;

            // 标记外部组件，避免打包
            markExternalComponent({
                isExternalComponent(specifier) {
                    // 入口需要正常引入，不能 external
                    return specifier !== component
                        && (specifier.startsWith('@cosui')
                            || specifier.startsWith('./')
                            || specifier.startsWith('../')
                        );
                }
            });

            // 获取组件类
            let sanCmpClass = null;
            let initData = {};
            try {
                tempCjsComponent = tmp.fileSync({
                    tmpdir: resolve(id, '..'),
                    prefix: 'tempFile',
                    postfix: '.js'
                });
                fs.writeFileSync(tempCjsComponent!.name, componentCjsContent || '');
                sanCmpClass = cacheFreeRequire(tempCjsComponent!.name, __dirname);
                initData = sanCmpClass.prototype.initData ? sanCmpClass.prototype.initData() : {};
            }
            catch (e) {
                throw e;
            }
            finally {
                cancelMarkExternalComponent();
                // 删除临时文件
                tempCjsComponent && tempCjsComponent.removeCallback();
            }

            if (!sanCmpClass) {
                throw new Error('generate commonjs error');
            }

            // 构建 SSR 渲染函数
            const project = new SanProject();
            sanCmpClass.id = 'default';
            const render = project?.compileToRenderer(sanCmpClass);
            sanCmpClass = null;

            const regex = /^(@cosui\/(cosmic(-\w+)?))(?:\/)(.*)$/;
            const renderHtml = render(
                {
                    isPc: platform === 'pc',
                    ...initData
                },
                {
                    parentCtx: {
                        context: {
                            customSSRFilePath({specifier}) {
                                const match = specifier.match(regex);
                                if (match) {
                                    const packageName = match[2];
                                    const cmpNameArr = match[4].split('/');
                                    const cmpName = cmpNameArr[cmpNameArr.length - 1];
                                    const ssrCmpPath = `../dist/node_modules/@cosui/${
                                        packageName
                                    }/${
                                        platform === 'pc' ? 'pc' : ''
                                    }/${cmpName}`;
                                    const resolvePath = resolve(__dirname, ssrCmpPath);
                                    return resolvePath;
                                }
                                return specifier;
                            }
                        }
                    }
                }
            );
            return renderHtml;
        };

        if (platform === 'pc') {
            const renderHtml = await getRenderHTML(platform);
            bridge += `__pcRenderHtml = ${JSON.stringify(renderHtml)};\nexport {__pcRenderHtml};\n`;
        }
        else if (platform === 'mobile') {
            const renderHtml = await getRenderHTML(platform);
            bridge += `__mobileRenderHtml = ${JSON.stringify(renderHtml)};\n
                export {__mobileRenderHtml};\n`;
        }
        else {
            try {
                const [pcRenderHtml, mobileRenderHtml] = await Promise.all([
                    getRenderHTML('pc'),
                    getRenderHTML('mobile')
                ]);

                bridge += `__pcRenderHtml = ${JSON.stringify(pcRenderHtml)};\nexport {__pcRenderHtml};\n`;
                bridge += `__mobileRenderHtml = ${JSON.stringify(mobileRenderHtml)};\n
                    export {__mobileRenderHtml};\n`;
            }
            catch (e) {
                bridge += `__ssrError = ${JSON.stringify((e instanceof Error) ? e.message : '')};\n`;
                throw e;
            }
        }
        return bridge;
    }
    catch (err: unknown) {
        bridge += 'export {__pcRenderHtml};\n';
        bridge += 'export {__mobileRenderHtml};\n';
        bridge += 'export {__ssrError};\n';
        return bridge;
    }
    finally {
        // 删除临时文件
        tempCjsComponent && (tempCjsComponent as TempFile).removeCallback();
    }
};