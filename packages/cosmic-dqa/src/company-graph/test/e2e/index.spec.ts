/**
 * @file source mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/company-graph';

test.describe('[company-graph] ', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });
    test('should render correct element', async ({page}) => {
        const component = await page.locator('div .cosd-company-graph');
        const mainNode = await page.locator('div .cosd-company-graph-main-node');
        expect(component).not.toBeNull();
        expect(mainNode).not.toBeNull();
    });
});