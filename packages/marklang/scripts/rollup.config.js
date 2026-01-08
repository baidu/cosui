/* eslint-disable */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import ignore from './rollup-plugin-ignore.js';
import tsConfig from '../tsconfig.json';
const babelConfig = require('../babel.config.js');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
delete tsConfig.extends;
const resolveFile = function (filePath) {
    return path.join(__dirname, '..', filePath)
}

const extensions = ['.js', '.ts', '.cjs', '.mjs'];
module.exports = [
    {
        input: resolveFile('src/client.ts'),
        output: [{
            file: resolveFile('lib/browser.js'),
            format: 'umd',
            name: 'marklang'
        },
        {
            file: resolveFile('lib/browser.esm.js'),
            format: 'es',
        }],
        plugins: [
            nodeResolve({
                extensions,
            }),
            commonjs(),
            babel({
                ...babelConfig,
                extensions,
                filter(id) {
                    return true;
                },
                babelHelpers: 'bundled'
            }),
            terser(),
            ignore('browser')
        ]
    },
    {
        input: resolveFile('src/server.ts'),
        output: [{
            file: resolveFile('lib/node.js'),
            format: 'umd',
            name: 'marklang'
        },{
            file: resolveFile('lib/node.esm.js'),
            format: 'es',
        }],
        plugins: [
            nodeResolve({
                extensions,
            }),
            commonjs(),
            babel({
                ...babelConfig,
                extensions,
                filter(id) {
                    return true;
                },
                babelHelpers: 'bundled'
            }),
            terser(),
            ignore('node')
        ]
    },
];
