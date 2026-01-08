/**
 * @file 编译样式，用于自定义的 plugin
 */

import fs from 'fs';
import {resolve} from 'path';
import less from 'less';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import cssnano from 'cssnano';

/**
 * 编译 css
 *
 * @param {string} sourceDir src 原路径
 * @param {string} targetDir 编译产物路径
 * @param {string} root 仓库根路径
 * @param {string} terminal pc/mobile 端
 * @param {string} packageName 包名
 * @param {string} filename 样式文件名 index/tokens
 * @returns undefined
 */
export default async function compileCss({
    sourceDir, targetDir, root, terminal, packageName, filename
}) {
    if (!fs.existsSync(sourceDir)) {
        return;
    }
    const source = fs.readFileSync(sourceDir).toString();
    const lessOutput = await less.render(source, {
        paths: [
            resolve(root, 'packages', packageName, 'src'),
            resolve(root, 'packages', packageName, 'src/token', terminal),
            resolve(root, 'packages/cosmic/src/token', terminal),
        ]
    });
    const postcssOutput = await postcss([
        autoprefixer,
        cssnano
    ]).process(lessOutput.css);

    const content = postcssOutput.css;

    let targetFileName = `${filename}.css`;
    const targetFilepath = resolve(targetDir, targetFileName);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFilepath, content);
}
