/**
 * @file product-card e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/product-card';

test.describe('default product-card', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-product-card');
        const productCards = page.locator('div .cosd-product-card');

        const thumbnail = productCards.nth(0)?.locator('.cosd-product-card-thumbnail').first();
        const title = productCards.nth(0)?.locator('.cosd-product-card-title').first();
        const caption = productCards.nth(0)?.locator('.cosd-product-card-caption-item');
        expect(thumbnail).not.toBeNull();
        expect(title).not.toBeNull();
        expect(await caption.count()).toBe(1);
        // 标签
        const tags = productCards.nth(1)?.locator('.cos-tag');
        expect(await tags.count()).toBe(2);
        // 数组形式的描述按分割线切分
        expect(await productCards.nth(1)?.locator('.cosd-product-card-caption-item').count()).toBe(2);
        // 价格与销售信息
        const price = productCards.nth(2)?.locator('.cosd-product-card-price').first();
        const sales = productCards.nth(2)?.locator('.cosd-product-card-sales').first();
        expect(price).not.toBeNull();
        expect(sales).not.toBeNull();
        // 来源
        const source = productCards.nth(3)?.locator('.cosd-product-card-source').first();
        expect(source).not.toBeNull();
    });
});
