/**
 * @file loading e2e
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/loading';

test.describe('loading: default demo', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`, {
            waitUntil: 'load'
        });
    });

    test('default loading', async ({page}) => {
        const loading = await page.locator('[data-testid=default-loading] .cos-loading').first();
        expect(await loading.getAttribute('class')).toContain('cos-loading-bottom');

        const icon = await page.locator('[data-testid=default-loading] .cos-loading-icon').first();
        const iconSize = await icon.evaluate(el => getComputedStyle(el).fontSize);
        expect(iconSize).toBe('54px');

        const text = await page.locator('[data-testid=default-loading] .cos-loading-text').first();
        const textMarginTop = await text.evaluate(el => getComputedStyle(el).marginTop);
        expect(textMarginTop).toBe('9px');
    });

    test('loading with reverse appearance', async ({page}) => {
        const loading = await page.locator('[data-testid=loading-with-reverse] .cos-loading').first();
        expect(await loading.getAttribute('class')).toContain('cos-loading-reverse');

        const text = await page.locator('[data-testid=loading-with-reverse] .cos-loading-text').first();
        const textColor = await text.evaluate(el => getComputedStyle(el).getPropertyValue('color'));
        expect(textColor).toBe('rgb(255, 255, 255)');
    });

    test('text is on the right side', async ({page}) => {
        const loading = await page.locator('[data-testid=loading-with-right-text] .cos-loading').first();
        expect(await loading.getAttribute('class')).toContain('cos-loading-right');

        const text = await page.locator('[data-testid=loading-with-right-text] .cos-loading-text').first();
        const textMarginLeft = await text.evaluate(el => getComputedStyle(el).marginLeft);
        expect(textMarginLeft).toBe('6px');

        const icon = await page.locator('[data-testid=loading-with-right-text] .cos-loading-icon').first();
        const iconSize = await icon.evaluate(el => getComputedStyle(el).fontSize);
        expect(iconSize).toBe('22px');
    });

    test('loading with custom text', async ({page}) => {
        const text = await page.locator('[data-testid=loading-with-custom-text] .cos-loading-text').first();
        expect(await text.innerText()).toEqual('请稍候~');
        const textMarginTop = await text.evaluate(el => getComputedStyle(el).marginTop);
        expect(textMarginTop).toBe('9px');
    });
});

test.describe('loading: custom icon', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/custom`, {
            waitUntil: 'load'
        });
    });

    test('custom loading icon', async ({page}) => {
        const loading = await page.locator('[data-testid=custom-loading] .cos-loading').first();
        expect(await loading.getAttribute('class')).toContain('cos-loading-bottom');

        const icon = await page.locator('[data-testid=default-loading] .custom-loading-icon').first();
        expect(icon).not.toBeNull();
    });
});
