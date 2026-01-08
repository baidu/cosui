import marklangHtml from "../src/server";
import marklang from "../src/client";
import {DirectiveInfo} from '../src/types';
import mockData from './utils';
const mlDataDirectives = {
    'ml-citation': (node: DirectiveInfo) => {
        const span = document.createElement('span');
        span.className = 'ml-citation';
        expect(node.properties?.data).toMatchObject(mockData.citationList);
        span.textContent = `ml-citation`;
        return span;
    }
};
const directives = {
    'ml-citation': (node: DirectiveInfo) => {
        const span = document.createElement('span');
        span.className = 'ml-citation';
        expect(node.properties?.test).not.toBeNull();
        span.textContent = `ml-citation`;
        return span;
    }
};

describe('Markdown Class', () => {

    it('should render footnote correctly', () => {
        const el = document.createElement('div');
        marklang().renderToElement(mockData.footnote, el);
        expect(el.querySelector('sup a#user-content-fnref-1')).not.toBeNull();
        expect(el.querySelector('section.footnotes li#user-content-fn-1')).not.toBeNull();
    });

    it('should render table correctly', () => {
        const el = document.createElement('div');
        marklang().renderToElement(mockData.collaspeTable, el);
        expect(el.querySelector('table')).not.toBeNull();
        expect(el.querySelector('table td[colspan="2"]')).not.toBeNull();
    });

    it('should render directives no-data correctly', () => {
        const el = document.createElement('div');
        marklang().renderToElement(mockData.nodataDirective, el);
        const citationEl = el.querySelector('ml-citation');
        expect(citationEl).not.toBeNull();
        expect(citationEl?.textContent).toBe('1');
        expect(citationEl?.getAttribute('test')).toContain('a');
        const data = citationEl?.getAttribute('data');
        expect(data).toBe('data1');
    });

    it('returnToElement: include ml-data', () => {
        const el = document.createElement('div');
        const citationList = marklang.dataToSource('citationList', mockData.citationList);
        marklang({
            directives: mlDataDirectives
        }).renderToElement(mockData.directive + citationList, el);
        expect(el.querySelector('span.ml-citation')).not.toBeNull();
    });

    it('returnToElement: called once more', () => {
        const el = document.createElement('div');
        marklang({
            transformers: {},
            directives
        }).renderToElement(mockData.directive, el);
        marklang({
            transformers: {},
            directives
        }).renderToElement(mockData.directive, el);
        expect(el.querySelector('ml-citation')).toBeNull();
        expect(el.querySelector('span.ml-citation')).not.toBeNull();
    });

    it('marklang options: directives return dom', () => {
        const el = document.createElement('div');
        marklang({
            transformers: {},
            directives
        }).renderToElement(mockData.directive, el);
        expect(el.querySelector('ml-citation')).toBeNull();
        expect(el.querySelector('span.ml-citation')).not.toBeNull();
    });

    it('marklang options: directives no ml-data', () => {
        const el = document.createElement('div');
        marklang({
            directives: {
                'ml-citation': (node, dom) => {
                    return dom as HTMLElement;
                }
            }
        }).renderToElement(mockData.nodataDirective, el);
        const citationEl = el.querySelector('ml-citation[data=data1]');
        expect(citationEl).not.toBeNull();
    });

    it('hydrate: empty html', () => {
        const el = document.createElement('div');
        el.innerHTML = '<!--s-data--><!--ml-data-->';
        marklang().hydrate(el);
        expect(el.innerHTML).toBe('<!--s-data--><!--ml-data-->');
    });
    it('hydrate: include ml-data', () => {
        const citationList = marklang.dataToSource('citationList', mockData.citationList);
        const html = marklangHtml({
            directives: {
                'ml-citation': () => ''
            }
        }).render(mockData.directive + citationList);
        const el = document.createElement('div');
        el.innerHTML = html;
        expect(el.querySelector('span.ml-citation')).toBeNull();
        marklang({
            directives: mlDataDirectives
        }).hydrate(el);
        expect(el.querySelector('span.ml-citation')).not.toBeNull();
    });

    it('hydrate: empty directive', () => {
        const html = marklangHtml({
            directives: {
                'ml-citation': () => ''
            }
        }).render(mockData.directive);
        const el = document.createElement('div');
        el.innerHTML = html;
        expect(el.querySelector('span.ml-citation')).toBeNull();
        marklang({
            directives
        }).hydrate(el);
        expect(el.querySelector('span.ml-citation')).not.toBeNull();
    });
    it('hydrate: default directive', () => {
        const html = marklangHtml({
            directives: {
                'ml-citation': () => ''
            }
        }).render(mockData.directive);
        const el = document.createElement('div');
        el.innerHTML = html;
        expect(el.querySelector('span.ml-citation')).toBeNull();
        marklang({
            directives
        }).hydrate(el);
        expect(el.querySelector('span.ml-citation')).not.toBeNull();
    });


    it('dataToSource: not json', () => {
        const el = document.createElement('div');
        let citationSource = marklang.dataToSource('citationList', undefined);
        expect(() => {
            marklang({
                directives: mlDataDirectives
            }).renderToElement(mockData.directive + citationSource, el);
        }).toThrow();

        let obj = {};
        // @ts-ignore
        obj.a = obj;
        citationSource = marklang.dataToSource('citationList', obj);
        expect(() => {
            marklang({
                directives: mlDataDirectives
            }).renderToElement(mockData.directive + citationSource, el);
        }).toThrow();
    });

    describe('Autolink Options', () => {
        it('should auto-convert URLs to links when autolink is enabled', () => {
            const el = document.createElement('div');
            const text = 'Visit https://example.com and http://test.com/path?query=123';
            
            marklang({
                autolink: true
            }).renderToElement(text, el);

            const links = el.querySelectorAll('a');
            expect(links.length).toBe(2);
            expect(links[0].href).toBe('https://example.com/');
            expect(links[1].href).toBe('http://test.com/path?query=123');
            expect(links[0].textContent).toBe('https://example.com');
            expect(links[1].textContent).toBe('http://test.com/path?query=123');
        });

        it('should not convert URLs to links when autolink is disabled', () => {
            const el = document.createElement('div');
            const text = 'Visit https://example.com and http://test.com';
            
            marklang({
                autolink: false
            }).renderToElement(text, el);

            const links = el.querySelectorAll('a');
            expect(links.length).toBe(0);
            expect(el.textContent).toContain('https://example.com');
            expect(el.textContent).toContain('http://test.com');
        });

        it('should not convert URLs in code spans when autolink is enabled', () => {
            const el = document.createElement('div');
            const text = '`https://code.com` and https://normal.com';
            
            marklang({
                autolink: true
            }).renderToElement(text, el);

            const links = el.querySelectorAll('a');
            expect(links.length).toBe(1);
            expect(links[0].href).toContain('normal.com');
            expect(el.querySelector('code')?.textContent).toBe('https://code.com');
        });
    });

    it('should handle multiple camelCase properties correctly', () => {
        const el = document.createElement('div');
        const markdown = ':ml-citation[test]{fontSize="12px" textAlign="center" testkey="testValue"}';

        marklang({
            directives: {
                'ml-citation': (node) => {
                    expect(node.properties?.fontSize).toBe('12px');
                    expect(node.properties?.textAlign).toBe('center');
                    expect(node.properties?.testkey).toBe('testValue');
                    const el = document.createElement('div');
                    el.className = 'ml-citation';
                    Object.keys(node.properties).forEach(key => {
                        el.setAttribute(key, node.properties[key]);
                    });
                    return el;
                }
            }
        }).renderToElement(markdown, el);
    });

    it('dataToAst: should parse markdown to AST', () => {
        const markdown = '# Hello World';
        const ast = marklang.dataToAst(markdown);
        
        // Check that the result is a Root node
        expect(ast).toBeDefined();
        expect(ast.type).toBe('root');
        
        // Check that it contains a heading node
        const children = ast.children;
        expect(children.length).toBeGreaterThan(0);
        expect(children[0].type).toBe('heading');
        
        // Check heading properties
        const heading = children[0];
        expect(heading.depth).toBe(1);
        expect(heading.children[0].type).toBe('text');
        expect(heading.children[0].value).toBe('Hello World');
    });

    it('dataToAst: should handle complex markdown', () => {
        const markdown = '# Heading\n\nParagraph with **bold** and *italic* text.\n\n```js\nconsole.log("code block");\n```';
        const ast = marklang.dataToAst(markdown);
        
        // Check that the result is a Root node with multiple children
        expect(ast).toBeDefined();
        expect(ast.type).toBe('root');
        
        const children = ast.children;
        expect(children.length).toBe(3); // heading, paragraph, and code block
        
        // Check heading
        expect(children[0].type).toBe('heading');
        
        // Check paragraph with formatting
        expect(children[1].type).toBe('paragraph');
        
        // Check code block
        expect(children[2].type).toBe('code');
        const codeBlock = children[2];
        expect(codeBlock.lang).toBe('js');
        expect(codeBlock.value).toBe('console.log("code block");');
    });
});
