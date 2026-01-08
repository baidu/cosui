/**
 * @file Radio 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/checkbox-group';

test.describe('checkbox group: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('should render checkbox', async ({page}) => {
        await page.waitForSelector('.cos-checkbox');
        const component = await page.locator('.cos-checkbox').first();
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);
        expect(await component.isVisible()).toBeTruthy();
        await component.click();
        expect(consoleMessages[0]).toContain('[checkbox-group] trigger change event');
        await component.click();
        page.removeListener('console', handleConsole);
    });
});

test.describe('checkbox group: lifecycle', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/lifecycle`);
    });

    test('should remove itself', async ({page}) => {
        await page.waitForSelector('.cos-checkbox-group');
        const component = await page.locator('.cos-checkbox-group');
        const checkbox = await page.locator('.cos-checkbox').first();
        await checkbox.click();
        const button = await page.locator('.cos-button');
        await button.click();
        await expect(component).not.toBeVisible();
    });
});