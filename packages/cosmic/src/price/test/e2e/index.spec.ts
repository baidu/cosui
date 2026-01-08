/**
 * @file price e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/price';

test.describe('basic price rules', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/base`);
    });
    test('basic price rules', async ({page}) => {
        const price = page.locator('[data-testid=price-basic-use] .cos-price');

        expect(await price?.nth(0)?.innerText()).toBe('39593元');
        expect(await price?.nth(1)?.innerText()).toBe('395元/单位');
        expect(await price?.nth(2)?.innerText()).toBe('39593元/单位');
        expect(await price?.nth(3)?.innerText()).toBe('￥39593');

        const innerText = price?.nth(4).innerText();
        const decimalPart = (await innerText).split('.')[1].replace(/[^0-9]/g, '');
        expect(await decimalPart?.length).toBe(2);

        expect(await price?.last()?.innerText()).toBe('￥1.9万');
    });
});

test.describe('price sign', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/sign`);
    });
    test('price sign', async ({page}) => {
        const price = page.locator('[data-testid=price-sign] .cos-price');
        const amountText1 = await price?.nth(0).innerText();
        expect(amountText1.includes('¥')).toBe(true);
        const amountText2 = await price?.nth(1).innerText();
        expect(amountText2.includes('$')).toBe(true);
    });
});
test.describe('price unit', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/unit`);
    });
    test('price unit', async ({page}) => {
        const price = page.locator('[data-testid=price-unit] .cos-price');
        const amountText1 = await price?.nth(0).innerText();
        expect(amountText1.includes('起')).toBe(true);
        const amountText2 = await price?.nth(1).innerText();
        expect(amountText2.includes('超值')).toBe(true);
    });
});
test.describe('price range', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/range`);
    });
    test('price range', async ({page}) => {
        const price = page.locator('[data-testid=price-range] .cos-price');
        const priceRangeText = await price?.nth(0).innerText();
        const [computedMin, max] = (await priceRangeText).split('-');
        expect(computedMin).toBe('3.14');
        expect(max).toBe('31.42亿');
    });
});
test.describe('price origin value', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/origin-value`);

    });
    test('price origin value', async ({page}) => {
        const price = page.locator('[data-testid=price-origin-value] .cos-price >span');
        expect(await price?.nth(2)?.getAttribute('class')).toContain('cos-price-origin-value');
        expect(await price?.nth(2)?.innerText()).toBe('799.99');
    });
});

test.describe('price size', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/size`);
    });
    test('price size', async ({page}) => {
        const price = page.locator('[data-testid=price-size] .cos-price .cos-price-value');
        expect(await price?.nth(0)?.getAttribute('class')).toContain('cos-xxs');
        expect(await price?.nth(1)?.getAttribute('class')).toContain('cos-xs');
        expect(await price?.nth(2)?.getAttribute('class')).toContain('cos-sm');
        expect(await price?.nth(3)?.getAttribute('class')).toContain('cos-md');
        expect(await price?.nth(4)?.getAttribute('class')).toContain('cos-lg');
        expect(await price?.nth(5)?.getAttribute('class')).toContain('cos-xl');
    });
});


