/**
 * @file Cascader 组件 PC E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/cascader';

test.describe('cascader: vertical single type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/vert?platform=pc`);
    });

    test('show cascader panel and choose single option', async ({page}) => {
        await page.waitForSelector('.cos-cascader');
        const component = await page.locator('.cos-cascader').first();
        await component.click();
        const panel = page.locator('.cos-cascader-panel');
        await expect(panel).toBeVisible();

        for (let i = 0; i < 3; i++) {
            const options = await page.locator('.cos-cascader-options').last();
            const firstOption = await options.locator('.cos-cascader-option').first();
            await firstOption.click();
        }

        await expect(panel).toBeHidden();
    });
});

test.describe('cascader: vertical multiple type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/multi?platform=pc`);
    });

    test('show cascader panel and choose multiple options', async ({page}) => {
        await page.waitForSelector('.cos-cascader');
        const component = await page.locator('.cos-cascader').first();
        await component.click();
        const entry = await page.locator('.cos-cascader-entry').first();
        const panel = page.locator('.cos-cascader-panel').first();
        await expect(panel).toBeVisible();

        const options = await page.locator('.cos-cascader-options').last();
        const firstOptions = await options.locator('.cos-cascader-option').first();
        await firstOptions.click();

        const nextOptions = await page.locator('.cos-cascader-options').last();
        const firstOption = await nextOptions.locator('.cos-cascader-option').first();
        const lastOption = await nextOptions.locator('.cos-cascader-option').last();
        await firstOption.click();
        await lastOption.click();

        await entry.click();
        await expect(panel).toBeHidden();
    });

    test('show cascader panel and choose all options', async ({page}) => {
        await page.waitForSelector('.cos-cascader');
        const component = await page.locator('.cos-cascader').first();
        await component.click();
        const panel = page.locator('.cos-cascader-panel');
        await expect(panel).toBeVisible();

        await page.waitForSelector('.cos-checkbox');
        const firstCheckbox = await page.locator('.cos-checkbox').first();
        // 点击全选
        await firstCheckbox.click();

        await page.waitForTimeout(1000);

        // 点击取消全选
        await firstCheckbox.click();
    });

    test('choose select all option & show maxOptions limit toast', async ({page}) => {
        await page.waitForSelector('.cos-cascader');
        const component = await page.locator('.cos-cascader').last();
        await component.click();
        const panel = page.locator('.cos-cascader-panel');
        await expect(panel).toBeVisible();

        await page.waitForSelector('.cos-checkbox');

        const lastCheckbox = await page.locator('.cos-checkbox').last();
        await lastCheckbox.click();

        const firstCheckbox = await page.locator('.cos-checkbox').first();
        await firstCheckbox.click();

        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();

        await page.waitForTimeout(1000);

        await page.waitForTimeout(1000);

        const secondCheckbox = await page.locator('.cos-checkbox').nth(2);
        await secondCheckbox.click();
    });
});