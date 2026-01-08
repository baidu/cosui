/**
 * @file e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/chart';

test.describe('Chart Component', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });
    test('should render chart correctly', async ({page}) => {
        const component = await page.locator('.cosd-chart ').first();
        expect(component).not.toBeNull();
    });
});
