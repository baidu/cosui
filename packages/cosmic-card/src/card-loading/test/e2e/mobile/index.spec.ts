/**
 * @file card-loading mobile e2e
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-card/card-loading';

test.describe('card loading: default demo', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`, {
            waitUntil: 'load'
        });
    });

    test('default card loading', async ({page}) => {
        const text = await page.locator('[data-testid=default-card-loading] .cosc-card-loading-text').first();
        expect(await text.getAttribute('class')).toContain('cos-space-mt-xs');
    });

    test('text is on the right side', async ({page}) => {
        const loading = await page.locator('[data-testid=card-loading-with-right-text] .cosc-card-loading').first();
        const direction = await loading.evaluate(el => getComputedStyle(el).getPropertyValue('flex-direction'));
        expect(direction).toBe('row');

        const text = await page.locator('[data-testid=card-loading-with-right-text] .cosc-card-loading-text').first();
        expect(await text.getAttribute('class')).toContain('cos-space-ml-xxs');
    });

    test('card loading with custom text', async ({page}) => {
        const text = await page.locator('[data-testid=card-loading-with-custom-text] .cosc-card-loading-text').first();
        expect(await text.innerText()).toEqual('loading...');
        expect(await text.getAttribute('class')).toContain('cos-space-mt-xs');
    });
});
