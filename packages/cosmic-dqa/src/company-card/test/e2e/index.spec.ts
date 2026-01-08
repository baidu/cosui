/**
 * @file e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/company-card';

test.describe('[company-card]: author-card tooltip', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/csr`);
    });
    test('should render correct element', async ({page}) => {
        const component = await page.locator('.cosd-company-card').first();
        expect(component).not.toBeNull();
    });
});
