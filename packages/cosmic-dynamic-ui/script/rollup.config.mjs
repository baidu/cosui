/**
 * @file rollup.config.mjs
 */

import {commonProConfig} from './rollup.config.base.mjs';

export default [
    {
        output: {
            file: 'dist/index.esm.js',
            format: 'es'
        },
        ...commonProConfig
    },
    {
        output: {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            exports: 'named'
        },
        ...commonProConfig
    },
    {
        output: {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'UIJSON',
            globals: {
                'san': 'san'
            }
        },
        ...commonProConfig
    }
];
