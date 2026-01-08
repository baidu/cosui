/**
 * @file Calendar 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/calendar';

test.describe('calendar: single type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic?platform=pc`);
    });

    test('choose single date item', async ({page}) => {
        await page.waitForSelector('.cos-calendar');
        const component = await page.locator('.cos-calendar').first();
        await expect(component).toBeVisible();

        const firstDay = await component.locator('.cos-calendar-content-day').first();
        await firstDay.click();

        await page.waitForTimeout(1000);
    });
});

test.describe('calendar: range type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/range?platform=pc`);
    });

    test('choose range date item', async ({page}) => {

        await page.waitForSelector('.cos-calendar');
        const component = await page.locator('.cos-calendar').first();
        await expect(component).toBeVisible();

        const firstDay = await component.locator('.cos-calendar-content-day').first();
        const lastDay = await component.locator('.cos-calendar-content-day').last();
        await firstDay.click();
        await lastDay.click();
    });
});