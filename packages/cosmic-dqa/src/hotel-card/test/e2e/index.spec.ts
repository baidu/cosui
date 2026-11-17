/**
 * @file hotel-card mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/hotel-card';

test.describe('default hotel-card', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-hotel-card');
        const hotelCards = page.locator('div .cosd-hotel-card');

        const thumbnail = hotelCards.nth(0)?.locator('.cosd-hotel-card-thumbnail').first();
        const title = hotelCards.nth(0)?.locator('.cosd-hotel-card-title').first();
        const score = hotelCards.nth(0)?.locator('.cos-score').first();
        const range = hotelCards.nth(0)?.locator('.cosd-hotel-card-range').first();
        const district = hotelCards.nth(0)?.locator('.cosd-hotel-card-district').first();
        expect(thumbnail).not.toBeNull();
        expect(title).not.toBeNull();
        expect(score).not.toBeNull();
        expect(range).not.toBeNull();
        expect(district).not.toBeNull();
        // 标签
        const tags = hotelCards.nth(1)?.locator('.cos-tag');
        const count = await tags.count();
        expect(count).toBe(2);
        // 价格与来源
        const price = hotelCards.nth(2)?.locator('.cosd-hotel-card-price').first();
        const source = hotelCards.nth(2)?.locator('.cosd-hotel-card-source').first();
        expect(price).not.toBeNull();
        expect(source).not.toBeNull();
    });
});
