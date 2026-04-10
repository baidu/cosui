/* eslint-disable */
const less = require('rollup-plugin-less');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const resolveFile = function (filePath) {
    return path.join(__dirname, '..', filePath)
}
module.exports = [
    {
        input: resolveFile('src/less/index.less'),
        output: {
            // css module
            file: resolveFile('lib/style.js')
        },
        plugins: [
            less({
                exclude: ['node_modules/**'],
                output: 'lib/style.css',
                sourceMap: true,
                minify: true
            })
        ],
        treeshake: {
            preset: 'recommended',
            moduleSideEffects: false
        }
    }
];
