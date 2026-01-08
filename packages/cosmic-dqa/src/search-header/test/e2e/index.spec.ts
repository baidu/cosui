/**
 * @file e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/search-header';

test.describe('default search-header', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });
    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-search-header');
        const component = page.locator('div .cosd-search-header');
        const brandArea = component.locator('.cosd-search-header-brand-area').first();
        const functionalArea = component.locator('.cosd-search-header-functional-area').first();
        expect(brandArea).not.toBeNull();
        expect(functionalArea).not.toBeNull();
    });
});


