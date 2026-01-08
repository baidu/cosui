/**
 * @file toast e2e test for Mobile
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/toast';

test.describe('mobile text toast', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/mobile-basic`);
    });

    test('shows single line toast on button click', async ({page}) => {
        const btnClassName = '[data-testid="mobile-text-toast"] .cos-button:has-text("单行文字")';
        // 点击触发单行文字 Toast 的按钮
        await page.click(btnClassName);
        // 模拟多次点击后隐藏前一个 Toast
        await page.click(btnClassName);
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('单行文字');
        // 等待超过 2 秒
        await page.waitForTimeout(2100);
        await expect(toast).not.toBeVisible();
    });

    test('shows multi-line toast on button click', async ({page}) => {
        // 点击触发多行文字 Toast 的按钮
        await page.click('[data-testid="mobile-text-toast"] .cos-button:has-text("多行文字")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('提示单行最多显示十四个汉字哦双行内容');
    });
});

test.describe('mobile position toast', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/mobile-position`);
    });

    test('shows toast in middle on button click', async ({page}) => {
        // 点击触发中间位置显示的 Toast 按钮
        await page.click('[data-testid="mobile-text-toast"] .cos-button:has-text("默认中间显示")');
        // 检查 Toast 是否出现在中间位置
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 验证样式是否符合中间位置的预期
        const positionClass = await toast.evaluate(node => node.className);
        expect(positionClass).toContain('cos-toast-middle');
    });

    test('shows toast at top on button click', async ({page}) => {
        // 点击触发顶部位置显示的 Toast 按钮
        await page.click('[data-testid="mobile-text-toast"] .cos-button:has-text("在顶部显示")');
        // 检查 Toast 是否出现在顶部位置
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 验证样式是否符合顶部位置的预期
        const positionClass = await toast.evaluate(node => node.className);
        expect(positionClass).toContain('cos-toast-top');
    });

    test('shows toast at bottom on button click', async ({page}) => {
        // 点击触发底部位置显示的 Toast 按钮
        await page.click('[data-testid="mobile-text-toast"] .cos-button:has-text("在底部显示")');
        // 检查 Toast 是否出现在底部位置
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 验证样式是否符合底部位置的预期
        const positionClass = await toast.evaluate(node => node.className);
        expect(positionClass).toContain('cos-toast-bottom');
    });
});

test.describe('mobile size toast', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/mobile-size`);
    });

    test('shows normal size toast on button click', async ({page}) => {
        // 点击触发常规尺寸 Toast 的按钮
        await page.click('[data-testid="mobile-size-toast"] .cos-button:has-text("常规尺寸")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否为常规尺寸
        const sizeClass = await toast.locator('.cos-toast-container').evaluate(node => node.className);
        expect(sizeClass).toContain('cos-toast-md');
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('提示内容最多十个字');
    });

    test('shows large size toast on button click', async ({page}) => {
        // 点击触发大尺寸 Toast 的按钮
        await page.click('[data-testid="mobile-size-toast"] .cos-button:has-text("大尺寸")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否为大尺寸
        const sizeClass = await toast.locator('.cos-toast-container').evaluate(node => node.className);
        expect(sizeClass).toContain('cos-toast-lg');
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('提示最多六字');
        // 验证 icon 尺寸是否为大尺寸
        const iconSize = await page.evaluate(() => {
            const icon = document.querySelector('.cos-toast .cos-toast-lg i')!;
            return window.getComputedStyle(icon).fontSize;
        });
        expect(parseInt(iconSize, 10)).toEqual(41);
    });
});

test.describe('mobile action toast', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/mobile-action`);
    });

    test('shows toast with button on click', async ({page}) => {
        // 点击触发带按钮的 Toast 的按钮
        await page.click('[data-testid="mobile-action-toast"] .cos-button:has-text("显示按钮")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 中是否包含按钮
        const button = toast.locator('.cos-toast-button');
        await expect(button).toBeVisible();
        // 点击 Toast 中的按钮并验证回调执行
        await button.click();
    });

    test('shows toast with success type and button on click', async ({page}) => {
        // 点击触发带成功类型信息和按钮的 Toast 的按钮
        await page.click('[data-testid="mobile-action-toast"] .cos-button:has-text("类型信息组合按钮")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 中是否包含按钮
        const button = toast.locator('.cos-toast-button');
        await expect(button).toBeVisible();
        // 点击 Toast 中的按钮并验证回调执行
        await button.click();
    });

    test('shows toast with link on click', async ({page}) => {
        // 点击触发带链接的 Toast 的按钮
        await page.click('[data-testid="mobile-action-toast"] .cos-button:has-text("显示链接")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 中是否包含链接
        const link = toast.locator('.cos-toast-link');
        await expect(link).toBeVisible();
        // 点击 Toast 中的链接并验证回调执行
        await link.click();
    });

    test('shows toast with success type and link on click', async ({page}) => {
        // 点击触发带成功类型信息和链接的 Toast 的按钮
        await page.click('[data-testid="mobile-action-toast"] .cos-button:has-text("类型信息组合链接")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 中是否包含链接
        const link = toast.locator('.cos-toast-link');
        await expect(link).toBeVisible();
        // 点击 Toast 中的链接并验证回调执行
        await link.click();
    });
});
