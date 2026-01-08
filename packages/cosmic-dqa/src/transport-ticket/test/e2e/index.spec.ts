/**
 * @file e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/transport-ticket';

test.describe('transport-ticket', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });
    test('should render correct element', async ({page}) => {
        const component = await page.locator('.cosd-transport-ticket').first();
        expect(component).not.toBeNull();
    });
});