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
        ...commonProConfig()
    },
    {
        output: {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            exports: 'named'
        },
        ...commonProConfig()
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
        ...commonProConfig(),
        input: 'src/umd.ts',
        external: ['san']
    },
    {
        ...commonProConfig(),
        input: 'src/v2/index.ts',
        // Script consumers only need San; Zod is bundled in the v2 UMD build.
        external: ['san'],
        output: {
            file: 'dist/applet-context.umd.js',
            format: 'umd',
            name: 'CosuiAppletContext',
            exports: 'named',
            globals: {san: 'san'}
        }
    }
];
