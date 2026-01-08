import marklang from "../src/server";
import {DirectiveInfo, HastTransformerParam} from '../src/types';
import {Link, Root, Heading, Paragraph, Code} from 'mdast';
import mockData from './utils';
import {describe, it, expect, jest} from '@jest/globals';

describe('Markdown Class', () => {
    it('render: options directives return two root nodes', () => {
        const errorDirectiveHandler = (node: DirectiveInfo) => {
            return '<span>one</span><span>two</span>';
        };
        expect(() => marklang({
            directives: {
                'ml-citation': errorDirectiveHandler
            }
        }).render(mockData.directive)).toThrow();
    });

    it('marklang options: singleTilde', () => {
        const html = marklang({
            singleTilde: true
        }).render(mockData.del);
        expect(html).toContain('<del>one</del>');
        expect(html).toContain('<del>two</del>');
    });

    it('marklang options: directives return string', () => {
        const citationList = marklang.dataToSource('citationList', mockData.citationList);
        const html = marklang({
            directives: {
                'ml-citation': (node: DirectiveInfo) => {
                    return ``;
                }
            }
        }).render(mockData.directive + citationList);
        expect(html).not.toContain('<ml-citation');
    });

    it('marklang options: directives return not string && render', () => {

        const errorDirectiveHandler = (node: DirectiveInfo) => {
            return document.createElement('span');
        };
        expect(() => marklang({
            directives: {
                'ml-citation': errorDirectiveHandler
            }
        }).render(mockData.directive)).toThrow();
    });

    it('marklang options: include ml-data', () => {
        const citationList = marklang.dataToSource('citationList', mockData.citationList);
        const mdastMlDataMock = jest.fn();
        const hastMlDataMock = jest.fn();
        const directiveMlDataMock = jest.fn();
        const transformers = {
            mdast: {
                'ml-data': mdastMlDataMock
            },
            hast: {
                'ml-data': hastMlDataMock
            }
        };
        const html = marklang({
            transformers,
            directives: {
                'ml-data': directiveMlDataMock
            }
        }).render(mockData.directive + citationList);

        // 断言 ml-data 函数没有被调用
        expect(mdastMlDataMock).not.toHaveBeenCalled();
        expect(hastMlDataMock).not.toHaveBeenCalled();
        expect(directiveMlDataMock).not.toHaveBeenCalled();
        expect(html).toContain('<ml-citation');
    });

    it('marklang options: transformers', () => {
        const transformers = {
            mdast: {
                link: ({ node }: {node: Link}) => {
                    if (node.data?.hProperties?.type === 'link') {
                        node.url = 'https://www.baidu.com';
                    }
                }
            },
            hast: {
                a: ({ node }: HastTransformerParam) => {
                    if (node.properties?.type === 'link') {
                        node.properties.className = ['link-a-class'];
                    }
                }
            }
        };
        const html = marklang({
            // @ts-ignore
            transformers
        }).render(mockData.link);
        expect(html).toContain('https://www.baidu.com');
        expect(html).toContain('link-a-class');
    });

    it('dataToAst: should parse markdown to AST', () => {
        const markdown = '# Hello World';
        const ast = marklang.dataToAst(markdown);
        
        // Check that the result is a Root node
        expect(ast).toBeDefined();
        expect((ast as Root).type).toBe('root');
        
        // Check that it contains a heading node
        const children = (ast as Root).children;
        expect(children.length).toBeGreaterThan(0);
        expect(children[0].type).toBe('heading');
        
        // Check heading properties
        const heading = children[0] as any;
        expect(heading.depth).toBe(1);
        expect(heading.children[0].type).toBe('text');
        expect(heading.children[0].value).toBe('Hello World');
    });

    it('dataToAst: should handle complex markdown', () => {
        const markdown = '# Heading\n\nParagraph with **bold** and *italic* text.\n\n```js\nconsole.log("code block");\n```';
        const ast = marklang.dataToAst(markdown);
        
        // Check that the result is a Root node with multiple children
        expect(ast).toBeDefined();
        expect((ast as Root).type).toBe('root');
        
        const children = (ast as Root).children;
        expect(children.length).toBe(3); // heading, paragraph, and code block
        
        // Check heading
        expect(children[0].type).toBe('heading');
        
        // Check paragraph with formatting
        expect(children[1].type).toBe('paragraph');
        
        // Check code block
        expect(children[2].type).toBe('code');
        const codeBlock = children[2] as any;
        expect(codeBlock.lang).toBe('js');
        expect(codeBlock.value).toBe('console.log("code block");');
    });
});
