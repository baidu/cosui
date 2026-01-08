/**
 * @file textarea e2e
 */

import {expect, test} from '@bgotink/playwright-coverage';

test.describe('textarea: default demo', () => {
    const compPath = '/components/cosmic/textarea';

    // 默认输入框
    test('default textarea', async ({page}) => {
        await page.goto(`${compPath}/basic`);
        const textarea = await page.locator('.cos-textarea');
        expect(await textarea.getAttribute('class')).toContain('cos-textarea-outline');
    });

    // 设置输入框输入行数
    test('textarea set rows', async ({page}) => {
        await page.goto(`${compPath}/row`);
        const textarea = await page.locator('.cos-textarea-box');
        const rows = await textarea.getAttribute('rows');
        expect(rows).toBe('4');
    });

    // 设置输入框风格
    test('filled textarea', async ({page}) => {
        await page.goto(`${compPath}/appearance`);
        const textarea = await page.locator('.cos-textarea');
        expect(await textarea.getAttribute('class')).toContain('cos-textarea-filled');
    });

    // 清空
    test('textarea with clearbtn', async ({page}) => {
        await page.goto(`${compPath}/clear`);
        const textarea = await page.locator('.cos-textarea-box');
        const clear = await page.locator('.cos-textarea-clear');
        await textarea.type('Hello, World!');
        await clear.click();
        expect(await textarea.evaluate(el => el.value)).toBe('');
    });

    // 计数
    test('textarea with count', async ({page}) => {
        await page.goto(`${compPath}/count`);
        const textarea = await page.locator('.cos-textarea-box');
        await textarea.type('Hello');
        const count = await page.locator('.cos-textarea-count');
        expect(await count.innerText()).toEqual('5/100');
    });

    // 禁用
    test('disabled textarea', async ({page}) => {
        await page.goto(`${compPath}/disabled`);
        const textarea = await page.locator('.cos-textarea');
        expect(await textarea.getAttribute('class')).toContain('cos-disabled');
        const textareaBox = await page.locator('.cos-textarea-box');
        const disabled = await textareaBox.getAttribute('disabled');
        expect(disabled).not.toBeNull();
    });

    // 错误信息提示
    test('textarea with err msg', async ({page}) => {
        await page.goto(`${compPath}/err`);
        const textarea = await page.locator('.cos-textarea-box');
        await textarea.type('test');
        const errMsg = await page.locator('.cos-textarea-err');
        const color = await errMsg.evaluate(el => getComputedStyle(el).color);
        expect(errMsg).not.toBeNull();
        expect(color).toBe('rgb(247, 49, 49)');
    });

    // 自定义高度
    test('textarea custom height', async ({page}) => {
        await page.goto(`${compPath}/height`);
        const textarea = await page.locator('.cos-textarea');
        const height = await textarea.evaluate(el => getComputedStyle(el).height);
        expect(height).toBe('200px');
    });

    // 高度自适应（存在清空按钮）
    test('textarea height auto with bottom dom', async ({page}) => {
        await page.goto(`${compPath}/auto-height-with-clear`);
        const textarea = await page.locator('.cos-textarea-box');

        // eslint-disable-next-line max-len
        await textarea.type('这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本');

        // 输入超长文本，整体展示最大高度
        const textareaBox = await page.locator('.cos-textarea');
        const maxHeight = await textareaBox.evaluate(el => getComputedStyle(el).height);
        expect(maxHeight).toBe('200px');

        // 点击清空按钮，整体展示初始默认高度
        const clear = await page.locator('.cos-textarea-clear');
        await clear.click();
        const height = await textareaBox.evaluate(el => getComputedStyle(el).height);
        expect(height).toBe('130px');
    });

    // 高度自适应（不存在清空按钮）
    test('textarea height auto without bottom dom', async ({page}) => {
        await page.goto(`${compPath}/auto-height-without-clear`);
        const textarea = await page.locator('.cos-textarea-box');

        // eslint-disable-next-line max-len
        await textarea.type('这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本');

        // 输入超长文本，整体展示最大高度
        const textareaBox = await page.locator('.cos-textarea');
        const maxHeight = await textareaBox.evaluate(el => getComputedStyle(el).height);
        expect(maxHeight).toBe('200px');

        // 清空内容，高度为130px
        await page.$eval('.cos-textarea-box',
            (textareaBox: HTMLTextAreaElement) => {
                textareaBox.value = '';
                textareaBox.dispatchEvent(new Event('input'));
            }
        );
        const height = await textareaBox.evaluate(el => getComputedStyle(el).height);
        expect(height).toBe('130px');
    });

    // 设置最大高度
    test('textarea height auto without intial height', async ({page}) => {
        await page.goto(`${compPath}/max-height`);
        const textarea = await page.locator('.cos-textarea-box');

        // eslint-disable-next-line max-len
        await textarea.type('这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本这是一段测试文本');

        // 输入超长文本，整体展示最大高度
        const textareaBox = await page.locator('.cos-textarea');
        const maxHeight = await textareaBox.evaluate(el => getComputedStyle(el).height);
        expect(maxHeight).toBe('150px');
    });

    // slot
    test('textarea slot', async ({page}) => {
        await page.goto(`${compPath}/slot`);
        await page.waitForSelector('.cos-textarea .title-slot');
        const titleSlot = await page.locator('.cos-textarea .title-slot');
        expect(titleSlot).toBeVisible();
    });
});
