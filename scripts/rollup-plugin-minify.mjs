/**
 * @file minify server file
 */

import fs from 'fs';
import { glob } from 'glob';
import * as terser from 'terser';

export default function minify() {
    return {
        name: 'rollup-plugin-minify',
        async writeBundle(options, bundle) {
            if (options.format === 'cjs') {
                const files = glob.sync(`${options.dir}/**/*.js`);
                for (const file of files) {
                    const content = fs.readFileSync(file).toString();
                    const result = await terser.minify(content, {
                        sourceMap: true
                    });
                    fs.writeFileSync(file, result.code);
                }
            }
        }
    }
}
