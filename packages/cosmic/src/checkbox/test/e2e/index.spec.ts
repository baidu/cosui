/**
 * @file Radio 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/checkbox';

test.describe('checkbox: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('should render checkbox', async ({page}) => {
        await page.waitForSelector('.cos-checkbox');
        const component = await page.locator('.cos-checkbox').nth(0);
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);
        expect(await component.isVisible()).toBeTruthy();
        await component.click();
        expect(consoleMessages[0]).toContain('[checkbox] trigger change event');
        page.removeListener('console', handleConsole);
    });

    test('should not fire change event when disabled', async ({page}) => {
        await page.waitForSelector('.cos-checkbox');
        const component = await page.locator('.cos-checkbox').nth(2);
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);
        expect(await component.isVisible()).toBeTruthy();
        await component.click();
        expect(consoleMessages.length).toBe(0);
        page.removeListener('console', handleConsole);
    });
});
