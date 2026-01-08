/**
 * @file rank e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/rank';

let changeSelect = async (page: any, value: string) => {
    const selectEntry = page.locator('.cos-select');
    await selectEntry.click();
    await page.waitForSelector('.cos-select-panel');
    const selectOption = page.locator(`.cos-select-option-text:has-text("${value}")`);
    await selectOption.click();
};

test.describe('rank test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('rank size', async ({page}) => {
        const rank = page.locator('[data-testid=rank-default] .cos-rank');
        const sizes = ['sm', 'md', 'lg'];

        for (const size of sizes) {
            await changeSelect(page, size);
            for (let i = 0; i < 10; i++) {
                expect(await rank.nth(i).getAttribute('class')).toContain(`cos-${size}`);
            }
        }
    });

    test('rank appearance', async ({page}) => {
        const ranks = page.locator('[data-testid=rank-default] .cos-rank');
        const appearances = ['filled-leaf', 'filled', 'subtle'];

        for (let i = 0; i < appearances.length; i++) {
            let appearance = appearances[i];
            for (let j = 0; j < 10; j++) {
                expect(await ranks.nth(i * 10 + j).getAttribute('class')).toContain(`cos-rank-${appearance}`);
                expect(await ranks.nth(i * 10 + j).textContent()).toBe(`${j + 1}`);
            }
        }
    });
});

