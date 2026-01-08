/**
 * @file outline mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/searching-outlines';

test.describe('SearchingOutlines Component', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render the correct elements', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-outlines');
        const SearchingOutlines = page.locator('div .cosd-searching-outlines');

        const icon = SearchingOutlines.locator('.cosd-searching-outlines-title-icon').first();
        const title = SearchingOutlines.locator('.cosd-searching-outlines-title-text').first();
        expect(icon).not.toBeNull();
        expect(title).not.toBeNull();

        const outlineItems = SearchingOutlines.locator('.cosd-searching-outlines-item');
        const itemCount = await outlineItems.count();
        expect(itemCount).toBeGreaterThan(0);
        const firstItemTitle = outlineItems.nth(0).locator('.cosd-searching-outlines-item-title').first();
        expect(firstItemTitle).not.toBeNull();
    });
});