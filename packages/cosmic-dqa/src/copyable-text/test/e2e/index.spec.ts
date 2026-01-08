/**
 * @file source mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/copyable-text';

test.describe('[source]: default source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-copyable-text');
        const component = page.locator('div .cosd-copyable-text');
        const content = component.locator('.cosd-copyable-text-content').first();
        const divider = component.locator('.cosd-copyable-text-divider').first();
        expect(content).not.toBeNull();
        expect(divider).not.toBeNull();
    });
});