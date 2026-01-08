/**
 * @file e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/shop-address';

test.describe('[source]: game source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/csr`);
    });
    test('should render correct element', async ({page}) => {
        const component = await page.locator('.cosd-shop-address-content').first();
        expect(component).not.toBeNull();
    });
});