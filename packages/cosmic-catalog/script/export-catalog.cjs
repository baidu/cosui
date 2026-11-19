/** @file 为每个入口导出对应 Catalog JSON */
const fs = require('fs');
const path = require('path');
const {exportCatalog} = require('@cosui/cosmic-dynamic-ui');
const entries = require('./entries.cjs');
for (const {name, json} of entries) {
    const {CATALOG} = require(`../dist/${name}.cjs.js`);
    fs.writeFileSync(path.resolve(__dirname, '../dist', json),
        JSON.stringify(exportCatalog(CATALOG), null, 2) + '\n');
}
