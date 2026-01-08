/**
 * @file source mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/comparison';

test.describe('[source]: default source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-comparison');
        const component = page.locator('div .cosd-comparison');
        const targets = component.locator('.cosd-comparison-targets').first();
        const bar = component.locator('.cosd-comparison-bar').first();
        const table = component.locator('.cosd-comparison-table').first();
        expect(targets.nodeName === 'A').toBeTruthy;
        expect(targets).not.toBeNull();
        expect(bar).not.toBeNull();
        expect(table).not.toBeNull();
    });
});


test.describe('[source]: simple source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/simple`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-comparison');
        const table = await page.evaluate(() => {
            return document.querySelectorAll('.cosd-comparison')[0].querySelector('.cosd-comparison-table');
        });
        expect(table).toBeNull();

        const bar = await page.evaluate(() => {
            return document.querySelectorAll('.cosd-comparison')[1].querySelector('.cosd-comparison-bar');
        });
        expect(bar).toBeNull();

        const isDiv = await page.evaluate(() => {
            return document.querySelectorAll('.cosd-comparison')[2]
                .querySelector('.cosd-comparison-targets')?.nodeName === 'DIV';
        });
        expect(isDiv).toBeTruthy;
    });
});
