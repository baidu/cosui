/**
 * @file source mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/tag-link';

test.describe('[source]: default source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        const component = page.locator('.cosd-tag-link').first();
        const link = component.locator('.cosd-tag-link-main');
        expect(component).not.toBeNull();
        expect(link).not.toBeNull();
    });
});
