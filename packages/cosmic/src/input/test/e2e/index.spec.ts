/**
 * @file input e2e
 */

import {expect, test} from '@bgotink/playwright-coverage';

test.describe('input', () => {
    const compPath = '/components/cosmic/input';

    // 默认输入框
    test('default input', async ({page}) => {
        await page.goto(`${compPath}/basic`);
        const input = await page.locator('.cos-input');
        expect(await input.getAttribute('class')).toContain('cos-input-outline');
    });

    // 设置输入框风格
    test('filled input', async ({page}) => {
        await page.goto(`${compPath}/appearance`);
        const input = await page.locator('.cos-input');
        expect(await input.getAttribute('class')).toContain('cos-input-filled');
    });

    // 设置输入框尺寸
    test('custom size input', async ({page}) => {
        await page.goto(`${compPath}/size`);
        const input = await page.locator('.cos-input');
        expect(await input.nth(0).getAttribute('class')).toContain('cos-sm');
        expect(await input.nth(1).getAttribute('class')).toContain('cos-lg');
    });

    // 设置输入框默认值
    test('input has default value', async ({page}) => {
        await page.goto(`${compPath}/default-value`);
        await page.waitForSelector('.cos-input-box');
        const value = await page.$eval('.cos-input-box', input => input.value);
        expect(value).toBe('Rose');
    });

    // 设置输入框placeholder
    test('input has correct placeholder', async ({page}) => {
        await page.goto(`${compPath}/placeholder`);
        const input = await page.locator('.cos-input-box');
        const placeholder = await input.getAttribute('placeholder');
        expect(placeholder).toBe('请输入内容');
    });

    // 禁用输入框
    test('input is disabled', async ({page}) => {
        await page.goto(`${compPath}/disabled`);
        const input = await page.locator('.cos-input');
        expect(await input.getAttribute('class')).toContain('cos-disabled');
        const inputBox = await page.locator('.cos-input-box');
        const disabled = await inputBox.getAttribute('disabled');
        expect(disabled).not.toBeNull();
    });

    // 输入框支持清空
    test('input support clear text', async ({page}) => {
        await page.goto(`${compPath}/clear`);
        const input = page.locator('.cos-input-box');

        // 输入内容聚焦，展示清空按钮
        await input.type('sample');
        const clearButton = page.locator('.cos-input .cos-input-clear');
        expect(await clearButton.getAttribute('class')).toContain('cos-space-ml-md');
        expect(clearButton).not.toBeNull();

        await input.blur();

        // 再次聚焦，点击清空按钮清空内容
        await input.focus();

        const selectionEnd = await page.evaluate(() => {
            // 递归地搜索具有焦点的元素
            const getDeepActiveElement = (element) => {
                if (element.shadowRoot && element.shadowRoot.activeElement) {
                    return getDeepActiveElement(element.shadowRoot.activeElement);
                }
                return element;
            };
            // 从 shadow-root 开始搜索
            const deepActiveElement = getDeepActiveElement(document.activeElement);
            return deepActiveElement instanceof HTMLInputElement ? deepActiveElement.selectionStart : null;
        });

        expect(selectionEnd).toBe(6);
        await clearButton.click();
        const inputValue = (await input.textContent())?.trim();
        expect(inputValue).toBe('');
    });

    // 输入框支持计数
    test('input support count word', async ({page}) => {
        await page.goto(`${compPath}/count`);
        const input = await page.locator('.cos-input-box');
        await input.type('0123456789');
        const count = await page.locator('input+div');
        expect(await count.innerText()).toEqual('10/10');
    });

    // 输入框支持错误信息提示
    test('input has err msg', async ({page}) => {
        await page.goto(`${compPath}/err`);
        const input = await page.locator('.cos-input-box');
        await input.type('test data');
        const errMsg = await page.locator('.cos-input-err');
        const color = await errMsg.evaluate(el => getComputedStyle(el).color);
        expect(errMsg).not.toBeNull();
        expect(color).toBe('rgb(247, 49, 49)');
    });

    // 输入框支持最大长度
    test('input has maxlength', async ({page}) => {
        await page.goto(`${compPath}/maxlength`);
        const input = await page.locator('.cos-input-box');
        expect(await input.getAttribute('maxlength')).toBe('10');
    });

    // slot
    test('input with slot', async ({page}) => {
        await page.goto(`${compPath}/slot`);
        await page.waitForSelector('.cos-input-title-slot');
        await page.waitForSelector('.cos-input-button-slot');
        const titleSlot = await page.locator('.cos-input-title-slot');
        const buttonSlot = await page.locator('.cos-input-button-slot');
        expect(titleSlot).toBeVisible();
        expect(buttonSlot).toBeVisible();
    });
});
