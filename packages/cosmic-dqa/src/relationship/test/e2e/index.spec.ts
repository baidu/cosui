/**
 * @file e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/poi';

test.describe('[source]: game source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/csr`);
    });
    test('should render correct element', async ({page}) => {
        const component = await page.locator('.cosd-poi-overview-container ').first();
        expect(component).not.toBeNull();
    });
});