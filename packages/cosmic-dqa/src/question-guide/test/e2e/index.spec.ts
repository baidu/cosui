/**
 * @file source mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/question-guide';

test.describe('[source]: default source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-question-guide');
        const component = page.locator('div .cosd-question-guide');
        const guid = component.locator('.cosd-question-guide-title').first();
        const option = component.locator('.cosd-question-guide-items').first();
        expect(guid).not.toBeNull();
        expect(option).not.toBeNull();
    });
});