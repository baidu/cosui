import marklangFn from "../src/server";
import mockData from './utils';

describe('Markdown Class', () => {
    let marklang: any;

    beforeEach(() => {
        marklang = marklangFn();
    });

    it('should render paragraph correctly', () => {
        const renderedHTML = marklang.render('段落文本');
        expect(renderedHTML).toContain('<p class="marklang-paragraph">段落文本</p>');
    });

    it('should render coreAnswer correctly', () => {
        const renderedHTML = marklang.render(mockData.markText);
        expect(renderedHTML).toContain("<strong>核心答案</strong></mark>");
        expect(renderedHTML).toContain('<mark class="flexible-marker flexible-marker-default">短答案</mark>');
        expect(renderedHTML).not.toContain('<mark class="flexible-marker flexible-marker-default">答案1</mark>');
        expect(renderedHTML).not.toContain('<mark class="flexible-marker flexible-marker-default">答案2</mark>');
    });

    it('should render code correctly', () => {
        const renderedHTML = marklang.render(mockData.codeText);
        expect(renderedHTML).toContain("<pre");
    });

    it('should render img correctly', () => {
        const html = marklang.render(mockData.img);
        expect(html).toContain('<img');
    });

    it('should render html correctly', () => {
        const html = marklang.render(mockData.html);
        expect(html).toContain('<br>');
    });

    it('should render del correctly', () => {
        const html = marklang.render(mockData.del);
        expect(html).not.toContain('<del>one</del>');
        expect(html).toContain('<del>two</del>');
    });

    describe('Inline Directives', () => {
        beforeEach(() => {
            // 使用默认配置，不传入自定义指令函数
            marklang = marklangFn();
        });

        it('should identify and preserve directive syntax in text', () => {
            const markdown = 'This is a :test in text.';
            const html = marklang.render(markdown);
            
            // 验证指令语法被保留为文本
            expect(html).toContain(':test in text.');
            // 验证指令没有被转换为HTML标签
            expect(html).not.toContain('<test');
            expect(html).not.toContain('</test>');
        });
        it('should identify and preserve directive syntax in text', () => {
            const markdown = 'This is a :test[test content] in text.';
            const html = marklang.render(markdown);
            // 验证指令没有被转换为HTML标签
            expect(html).toContain('<test');
            expect(html).toContain('</test>');
        });
    });
});
