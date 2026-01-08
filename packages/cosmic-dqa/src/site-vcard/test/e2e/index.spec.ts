/**
 * @file source mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/site-vcard';

test.describe('[source]: default source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-site-vcard');
        const component = page.locator('div .cosd-site-vcard');
        const title = component.locator('.cosd-site-vcard-title').first();
        const caption = component.locator('.cosd-site-vcard-caption').first();
        expect(title).not.toBeNull();
        expect(caption).not.toBeNull();
    });
});