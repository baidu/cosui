/**
 * @file rollup.config.mjs
 */

import {commonPlugin} from './rollup.config.base.mjs';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.esm.js',
            format: 'es'
        },
        plugins: [
            ...commonPlugin
        ],
        watch: {
            // 监听 src 文件夹下的所有文件
            include: 'src/**',

            // 排除 node_modules 文件夹下的所有文件
            exclude: 'node_modules/**',
            chokidar: {

                // 在某些文件系统中，你可能需要开启轮询
                usePolling: true
            },

            // 每次重新编译时，不清除控制台输出
            clearScreen: false
        },
        external: [
            'san'
        ]
    }
];
