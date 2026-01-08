import {
    injectPolyfill,
    getLanguage,
    isCamelCaseWithCapital,
    camelToDash,
    dashToCamel,
    getAttributesAsObject,
    canAddAttrs,
    parseAttrs,
    findComments,
    isDOMElement,
    processOptions,
    getDefaultOptions
} from "../src/utils";

describe('utils function', () => {
    it('should add hasOwn method to Object if it does not exist', () => {
        // @ts-ignore
        delete Object.hasOwn;
        // @ts-ignore
        expect(Object.hasOwn).toBeUndefined();

        injectPolyfill();

        // @ts-ignore
        expect(typeof Object.hasOwn).toBe('function');

        const obj = { key: 'value' };
        // @ts-ignore
        expect(Object.hasOwn(obj, 'key')).toBe(true);
        // @ts-ignore
        expect(Object.hasOwn(obj, 'nonexistent')).toBe(false);
    });

    it('should not override hasOwn method if it already exists', () => {
        // @ts-ignore
        const originalHasOwn = Object.hasOwn;

        injectPolyfill();

        // @ts-ignore
        expect(Object.hasOwn).toBe(originalHasOwn);
    });

    it('should return language name when className contains "lang-" prefix', () => {
        const node = { properties: { className: ['lang-typescript', 'other-class'] } };

        // @ts-ignore
        expect(getLanguage(node)).toEqual('typescript');
    });

    it('should return language name when className contains "language-" prefix', () => {
        const node = { properties: { className: ['language-python', 'other-class'] } };

        // @ts-ignore
        expect(getLanguage(node)).toEqual('python');
    });

    it('should return "text" when className is not an array', () => {
        const node = { properties: { className: 'not-an-array' } };

        // @ts-ignore
        expect(getLanguage(node)).toEqual('text');
    });

    it('should return empty string when no language class is found', () => {
        const node = { properties: { className: ['no-language', 'other-class'] } };

        // @ts-ignore
        expect(getLanguage(node)).toEqual('');
    });

    describe('isCamelCaseWithCapital', () => {
        it('should return true for camelCase with capital letters', () => {
            expect(isCamelCaseWithCapital('camelCase')).toBe(true);
            expect(isCamelCaseWithCapital('testString')).toBe(true);
            expect(isCamelCaseWithCapital('aB')).toBe(true);
        });

        it('should return false for non-camelCase strings', () => {
            expect(isCamelCaseWithCapital('lowercase')).toBe(false);
            expect(isCamelCaseWithCapital('UPPERCASE')).toBe(false);
            expect(isCamelCaseWithCapital('kebab-case')).toBe(false);
            expect(isCamelCaseWithCapital('snake_case')).toBe(false);
            expect(isCamelCaseWithCapital('123camelCase')).toBe(false);
            expect(isCamelCaseWithCapital('')).toBe(false);
        });
    });

    describe('camelToDash', () => {
        it('should convert camelCase to kebab-case', () => {
            expect(camelToDash('camelCase')).toBe('camel-case');
            expect(camelToDash('testString')).toBe('test-string');
            expect(camelToDash('aBC')).toBe('a-b-c');
            expect(camelToDash('HTMLElement')).toBe('h-t-m-l-element');
        });

        it('should handle strings without capital letters', () => {
            expect(camelToDash('lowercase')).toBe('lowercase');
            expect(camelToDash('')).toBe('');
        });
    });

    describe('dashToCamel', () => {
        it('should convert kebab-case to camelCase', () => {
            expect(dashToCamel('kebab-case')).toBe('kebabCase');
            expect(dashToCamel('test-string')).toBe('testString');
            expect(dashToCamel('a-b-c')).toBe('aBC');
            expect(dashToCamel('data-test-id')).toBe('dataTestId');
        });

        it('should handle strings without dashes', () => {
            expect(dashToCamel('lowercase')).toBe('lowercase');
            expect(dashToCamel('')).toBe('');
        });
    });

    describe('getAttributesAsObject', () => {
        it('should convert Element attributes to an object', () => {
            // Create a mock Element with attributes
            const element = document.createElement('div');
            element.setAttribute('data-test', 'value');
            element.setAttribute('aria-label', 'description');
            element.setAttribute('custom-attr', 'custom');

            const result = getAttributesAsObject(element);
            
            expect(result).toEqual({
                dataTest: 'value',
                ariaLabel: 'description',
                customAttr: 'custom'
            });
        });

        it('should handle elements with no attributes', () => {
            const element = document.createElement('div');
            const result = getAttributesAsObject(element);
            
            expect(result).toEqual({});
        });
    });

    describe('canAddAttrs', () => {
        it('should return true for elements that can have attributes', () => {
            // Test with some common elements that should be in CAN_ADD_ATTRS_ELE
            expect(canAddAttrs('image')).toBe(true);
            expect(canAddAttrs('link')).toBe(true);
        });

        it('should return false for elements that cannot have attributes', () => {
            // Test with some elements that should not be in CAN_ADD_ATTRS_ELE
            expect(canAddAttrs('unknown-element')).toBe(false);
        });
    });

    describe('parseAttrs', () => {
        it('should parse attributes with double quotes', () => {
            const source = 'name="John" age="30"';
            expect(parseAttrs(source)).toEqual({
                name: 'John',
                age: '30'
            });
        });

        it('should parse attributes with single quotes', () => {
            const source = "name='John' age='30'";
            expect(parseAttrs(source)).toEqual({
                name: 'John',
                age: '30'
            });
        });

        it('should parse attributes without quotes', () => {
            const source = 'name=John age=30';
            expect(parseAttrs(source)).toEqual({
                name: 'John',
                age: '30'
            });
        });

        it('should parse mixed attribute formats', () => {
            const source = 'name="John" age=30 role=\'admin\'';
            expect(parseAttrs(source)).toEqual({
                name: 'John',
                age: '30',
                role: 'admin'
            });
        });

        it('should handle empty string', () => {
            expect(parseAttrs('')).toEqual({});
        });
    });

    describe('findComments', () => {
        it('should find comment nodes in DOM tree', () => {
            const div = document.createElement('div');
            div.innerHTML = '<!-- Comment 1 --><p>Text<!-- Comment 2 --></p><!-- Comment 3 -->';
            
            const comments = findComments(div);
            
            expect(comments.length).toBe(3);
            expect(comments[0].nodeType).toBe(Node.COMMENT_NODE);
            expect(comments[1].nodeType).toBe(Node.COMMENT_NODE);
            expect(comments[2].nodeType).toBe(Node.COMMENT_NODE);
            expect(comments[0].textContent).toBe(' Comment 1 ');
            expect(comments[1].textContent).toBe(' Comment 2 ');
            expect(comments[2].textContent).toBe(' Comment 3 ');
        });

        it('should handle nodes without comments', () => {
            const div = document.createElement('div');
            div.innerHTML = '<p>Text without comments</p>';
            
            const comments = findComments(div);
            
            expect(comments.length).toBe(0);
        });
    });

    describe('isDOMElement', () => {
        it('should return true for HTMLElement instances', () => {
            const div = document.createElement('div');
            const span = document.createElement('span');
            
            expect(isDOMElement(div)).toBe(true);
            expect(isDOMElement(span)).toBe(true);
        });

        it('should return false for non-HTMLElement values', () => {
            expect(isDOMElement({})).toBe(false);
            expect(isDOMElement('string')).toBe(false);
            expect(isDOMElement(123)).toBe(false);
            expect(isDOMElement(null)).toBe(false);
            expect(isDOMElement(undefined)).toBe(false);
            expect(isDOMElement(document.createTextNode('text'))).toBe(false);
            expect(isDOMElement(document.createComment('comment'))).toBe(false);
        });
    });

    describe('processOptions', () => {
        it('should remove built-in directives from options', () => {
            const options = {
                directives: {
                    'ml-data': () => {},
                    'custom': () => {}
                },
                transformers: {
                    mdast: {
                        'ml-data': () => {},
                        'custom': () => {}
                    },
                    hast: {
                        'ml-data': () => {},
                        'custom': () => {}
                    }
                }
            };

            processOptions(options);

            expect(options.directives['ml-data']).toBeUndefined();
            expect(options.directives['custom']).toBeDefined();
            expect(options.transformers.mdast['ml-data']).toBeUndefined();
            expect(options.transformers.mdast['custom']).toBeDefined();
            expect(options.transformers.hast['ml-data']).toBeUndefined();
            expect(options.transformers.hast['custom']).toBeDefined();
        });

        it('should handle undefined options', () => {
            expect(() => processOptions(undefined)).not.toThrow();
        });

        it('should handle options without directives or transformers', () => {
            const options = { otherOption: 'value' };
            expect(() => processOptions(options)).not.toThrow();
        });
    });

    describe('getDefaultOptions', () => {
        it('should return an object with transformers', () => {
            const options = getDefaultOptions();
            
            expect(options).toBeDefined();
            expect(options.transformers).toBeDefined();
            expect(options.transformers.mdast).toBeDefined();
            expect(options.transformers.hast).toBeDefined();
            expect(typeof options.transformers.mdast['ml-data']).toBe('function');
            expect(typeof options.transformers.hast.pre).toBe('function');
        });

        it('should have ml-data transformer that handles JSON data', () => {
            const options = getDefaultOptions();
            const mdastTransformer = options.transformers.mdast['ml-data'];
            
            const mockNode = {
                type: 'containerDirective',
                attributes: { name: 'testData' },
                children: [
                    {
                        type: 'code',
                        value: '{"key": "value"}'
                    }
                ]
            };
            
            const mockParams = {
                node: mockNode,
                dataMap: {}
            };
            
            // @ts-ignore - Type issues with the mock
            mdastTransformer(mockParams);
            
            expect(mockParams.dataMap['testData']).toEqual({ key: 'value' });
            expect(mockNode.type).toBe('definition');
        });

        it('should handle invalid JSON in ml-data transformer', () => {
            const options = getDefaultOptions();
            const mdastTransformer = options.transformers.mdast['ml-data'];
            
            const mockNode = {
                type: 'containerDirective',
                attributes: { name: 'testData' },
                children: [
                    {
                        type: 'code',
                        value: 'invalid json'
                    }
                ]
            };
            
            const mockParams = {
                node: mockNode,
                dataMap: {}
            };
            
            // @ts-ignore - Type issues with the mock
            expect(() => mdastTransformer(mockParams)).not.toThrow();
        });
    });
});