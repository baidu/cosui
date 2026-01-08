/**
 * @file DatePicker 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/date-picker';

test.describe('date-picker: single type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic?platform=pc`);
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

    test('show date-picker panel & click cancel button', async ({page}) => {
        await page.waitForSelector('.cos-date-picker');
        const component = await page.locator('.cos-date-picker').first();
        await component.click();
        const panel = await page.locator('.cos-date-picker-panel');
        await expect(panel).toBeVisible();

        const cancelButton = await panel.locator('.cos-button').first();
        await cancelButton.click();

        await expect(panel).toBeHidden();
    });

    test('show date-picker panel & switch controller', async ({page}) => {
        await page.waitForSelector('.cos-date-picker');
        const component = await page.locator('.cos-date-picker').first();
        await component.click();
        const panel = await page.locator('.cos-date-picker-panel');
        await expect(panel).toBeVisible();

        const controller = await panel.locator('.cos-date-picker-controller');

        const prevButton = await controller.locator('.cos-date-picker-controller-prev').first();
        await prevButton.click();
        await page.waitForTimeout(1000);

        const currentButton = await controller.locator('.cos-date-picker-controller-current').first();
        await currentButton.click();
        await page.waitForTimeout(1000);

        const nextButton = await controller.locator('.cos-date-picker-controller-next').first();
        await nextButton.click();
        await page.waitForTimeout(1000);
    });

    test('show date-picker panel & select option', async ({page}) => {
        await page.waitForSelector('.cos-date-picker');
        const component = await page.locator('.cos-date-picker').first();
        await component.click();
        const panel = await page.locator('.cos-date-picker-panel');
        await expect(panel).toBeVisible();

        const select = await panel.locator('.cos-date-picker-select-month');
        await select.click();
        await page.waitForTimeout(1000);

        const selectOption = await select.locator('.cos-select-option').first();

        await selectOption.click();
        await page.waitForTimeout(1000);
    });
});

test.describe('date-picker: range type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/range?platform=pc`);
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