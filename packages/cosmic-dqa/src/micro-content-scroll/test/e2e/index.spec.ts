/**
 * @file micro content scroll e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/micro-content-scroll';

test.describe('microContentScroll Component', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render official', async ({page}) => {
        const card = page.locator('.cosd-micro-content-scroll');
        await expect(card).toHaveCount(1);
    });
});