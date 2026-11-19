/** @file Applet 流式更新性能基准 */
/** Run after build. Optional first argument selects a previous CJS bundle for before/after comparison. */
const path = require('path');
const {createRequire} = require('module');
const {performance} = require('perf_hooks');
const {JSDOM} = createRequire(require.resolve('jest-environment-jsdom'))('jsdom');
const dom = new JSDOM('<!doctype html><body></body>');
global.window = dom.window;
global.document = dom.window.document;
global.Event = dom.window.Event;
// San otherwise allocates Node MessagePorts that keep this standalone benchmark alive.
global.MessageChannel = undefined;
const san = require('san');
const {z} = require('zod');
const phases = {};
function instrument(target, name, label) {
    const original = target[name];
    target[name] = function (...args) {
        const start = performance.now();
        try {
            return original.apply(this, args);
        }
        finally {
            const entry = phases[label] ||= {calls: 0, ms: 0};
            entry.calls++;
            entry.ms += performance.now() - start;
        }
    };
}
if (process.env.COSUI_PROFILE) {
    const ts = require('typescript');
    require.extensions['.ts'] = (module, file) => module._compile(ts.transpileModule(
        require('fs').readFileSync(file, 'utf8'),
        {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true}}
    ).outputText, file);
    const {AppletStore} = require('../src/v2/applet-store.ts');
    const {CatalogValidator} = require('../src/catalog/validator.ts');
    instrument(AppletStore.prototype, 'validateAppletState', 'protocolValidation');
    instrument(AppletStore.prototype, 'validateProps', 'renderedPropsValidation');
    instrument(CatalogValidator.prototype, 'validate', 'schemaValidation');
    instrument(san, 'parseExpr', 'parseExpression');
}
const api = process.env.COSUI_PROFILE ? require('../src/index.ts')
    : require(path.resolve(process.argv[2] || 'dist/index.cjs.js'));
const Text = san.defineComponent({template: '<span>{{value}}</span>'});
const Box = san.defineComponent({template: '<div><slot /></div>'});
const catalog = api.defineCatalog({$id: 'benchmark', version: '2.0', components: {
    Box: {children: true}, Text: {props: z.strictObject({value: z.string()})}
}, actions: {}});
const tick = () => new Promise(resolve => san.nextTick(resolve));
const percentile = (values, q) => [...values].sort((a, b) => a - b)[Math.floor((values.length - 1) * q)];
async function measure(count) {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const appletContext = new api.AppletContext({
        catalog, components: {Box, Text}, onAppletCreated: applet => applet.setRoot(host)});

    const children = Array.from({length: count}, (_, i) => ({id: 'n' + i, type: 'Text',
        props: {value: `node ${i}: {{value}}`}}));
    const created = appletContext.processMessage({version: '2.0', applet: {data: {value: 'initial'},
        components: [{id: 'root', type: 'Box', children}]}});
    if (!created.ok) {
        throw new Error(JSON.stringify(created));
    }
    await tick();
    const sync = [];
    const total = [];
    for (let i = 0; i < 70; i++) {
        const start = performance.now();
        const result = appletContext.processMessage({version: '2.0', updates: [{path: '/value', value: String(i)}]});
        const commit = performance.now();
        if (!result.ok) {
            throw new Error(JSON.stringify(result));
        }
        await tick();
        if (i >= 20) {
            sync.push(commit - start);
            total.push(performance.now() - start);
        }
    }
    if (host.querySelectorAll('span').length !== count || !host.textContent.includes('node 0: 69')) {
        throw new Error('Unexpected render output');
    }
    appletContext.dispose();
    host.remove();
    return {nodes: count, samples: sync.length,
        syncMedianMs: +percentile(sync, .5).toFixed(3), syncP95Ms: +percentile(sync, .95).toFixed(3),
        updateMedianMs: +percentile(total, .5).toFixed(3), updateP95Ms: +percentile(total, .95).toFixed(3)};
}
(async () => {
    const results = [];
    for (const count of [2, 100, 500]) {
        results.push(await measure(count));
    }
    console.log(JSON.stringify({environment: 'Node + jsdom, not browser paint timing', results,
        ...(process.env.COSUI_PROFILE ? {inclusivePhases: phases} : {})}, null, 2));
    dom.window.close();
})().catch(error => {
    console.error(error);
    process.exitCode = 1;
    dom.window.close();
});
