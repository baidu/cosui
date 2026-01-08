/**
 * @file build token for npm package
 */

import {resolve} from 'path';
import compileCss from './compile-css.mjs';

export default function token({root, packageName, terminal}) {
    return {
        name: 'rollup-plugin-token',
        async generateBundle() {
            const sourceDir = resolve(root, 'packages', packageName, 'src/token', `${terminal}/tokens.less`);
            const targetDir = resolve(root, 'packages', packageName, 'dist', terminal);
            await compileCss({
                targetDir,
                sourceDir,
                root,
                terminal,
                packageName,
                filename: 'tokens'
            });
        }
    }
}
