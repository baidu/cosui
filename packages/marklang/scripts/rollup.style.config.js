/* eslint-disable */
import less from 'rollup-plugin-less';
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
                // 排除不需要编译的依赖包
                exclude: ['node_modules/**'],
                // CSS 输出文件
                output: 'lib/style.css'
            })
        ]
    }
];
