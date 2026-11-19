/**
 * 复制 cosmic-catalog 构建产物，供文档站点访问
 * 产物：packages/cosmic-web/src/public/catalog.json、catalog.<业务>.json
 */
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../../cosmic-catalog/dist');
const targetDir = path.join(__dirname, '../src/public');
const isCatalog = (name: string): boolean => /^catalog(?:\.[a-z][a-z0-9-]*)?\.json$/.test(name);

if (!fs.existsSync(path.join(sourceDir, 'catalog.json'))) {
    console.error('cosmic-catalog/dist/catalog.json 不存在，请先构建 cosmic-catalog');
    process.exit(1);
}

const catalogs = fs.readdirSync(sourceDir, {withFileTypes: true})
    .filter(entry => entry.isFile() && isCatalog(entry.name))
    .map(entry => entry.name);

fs.mkdirSync(targetDir, {recursive: true});
for (const name of catalogs) {
    fs.copyFileSync(path.join(sourceDir, name), path.join(targetDir, name));
}

// 删除已移除入口的旧产物，避免站点继续提供过期 Catalog。
for (const entry of fs.readdirSync(targetDir, {withFileTypes: true})) {
    if (entry.isFile() && isCatalog(entry.name) && !catalogs.includes(entry.name)) {
        fs.unlinkSync(path.join(targetDir, entry.name));
    }
}
