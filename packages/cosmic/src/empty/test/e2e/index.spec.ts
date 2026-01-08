/**
 * @file empty 组件 E2E
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/empty';

test.describe('empty: default', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });
    test('title and description', async ({page}) => {
        const empty = page.locator('.cos-empty');
        const title = empty?.nth(0)?.locator('.cos-empty-title');
        const description = empty?.nth(1)?.locator('.cos-empty-description');
        await expect(title).toHaveText('标题内容');
        await expect(description).toHaveText('辅助信息的文本');
    });
    test('different sizes', async ({page}) => {
        const getSize = async (dom: any): Promise<{ height: string, width: string }> => {
            return await dom.evaluate((el: Element) => {
                return {
                    height: getComputedStyle(el).height,
                    width: getComputedStyle(el).width
                };
            });
        };
        const sizes = {
            sm: '60px',
            md: '90px'
        };
        for (const [size, dimension] of Object.entries(sizes)) {
            const emptySelector = `.cos-empty-${size}`;
            await page.waitForSelector(emptySelector);
            const empty = page.locator(`${emptySelector} .cos-empty-icon`)?.nth(0);
            let {height, width} = await getSize(empty);
            expect(height).toBe(dimension);
            expect(width).toBe(dimension);
        }
    });
});

test.describe('empty: icon', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/icon`);
    });

    test('image icon', async ({page}) => {
        const imgIcon = page.locator('.cos-empty .cos-empty-icon')?.nth(0);
        await expect(imgIcon).toBeVisible();
    });

    test('custom icon', async ({page}) => {
        const customIcon = page.locator('.cos-empty .cos-empty-icon')?.nth(1);
        await expect(customIcon).toBeVisible();
    });

});

test.describe('empty: action slot', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/action`);
    });

    test('render action slot content', async ({page}) => {
        const actionSlot = page.locator('.cos-empty-action')?.nth(0);
        await expect(actionSlot).toBeVisible();
    });
});
