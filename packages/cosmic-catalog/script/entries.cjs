/** @file 自动发现全量和业务 Catalog 入口 */
const fs = require('node:fs');
const path = require('node:path');

module.exports = fs.readdirSync(path.resolve(__dirname, '../src'))
    .filter(file => /^index(?:\.[a-z][a-z0-9-]*)?\.ts$/.test(file))
    .sort()
    .map(file => {
        const name = file.slice(0, -3);
        const suffix = name.slice('index'.length);
        return {
            name,
            input: `src/${file}`,
            json: `catalog${suffix}.json`,
            global: `CosuiCatalog${suffix.slice(1).split('-').map(part =>
                part.charAt(0).toUpperCase() + part.slice(1)).join('')}`
        };
    });
