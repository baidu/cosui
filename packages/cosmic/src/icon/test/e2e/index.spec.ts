/**
 * @file icon e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/icon';

test.describe('default icon', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('icon', async ({page}) => {
        const icon = page.locator('[data-testid=icon-default] .cos-icon').first();
        const iconClass = await icon?.getAttribute('class');
        expect((iconClass || '').includes('cos-icon-')).toBeTruthy;
    });
});