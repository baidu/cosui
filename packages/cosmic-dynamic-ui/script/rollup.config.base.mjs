/**
 * @file rollup.config.mjs
 */

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const extensions = ['.js', '.ts'];
export const commonPlugin = [
    resolve({
        extensions,
    }),
    typescript({
        tsconfig: './tsconfig.json',
        declaration: false
    }),
    commonjs(),
    babel({
        extensions: extensions,
        babelHelpers: 'bundled',
        presets: [
            ['@babel/preset-env',
                {
                    // modules: false,
                    targets: {
                        node: 'current',
                        browsers: ['last 2 versions', 'ie >= 11']
                    }
                }
            ],
            '@babel/preset-typescript',
        ],
    })
];

export const commonProConfig = {
    input: 'src/index.ts',
    plugins: [
        ...commonPlugin,
        terser({
            output: {
                comments: false
            },
            compress: {
                pure_funcs: ['console.log']
            }
        })
    ],
    external: [
        'san'
    ]
}