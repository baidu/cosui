/**
 * @file Radio 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/radio-group';

test.describe('radio group: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('should render radio', async ({page}) => {
        await page.waitForSelector('.cos-radio');
        const component = await page.locator('.cos-radio').first();
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);
        expect(await component.isVisible()).toBeTruthy();
        await component.click();
        expect(consoleMessages[0]).toContain('[radio-group] trigger change event');
        page.removeListener('console', handleConsole);

        const switcher = await page.locator('.cos-switcher');
        await switcher.click();
    });
});

test.describe('radio group: lifecycle', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/lifecycle`);
    });

    test('should remove itself', async ({page}) => {
        await page.waitForSelector('.cos-radio-group');
        const component = await page.locator('.cos-radio-group');
        const button = await page.locator('.cos-button');
        await button.click();
        await expect(component).not.toBeVisible();
    });
});