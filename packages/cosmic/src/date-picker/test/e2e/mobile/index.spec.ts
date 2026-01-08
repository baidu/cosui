/**
 * @file DatePicker 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/date-picker';

test.describe('date-picker: single type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('show date-picker panel & choose single date item', async ({page}) => {
        await page.waitForSelector('.cos-date-picker');
        const component = await page.locator('.cos-date-picker').first();
        await component.click();
        const panel = await page.locator('.cos-date-picker-panel');
        await expect(panel).toBeVisible();

        const firstDay = await panel.locator('.cos-calendar-content-day').first();
        await firstDay.click();

        const confirmButton = await panel.locator('.cos-button').last();
        await confirmButton.click();

        await expect(panel).toBeHidden();
    });
});

test.describe('date-picker: range type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/range`);
    });

    test('show date-picker panel & choose range date item', async ({page}) => {
        await page.waitForSelector('.cos-date-picker');
        const component = await page.locator('.cos-date-picker').first();
        await component.click();
        const panel = await page.locator('.cos-date-picker-panel');
        await expect(panel).toBeVisible();

        const firstDay = await panel.locator('.cos-calendar-content-day').first();
        const lastDay = await panel.locator('.cos-calendar-content-day').last();
        await firstDay.click();
        await lastDay.click();

        const confirmButton = await panel.locator('.cos-button').last();
        await confirmButton.click();

        await expect(panel).toBeHidden();
    });
});