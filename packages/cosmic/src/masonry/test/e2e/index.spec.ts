/**
 * @file masonry e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/masonry';
test.describe('[masonry]: basic rendering', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic?platform=pc`);
    });

    test('should render masonry container correctly', async ({page}) => {
        // 等待组件渲染完成
        await page.waitForSelector('.cos-masonry');

        const masonryContainer = page.locator('.cos-masonry');
        await expect(masonryContainer).toHaveCount(1);

        const innerContainer = masonryContainer.locator('.cos-masonry-container');
        await expect(innerContainer).toHaveCount(1);

        // 验证容器有宽度和高度样式
        const containerWidth = await innerContainer.getAttribute('style');
        expect(containerWidth).toContain('width:');
        expect(containerWidth).toContain('height:');
    });

    test('should render masonry items correctly', async ({page}) => {
        await page.waitForSelector('.cos-masonry-container-item');

        const masonryItems = page.locator('.cos-masonry-container-item');
        const itemCount = await masonryItems.count();
        expect(itemCount).toBeGreaterThan(0);

        // 验证每个item都有正确的样式定位
        for (let i = 0; i < Math.min(itemCount, 3); i++) {
            const item = masonryItems.nth(i);
            const itemStyle = await item.getAttribute('style');
            expect(itemStyle).toContain('width:');
            expect(itemStyle).toContain('height:');
            expect(itemStyle).toContain('top:');
            expect(itemStyle).toContain('left:');
        }
    });

    test('should display slot content correctly', async ({page}) => {
        await page.waitForSelector('[data-test-id="masonry-item"]');

        const items = page.locator('[data-test-id="masonry-item"]');
        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);
    });
});

// 辅助方法：获取第一行的items
async function getFirstRowItems(page: any) {
    const masonryItems = page.locator('.cos-masonry-container-item');
    const items = await masonryItems.all();
    const positions = [];

    for (const item of items) {
        const boundingBox = await item.boundingBox();
        if (boundingBox) {
            positions.push({
                top: boundingBox.y,
                left: boundingBox.x,
                width: boundingBox.width,
                height: boundingBox.height
            });
        }
    }

    // 找出第一行的items（top值相近的items）
    if (positions.length === 0) {
        return [];
    }

    const minTop = Math.min(...positions.map(p => p.top));
    const threshold = positions[0].height * 0.5; // 50%高度作为阈值

    return positions.filter(pos => Math.abs(pos.top - minTop) < threshold);
}
test.describe('[masonry]: layout properties', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic?platform=pc`);
    });

    test('should handle different column counts', async ({page}) => {
        await page.waitForSelector('.cos-masonry-container-item');

        const masonryItems = page.locator('.cos-masonry-container-item');
        const items = await masonryItems.all();

        // 验证瀑布流布局的基本合理性
        expect(items.length).toBeGreaterThan(0);

        // 检查第一行是否有正确的列数（基于布局算法）
        const firstRowItems = await getFirstRowItems(page);
        expect(firstRowItems.length).toBeLessThanOrEqual(3); // 假设列数不超过3
    });
});

// 移动端测试场景
test.describe('[masonry]: mobile rendering', () => {
    test.beforeEach(async ({page}) => {
        // 模拟移动端环境
        await page.setViewportSize({width: 375, height: 667});
        await page.goto(`${path}/basic?platform=mobile`);
    });

    test('should render masonry container on mobile correctly', async ({page}) => {
        await page.waitForSelector('.cos-masonry');

        const masonryContainer = page.locator('.cos-masonry');
        await expect(masonryContainer).toHaveCount(1);

        const innerContainer = masonryContainer.locator('.cos-masonry-container');
        await expect(innerContainer).toHaveCount(1);

        // 移动端可能使用不同的布局策略，验证基础功能
        const containerWidth = await innerContainer.getAttribute('style');
        expect(containerWidth).toContain('width:');
        expect(containerWidth).toContain('height:');
    });

    test('should render masonry items on mobile correctly', async ({page}) => {
        await page.waitForSelector('.cos-masonry-container-item');

        const masonryItems = page.locator('.cos-masonry-container-item');
        const itemCount = await masonryItems.count();
        expect(itemCount).toBeGreaterThan(0);

        // 移动端item也应该有正确的定位
        for (let i = 0; i < Math.min(itemCount, 3); i++) {
            const item = masonryItems.nth(i);
            const itemStyle = await item.getAttribute('style');
            expect(itemStyle).toContain('width:');
            expect(itemStyle).toContain('height:');
            expect(itemStyle).toContain('top:');
            expect(itemStyle).toContain('left:');
        }
    });
});
