/**
 * @file build 入口（编译组件 CJS 产物，用于 cosmic-web 预览 SSR 场景）
 */

import {program} from 'commander';
import {getRollupOptions} from './rollup.cjs.ssr.config.mjs';
import {rollup, watch} from 'rollup';

program
    .option('-p, --package <string>', 'Package')
    .option('-w, --watch', 'Watch')
    .option('-t, --terminal <string>', 'Terminal')
    .option('-c, --component <array>', 'Component', val => val.split(','));

program.parse();
const opts = program.opts();

async function build() {
    const options = getRollupOptions(opts);

    try {
        for (const option of options) {
            const bundle = await rollup(option);
            for (const outputOption of option.output) {
                await bundle.write(outputOption);
            }
            if (opts.watch) {
                const watchOptions = getRollupOptions(opts);
                if (opts.component) {
                    for (const watchOption of watchOptions) {
                        watchOption.input = watchOption.input.filter(path => opts.component.some(component => path.includes(component)));
                    }
                }
                // watch 需要重新获取 config
                const watcher = watch(watchOptions);
                watcher.on('event', (event) => {
                    if (event.code === 'BUNDLE_START') {
                        console.log(`[${event.code}]`, (event.input || []).join('\n'));
                    }
                    if (event.code === 'BUNDLE_END') {
                        console.log(
                            `[${event.code}] ====>`,
                            (event.output || []).join('\n'),
                        );
                    }
                });
            }
            await bundle.close();
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

build();