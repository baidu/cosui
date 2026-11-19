/** @file Catalog 多格式构建 */
import typescript from '@rollup/plugin-typescript';
import ts from 'typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import entries from './entries.cjs';

const minify = () => terser({
    output: {
        comments: false
    },
    compress: {
        pure_funcs: ['console.log']
    }
});

export default commandLineArgs => {
    // TypeScript's watch compiler can retain FSWatchers across multiple builds.
    // One-shot builds only need file reads; keep real watchers for `dev --watch`.
    const compiler = commandLineArgs.watch ? ts : {
        ...ts,
        sys: {
            ...ts.sys,
            watchFile: () => ({close() {}}),
            watchDirectory: () => ({close() {}})
        }
    };
    const compile = () => typescript({typescript: compiler, tsconfig: './tsconfig.json', declaration: false});
    return entries.flatMap(({name, input, global}) => [
        {
            input,
            external: ['@cosui/cosmic-dynamic-ui', /^zod(?:\/|$)/],
            plugins: [compile(), minify()],
            output: [
                {file: `dist/${name}.esm.js`, format: 'es'},
                {file: `dist/${name}.cjs.js`, format: 'cjs', exports: 'named'}
            ]
        },
        {
            input,
            external: ['@cosui/cosmic-dynamic-ui'],
            plugins: [nodeResolve(), commonjs(), compile(), minify()],
            output: {
                file: `dist/${name}.umd.js`, format: 'umd', name: global, exports: 'named',
                globals: {'@cosui/cosmic-dynamic-ui': 'CosuiAppletContext'}
            }
        }
    ]);
};
