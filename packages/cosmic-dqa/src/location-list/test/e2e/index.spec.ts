/**
 * @file location-list mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/location-list';

test.describe('location-list with swiper', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-location-list');
        const locationList = page.locator('div .cosd-location-list');
        const swiper = locationList.nth(1)?.locator('.cos-swiper').first();
        expect(swiper).not.toBeNull();
    });
});
