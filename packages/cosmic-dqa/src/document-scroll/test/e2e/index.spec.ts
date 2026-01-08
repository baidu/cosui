/**
 * @file document scroll e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/document-scroll';

test.describe('documentScroll Component', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render official', async ({page}) => {
        const card = page.locator('.cosd-document-scroll');
        await expect(card).toHaveCount(1);
    });
});