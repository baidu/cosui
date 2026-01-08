/**
 * @file e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/citation';

test.describe('[citation]: citation tooltip', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/csr`);
    });
    test('should render correct element', async ({page}) => {
        const component = await page.locator('.cosd-citation').first();
        expect(component).not.toBeNull();
    });
});
