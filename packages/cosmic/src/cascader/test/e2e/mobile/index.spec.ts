/**
 * @file Cascader 组件 Mobile E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/cascader';

test.describe('cascader: vertical single type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/vert`);
    });

    test('show cascader panel & choose single option', async ({page}) => {
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

test.describe('cascader: horizontal single type', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/horiz`);
    });

    test('show cascader panel & choose single option', async ({page}) => {
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
        await page.goto(`${path}/multi`);
    });

    test('show cascader panel & choose multiple options', async ({page}) => {
        await page.waitForSelector('.cos-cascader');
        const component = await page.locator('.cos-cascader').first();
        await component.click();
        const panel = page.locator('.cos-cascader-panel');
        await expect(panel).toBeVisible();

        const options = await page.locator('.cos-cascader-options').last();
        const firstOptions = await options.locator('.cos-cascader-option').first();
        await firstOptions.click();

        const nextOptions = await page.locator('.cos-cascader-options').last();
        const firstOption = await nextOptions.locator('.cos-cascader-option').first();
        const lastOption = await nextOptions.locator('.cos-cascader-option').last();
        await firstOption.click();
        await lastOption.click();

        const footer = await page.locator('.cos-cascader-footer');
        await expect(footer).toBeVisible();
        const buttons = await page.locator('.cos-cascader-footer-buttons');
        const confirmBtn = await buttons.locator('.cos-button').last();

        await confirmBtn.click();
        await expect(panel).toBeHidden();

        await page.waitForTimeout(1000);
    });

    test('show cascader panel & choose select all option', async ({page}) => {
        await page.waitForSelector('.cos-cascader');
        const component = await page.locator('.cos-cascader').first();
        await component.click();
        const panel = page.locator('.cos-cascader-panel');
        await expect(panel).toBeVisible();

        const options = await page.locator('.cos-cascader-options').last();
        const firstOptions = await options.locator('.cos-cascader-option').first();
        await firstOptions.click();

        const nextOptions = await page.locator('.cos-cascader-options').last();
        const allOption = await nextOptions.locator('.cos-cascader-option-all').first();

        // 点击全选
        await allOption.click();

        await page.waitForTimeout(1000);

        // 再次点击取消全选
        await allOption.click();

        const closeBtn = await component.locator('.cos-drawer-close').first();
        await closeBtn.click();
        await expect(panel).toBeHidden();
    });

    test('hide cascader panel when click close button', async ({page}) => {
        await page.waitForSelector('.cos-cascader');
        const component = await page.locator('.cos-cascader').first();
        await component.click();
        const panel = page.locator('.cos-cascader-panel');
        await expect(panel).toBeVisible();

        const closeBtn = await component.locator('.cos-drawer-close').first();
        await closeBtn.click();
        await expect(panel).toBeHidden();
    });

    test('confirm selected value', async ({page}) => {
        await page.waitForSelector('.cos-cascader');
        const component = await page.locator('.cos-cascader').nth(2);
        await component.click();
        const panel = page.locator('.cos-cascader-panel');
        await expect(panel).toBeVisible();

        const footer = await page.locator('.cos-cascader-footer');
        await expect(footer).toBeVisible();
        const buttons = await page.locator('.cos-cascader-footer-buttons');
        const confirmBtn = await buttons.locator('.cos-button').last();

        await confirmBtn.click();
        await expect(panel).toBeHidden();
    });

    test('choose select all option & show maxOptions limit toast', async ({page}) => {
        await page.waitForSelector('.cos-cascader');
        const component = await page.locator('.cos-cascader').last();
        await component.click();
        const panel = page.locator('.cos-cascader-panel');
        await expect(panel).toBeVisible();

        const options = await page.locator('.cos-cascader-options').last();
        const firstOptions = await options.locator('.cos-cascader-option').first();
        await firstOptions.click();

        const firstNextOptions = await page.locator('.cos-cascader-options').last();
        const firstAllOption = await firstNextOptions.locator('.cos-cascader-option-all').first();
        await firstAllOption.click();

        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();

        await page.waitForTimeout(1000);

        const secondOptions = await options.locator('.cos-cascader-option').nth(2);
        await secondOptions.click();

        const secondNextOptions = await page.locator('.cos-cascader-options').last();
        const secondAllOption = await secondNextOptions.locator('.cos-cascader-option-all').first();
        await secondAllOption.click();

        await page.waitForTimeout(1000);
    });
});
