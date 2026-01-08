/**
 * @file swiper e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';
import {ElementHandle} from '@playwright/test';

const docPath = '/components/cosmic/swiper';


test.describe('autoplay-test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/autoplay-test?platform=pc');
    });

    test('autoplay-test detached', async ({page}) => {
        await page.waitForSelector('.cos-swiper');

        const swiper = await page.$('.cos-swiper') as ElementHandle;
        expect(swiper).toBeTruthy();

        let swiperItem = await page.$$('.cos-swiper-item');
        expect(swiperItem.length).toBe(7);

        const addItem = await page.$('.add-item') as ElementHandle;
        await addItem.click();
        await page.waitForTimeout(1000);
        swiperItem = await page.$$('.cos-swiper-item');
        expect(swiperItem.length).toBe(8);

        const removeItem = await page.$('.remove-item') as ElementHandle;
        await removeItem.click();
        await page.waitForTimeout(1000);
        swiperItem = await page.$$('.cos-swiper-item');
        expect(swiperItem.length).toBe(7);

        const hideSwiper = await page.$('.hide-swiper') as ElementHandle;
        await hideSwiper.click();
        await page.waitForTimeout(1000);
        let swiperList = await page.$('.cos-swiper-list');
        expect(swiperList).toBeFalsy();

        const showSwiper = await page.$('.show-swiper') as ElementHandle;
        await showSwiper.click();
        await page.waitForTimeout(1000);
        swiperList = await page.$('.cos-swiper-list');
        expect(swiperList).toBeTruthy();
    });
});

test.describe('swiper-indicator', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/indicator-and-space?platform=pc');
    });

    test('swiper-indicator', async ({page}) => {
        await page.waitForSelector('[data-testid=swiper-indicator] .cos-swiper');
        const selectEntry = page.locator('.cos-select');
        await selectEntry.click();
        await page.waitForSelector('.cos-select-panel');
        const selectOption = page.locator('.cos-select-option-text:has-text("center")');
        await selectOption.click();
        const swiperIndicator = await page.$('.cos-swiper-indicator');
        expect(swiperIndicator).toBeTruthy();
    });

    test('scroll change indicator', async ({page}) => {
        await page.waitForSelector('[data-testid=swiper-indicator] .cos-swiper');
        await page.waitForSelector('[data-testid=swiper-indicator] .cos-swiper .cos-swiper-control-next');

        const selectEntry = page.locator('.cos-select');
        await selectEntry.click();
        await page.waitForSelector('.cos-select-panel');
        const selectOption = page.locator('.cos-select-option-text:has-text("center")');
        await selectOption.click();

        const swiper = await page.$('[data-testid=swiper-indicator] .cos-swiper') as ElementHandle;
        const swiperItem = await swiper.$$('.cos-swiper-item');
        expect(swiperItem.length).toBe(10);

        let activeItem = await swiper.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(activeItem).toBeTruthy();
        expect(await activeItem.getAttribute('key')).toBe('0');

        const nextBtn = await swiper.$('.cos-swiper-control-next') as ElementHandle;
        await nextBtn.click();
        await page.waitForTimeout(1000);

        activeItem = await swiper.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await activeItem.getAttribute('key')).toBe('3');

        const prevBtn = await swiper.$('.cos-swiper-control-prev') as ElementHandle;
        await prevBtn.click();
        await page.waitForTimeout(1000);

        activeItem = await swiper.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await activeItem.getAttribute('key')).toBe('0');
    });
});

test.describe('swiper autoplay & loop test pc', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/autoplay-loop?platform=pc');
    });

    test('swiper-autoplay', async ({page}) => {
        await page.waitForSelector('.cos-swiper');
        const loopBtn = page.locator('#loop-switcher .cos-switcher');
        await loopBtn.click();
        const swiperIndicator = page.locator('.cos-swiper .cos-swiper-indicator');

        let activeIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await activeIndicator.getAttribute('key') === '0').toBeTruthy();

        await page.waitForTimeout(4000);
        let nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '1').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '2').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '3').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '4').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '5').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '6').toBeTruthy();

        // 轮播到最后不再从头继续
        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '6').toBeTruthy();
    });

    test('swiper-loop', async ({page}) => {
        await page.waitForSelector('.cos-swiper');

        const swiperIndicator = page.locator('.cos-swiper .cos-swiper-indicator');

        let activeIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await activeIndicator.getAttribute('key') === '0').toBeTruthy();
        await page.waitForTimeout(4000);
        let nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '1').toBeTruthy();
        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '2').toBeTruthy();
        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '3').toBeTruthy();
        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '4').toBeTruthy();
        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '5').toBeTruthy();
        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '6').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = swiperIndicator.locator('.cos-swiper-indicator-active');
        expect(await nextIndicator.getAttribute('key') === '0').toBeTruthy();
    });
});

test.describe('swiper auto-height test pc', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/auto-height?platform=pc');
    });

    test('should render with auto-height correctly', async ({page}) => {
        await page.waitForSelector('.cos-swiper');
        const swiper = await page.$('.cos-swiper') as ElementHandle;
        expect(swiper).toBeTruthy();

        const swiperItems = await swiper.$$('.cos-swiper-item');
        expect(swiperItems.length).toBe(7);

        const swiperContent = await swiper.$('.cos-swiper-content');
        const swiperContentHeight = await swiperContent?.evaluate(el => el.style.height);
        expect(Math.abs(parseInt(swiperContentHeight || '', 10) - 150)).toBeLessThanOrEqual(1);
    });

    test('should adjust height to 130px when scrolling to second item', async ({page}) => {
        await page.waitForSelector('.cos-swiper');
        const swiper = await page.$('.cos-swiper') as ElementHandle;
        expect(swiper).toBeTruthy();

        const swiperItems = await swiper.$$('.cos-swiper-item');
        expect(swiperItems.length).toBe(7);

        // 滚动到第二个item
        const nextBtn = await swiper.$('.cos-swiper-control-next') as ElementHandle;
        await nextBtn.click();
        await page.waitForTimeout(1000);

        const swiperContent = await swiper.$('.cos-swiper-content');
        const swiperContentHeight = await swiperContent?.evaluate(el => el.style.height);
        expect(Math.abs(parseInt(swiperContentHeight || '', 10) - 130)).toBeLessThanOrEqual(1);
    });
});