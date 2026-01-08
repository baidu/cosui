/**
 * @file location-card mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/location-card';

test.describe('default location-list', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-location-card');
        const locationCards = page.locator('div .cosd-location-card');

        const thumbnail = locationCards.nth(0)?.locator('.cosd-location-card-thumbnail').first();
        const title = locationCards.nth(0)?.locator('.cosd-location-card-title').first();
        const score = locationCards.nth(0)?.locator('.cos-score').first();
        const category = locationCards.nth(0)?.locator('.cosd-location-card-category').first();
        const cost = locationCards.nth(0)?.locator('.cosd-location-card-cost').first();
        const address = locationCards.nth(0)?.locator('.cosd-location-card-address').first();
        expect(thumbnail).not.toBeNull();
        expect(title).not.toBeNull();
        expect(score).not.toBeNull();
        expect(category).not.toBeNull();
        expect(cost).not.toBeNull();
        expect(address).not.toBeNull();
        // 标签和营业时间
        const tags = locationCards.nth(1)?.locator('.cos-tag');
        const count = await tags.count();
        expect(count).toBe(2);
        const openingHours = locationCards.nth(2)?.locator('.cosd-location-list-hour').first();
        expect(openingHours).not.toBeNull();
    });
});
