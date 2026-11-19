/** @file Catalog 发布产物与解析器集成测试 */
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Ajv = require('ajv/dist/2020');
const runtime = require('@cosui/cosmic-dynamic-ui');
const {CATALOG} = require('../dist/index.cjs.js');

test('publishes one assembled Catalog and matching JSON artifact', () => {
    assert.deepEqual(Object.keys(require('../dist/index.cjs.js')), ['CATALOG']);
    const artifact = JSON.parse(fs.readFileSync(path.join(__dirname, '../dist/catalog.json'), 'utf8'));
    assert.deepEqual(artifact, runtime.exportCatalog(CATALOG));
    assert.equal(artifact.$id, 'cosui.v2');
    for (const type of ['Button', 'ImageGroup', 'CitationList', 'ProductCard', 'RoutePlanner']) {
        assert.ok(artifact.components[type]);
    }
    assert.equal(runtime.CATALOG, undefined);
});

test('exported component and action schemas compile as JSON Schema 2020-12', () => {
    const artifact = runtime.exportCatalog(CATALOG);
    const ajv = new Ajv({strict: false});
    ajv.addFormat('uri', true);
    const compile = schema => ajv.compile({$schema: artifact.$schema, ...schema, $defs: artifact.$defs});
    for (const component of Object.values(artifact.components)) {
        if (component.props) compile(component.props);
        for (const schema of Object.values(component.events || {})) {
            compile(schema);
        }
    }
    for (const action of Object.values(artifact.actions)) {
        if (action.args) compile(action.args);
    }
    assert.equal(compile(artifact.components.ImageGroup.props)({list: []}), true);
    assert.equal(compile(artifact.components.ImageGroup.props)({list: [{src: 123}]}), false);
});

test('host injects the external Catalog into a standalone renderer', () => {
    const context = new runtime.AppletContext({catalog: CATALOG});
    assert.equal(context.processMessage({version: '2.0', applet: {}}).ok, true);
    context.dispose();
    const esm = fs.readFileSync(path.join(__dirname, '../dist/index.esm.js'), 'utf8');
    assert.match(esm, /from\s*['"]@cosui\/cosmic-dynamic-ui['"]/);
    assert.match(esm, /from\s*['"]zod['"]/);
});

test('every usage example is a valid message for this Catalog', () => {
    const san = require('san');
    const Stub = san.defineComponent({template: '<div><slot /></div>'});
    const components = Object.fromEntries(Object.keys(CATALOG.definition.components).map(type => [type, Stub]));
    const actions = Object.fromEntries(Object.keys(CATALOG.definition.actions).map(name => [name, () => {}]));
    const examples = [...CATALOG.definition.usage.matchAll(/```json\n([\s\S]*?)\n```/g)]
        .map(match => JSON.parse(match[1]));
    assert.equal(examples.length, 3);
    assert.equal(examples.filter(message => message.applet).length, 1);
    assert.ok(examples[0].applet);
    const context = new runtime.AppletContext({catalog: CATALOG, components, actions});
    try {
        for (const message of examples) {
            const result = context.processMessage(message);
            assert.equal(result.ok, true, JSON.stringify(result.errors));
        }
    }
    finally {
        context.dispose();
    }
});

test('browser UMD Catalog works with the renderer UMD without a Zod global', () => {
    const sandbox = vm.createContext({san: require('san')});
    const runtimeDir = path.dirname(require.resolve('@cosui/cosmic-dynamic-ui'));
    vm.runInContext(fs.readFileSync(path.join(runtimeDir, 'applet-context.umd.js'), 'utf8'), sandbox);
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../dist/index.umd.js'), 'utf8'), sandbox);
    assert.equal(vm.runInContext(`
        const context = new CosuiAppletContext.AppletContext({catalog: CosuiCatalog.CATALOG});
        const result = context.processMessage({version: '2.0', applet: {}});
        context.dispose();
        result.ok;
    `, sandbox), true);
});


test('if and for accept bare and wrapped expressions while rejecting invalid syntax', () => {
    const san = require('san');
    const Stub = san.defineComponent({template: '<div />'});
    const check = fields => {
        const context = new runtime.AppletContext({catalog: CATALOG, components: {Markdown: Stub}});
        try {
            return context.processMessage({version: '2.0', applet: {
                data: {items: ['a'], visible: true},
                components: [{id: 'root', type: 'Markdown', props: {content: 'text'}, ...fields}]
            }});
        }
        finally {
            context.dispose();
        }
    };
    for (const condition of [true, false, 'items.length > 0', '{{items.length > 0}}', '/visible', '{{/visible}}']) {
        for (const loop of ['item in items', '{{item in items}}', 'item in /items', '{{item in /items}}']) {
            const result = check({if: condition, for: loop});
            assert.equal(result.ok, true, JSON.stringify(result.errors));
        }
    }
    for (const condition of ['', '   ', 'items.length >', 'items.length, true', {}]) {
        assert.equal(check({if: condition}).ok, false, JSON.stringify(condition));
    }
    const artifact = runtime.exportCatalog(CATALOG);
    const validate = new Ajv({strict: false}).compile({
        $schema: artifact.$schema, ...artifact.$defs.Component, $defs: artifact.$defs
    });
    for (const condition of [true, false, 'items.length > 0', '{{items.length > 0}}', '/visible', '{{/visible}}']) {
        assert.equal(validate({id: 'root', type: 'Markdown', if: condition}), true);
    }
    assert.equal(validate({id: 'root', type: 'Markdown', if: ''}), false);
});
