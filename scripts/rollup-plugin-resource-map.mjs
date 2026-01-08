/**
 * @file rollup plugin for emit file: resource_map.js
 */

import fs from 'fs';
import {resolve} from 'path';
import mkdirp from 'mkdirp';
import swc from '@swc/core';
import crypto from 'crypto';
import rimraf from 'rimraf';

const getSource = (eslConfig, cssMap) => `module.exports = {
    map: ${JSON.stringify(JSON.stringify(eslConfig))},
    config: ${JSON.stringify(eslConfig)},
    css: ${JSON.stringify(cssMap)}
};`;

const getJs = style => `module.exports = ${style.trim()};`;

export default function resourceMap({
        moduleName, staticEntryFileName = 'index', publicPath, serverPath, clientPath, terminal, packageRoot
    }) {
    const assets = new Set();
    const moduleNameWithoutPrefix = moduleName.replace('@cosui/', '');

    return {
        name: 'rollup-plugin-resource-map',
        renderStart(options, inputOptions) {
            if (options.format === 'amd') {
                const staticEntryFilePath = `${options.dir}/${staticEntryFileName}.js`;
                mkdirp.sync(options.dir);
                let staticSourceDir = resolve(packageRoot, 'dist', terminal, `${staticEntryFileName}.js`);
                let staticEntryFileContent = fs.readFileSync(staticSourceDir).toString();
                if (staticEntryFileContent.trim() === '') {
                    return;
                }
                fs.writeFileSync(staticEntryFilePath, '');
            }
        },
        renderChunk(code, chunk, options) {
            if (options.format === 'amd') {
                const staticEntryFilePath = `${options.dir}/${staticEntryFileName}.js`;
                if (!fs.existsSync(staticEntryFilePath)) {
                    return;
                }

                const compName = chunk.fileName.split('/')[0];
                assets.add(`${moduleNameWithoutPrefix}/${compName}`);

                const newCode = code
                    // from: '../row/helper'
                    // to: 'cosmic/row/helper'
                    .replace(/\.\.\/([\w-\/]+)/g, `${moduleNameWithoutPrefix}/$1`)
                    // from: "cosmic/col/index"
                    // to: "cosmic/col"
                    .replace(/(cosmic[-\w]*\/[\w-]+)(\/index)?/g, '$1')
                    // from: './helper'
                    // to: 'cosmic/row/helper'
                    .replace(/\.\/([\w-\/]+)/g, `${moduleNameWithoutPrefix}/${compName}/$1`);

                fs.appendFileSync(staticEntryFilePath, newCode);
            }
        },
        async generateBundle(options, bundle) {
            if (options.format === 'amd') {

                const eslConfig = {
                    bundles: {},
                    paths: {}
                };
                let staticEntryFilePath = `${options.dir}/${staticEntryFileName}.js`;
                if (fs.existsSync(staticEntryFilePath)) {
                    let staticEntryFileContent = fs.readFileSync(staticEntryFilePath).toString();
                    const es5Code = swc.transformSync(staticEntryFileContent, {
                        jsc: {
                            minify: {
                                compress: true,
                                mangle: {
                                    keepFnNames: true
                                }
                            }
                        },
                        minify: true
                    }).code + '\n';
                    fs.writeFileSync(staticEntryFilePath, es5Code);
                    let md5 = crypto.createHash('md5').update(es5Code).digest('hex').substring(0, 8);
                    let staticEntryFileNameWithMd5 = `${staticEntryFileName}_${md5}`;
                    fs.renameSync(staticEntryFilePath, `${options.dir}/${staticEntryFileNameWithMd5}.js`);
                    const key = `${moduleNameWithoutPrefix}`;
                    eslConfig.bundles[key] = Array.from(assets);
                    eslConfig.paths[key] = `${publicPath.js[terminal]}/${moduleName}/${staticEntryFileNameWithMd5}`;
                }
                mkdirp.sync(serverPath);

                const cssMap = {};
                for (const css of ['tokens', 'index']) {
                    let sourceDir = resolve(packageRoot, 'dist', terminal, `${css}.css`);
                    if (!fs.existsSync(sourceDir)) {
                        continue;
                    }
                    const source = fs.readFileSync(sourceDir).toString();
                    const hash = crypto.createHash('md5')
                        .update(source)
                        .digest('hex').slice(-8);
                    const targetFileName = `${css}_${hash}.css`;
                    const targetFilepath = resolve(clientPath, targetFileName);

                    fs.writeFileSync(targetFilepath, source);

                    // 端外场景使用
                    const targetJsFilepath = resolve(serverPath, `${css}.css.js`)
                    const jsContent = getJs(JSON.stringify(source));
                    fs.writeFileSync(targetJsFilepath, jsContent);

                    cssMap[css] = `${publicPath.css[terminal]}/${moduleName}/${targetFileName}`;
                }

                fs.writeFileSync(`${serverPath}/resource_map.js`, getSource(eslConfig, cssMap));
            }
        },
        closeBundle() {

            // 删除原始静态文件入口，只保留带 hash 后缀的
            const staticEntryFile = resolve(clientPath, 'index.js');
            fs.existsSync(staticEntryFile) && rimraf.sync(staticEntryFile);
            rimraf.sync(clientPath + '/!(*.js|*.css)');
        }
    };
}
