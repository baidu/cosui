/**
 * @file popover 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/popover';

test.describe('[popover]: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic?platform=pc`);
    });

    test('shows popover on button click', async ({page}) => {
        await page.waitForSelector('.cos-button');
        // 点击触发popover的按钮
        await page.click('.cos-button');
        // 检查 popover 是否出现
        const popover = page.locator('.cos-popover');
        await expect(popover).toBeVisible();

        // 监听控制台输出
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            if (message.type() === 'log') {
                consoleMessages.push(message.text());
            }
        };
        page.on('console', handleConsole);
        // 点击 popover 内部
        await page.click('.cos-popover');
        // 检查 popover 是否消失
        await expect(popover).toBeVisible();
        // 点击非popover区域
        await page.click('.cos-button');
        // 检查 popover 是否消失
        await expect(popover).not.toBeVisible();

        expect(consoleMessages[0]).toContain('handleClose');
    });
});


test.describe('[popover]: Shadow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}`);
    });

    test('test Shadow', async ({page}) => {
        await page.waitForSelector('.cos-button');
        // 点击触发popover的按钮
        await page.click('.cos-button');
        // 检查 popover 是否出现
        const popover = page.locator('.cos-popover');
        await expect(popover).toBeVisible();
        // 点击 popover 内部
        await page.click('.cos-popover');
        // 检查 popover 是否消失
        await expect(popover).toBeVisible();
    });
});