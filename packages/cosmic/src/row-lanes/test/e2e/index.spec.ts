/**
 * @file row-lanes e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/row-lanes';

test.describe('[row-lanes]: basic rendering', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic?platform=pc`);
    });

    test('should render container correctly', async ({page}) => {
        await page.waitForSelector('.cos-row-lanes');

        const container = page.locator('.cos-row-lanes');
        await expect(container).toHaveCount(1);

        const innerContainer = container.locator('.cos-row-lanes-container');
        await expect(innerContainer).toHaveCount(1);

        // 验证容器有宽度样式
        const containerStyle = await innerContainer.getAttribute('style');
        expect(containerStyle).toContain('width:');
    });

    test('should render rows correctly', async ({page}) => {
        await page.waitForSelector('.cos-row-lanes-row');

        const rows = page.locator('.cos-row-lanes-row');
        const rowCount = await rows.count();
        expect(rowCount).toBeGreaterThan(0);
    });

    test('should render items correctly', async ({page}) => {
        await page.waitForSelector('.cos-row-lanes-item');

        const items = page.locator('.cos-row-lanes-item');
        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);

        // 验证每个 item 都有宽度样式（由布局计算得出）
        const firstItem = items.nth(0);
        const itemStyle = await firstItem.getAttribute('style');
        expect(itemStyle).toContain('width:');
    });

    test('should display slot content correctly', async ({page}) => {
        await page.waitForSelector('[data-test-id="row-lanes-item"]');

        const items = page.locator('[data-test-id="row-lanes-item"]');
        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);
    });
});

test.describe('[row-lanes]: layout properties', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic?platform=pc`);
    });

    test('should apply gutter correctly', async ({page}) => {
        await page.waitForSelector('.cos-row-lanes-container');

        const container = page.locator('.cos-row-lanes-container');
        const containerStyle = await container.getAttribute('style');

        // 验证 CSS 变量已设置
        expect(containerStyle).toContain('--cos-row-lanes-gutter-x:');
        expect(containerStyle).toContain('--cos-row-lanes-gutter-y:');
    });

    test('should respect row configuration', async ({page}) => {
        await page.waitForSelector('.cos-row-lanes-row');

        const rows = page.locator('.cos-row-lanes-row');
        const rowCount = await rows.count();
        expect(rowCount).toBeGreaterThan(0);
    });

    test('should handle different container widths', async ({page}) => {
        await page.waitForSelector('.cos-row-lanes-container');

        const container = page.locator('.cos-row-lanes-container');

        // PC 端容器宽度应为 800px
        const pcStyle = await container.getAttribute('style');
        expect(pcStyle).toContain('width: 800px');
    });
});

test.describe('[row-lanes]: mobile rendering', () => {
    test.beforeEach(async ({page}) => {
        await page.setViewportSize({width: 375, height: 667});
        await page.goto(`${path}/basic?platform=mobile`);
    });

    test('should render container on mobile correctly', async ({page}) => {
        await page.waitForSelector('.cos-row-lanes');

        const container = page.locator('.cos-row-lanes');
        await expect(container).toHaveCount(1);

        const innerContainer = container.locator('.cos-row-lanes-container');
        await expect(innerContainer).toHaveCount(1);
    });

    test('should render items on mobile correctly', async ({page}) => {
        await page.waitForSelector('.cos-row-lanes-item');

        const items = page.locator('.cos-row-lanes-item');
        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);

        // 移动端 item 也应该有正确的宽度
        const firstItem = items.nth(0);
        const itemStyle = await firstItem.getAttribute('style');
        expect(itemStyle).toContain('width:');
    });

    test('should use smaller container width on mobile', async ({page}) => {
        await page.waitForSelector('.cos-row-lanes-container');

        const container = page.locator('.cos-row-lanes-container');

        // 移动端容器宽度应为 380px
        const mobileStyle = await container.getAttribute('style');
        expect(mobileStyle).toContain('width: 380px');
    });
});

test.describe('[row-lanes]: slot props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic?platform=pc`);
    });

    test('should pass mediaHeight to slot', async ({page}) => {
        await page.waitForSelector('.card-media');

        const cardMedias = page.locator('.card-media');
        const firstMedia = cardMedias.nth(0);

        // 验证 mediaHeight 已传递给 slot
        const mediaStyle = await firstMedia.getAttribute('style');
        expect(mediaStyle).toContain('height: 180px');
    });
});
