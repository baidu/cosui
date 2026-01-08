/**
 * @file swiper e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';
import {ElementHandle} from '@playwright/test';
import {BoundingBox} from '@e2e/interface';
import {dispatchTouchEvent} from '@e2e/e2e-utils';

const docPath = '/components/cosmic/swiper';

test.describe('autoplay-test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/autoplay-test');
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

test.describe('overscroll', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/overscroll');
    });


    test('swiper-overscroll no jump', async ({page}) => {
        await page.waitForSelector('.cos-swiper-list');

        const swiperElement = await page.$('.cos-swiper-list') as ElementHandle;
        // 获取`.cos-swiper`元素的边界框
        const swiperBoundingBox = await swiperElement.boundingBox() as BoundingBox;
        // 计算向右滑动20px的目标位置
        const targetX = swiperBoundingBox.x + 60;
        const targetY = swiperBoundingBox.y + swiperBoundingBox.height / 2;

        // 模拟触发touch事件
        await dispatchTouchEvent(
            page,
            'touchstart',
            '.swiper-overscroll-test.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page,
            'touchmove',
            '.swiper-overscroll-test.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.swiper-overscroll-test.cos-swiper .cos-swiper-list',
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.swiper-overscroll-test.cos-swiper .cos-swiper-list',
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
        );

        await page.waitForLoadState('load', {
            timeout: 5000
        });

        const url = page.url();
        expect(url).toContain(docPath + '/overscroll');
    });

});

test.describe('swiper-overscroll-test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/overscroll-test');
    });

    test('swiper-overscroll not jump to overscrollUrl', async ({page}) => {
        await page.waitForSelector('.cos-swiper-list');
        const swiperElement = await page.$('.swiper-overscroll-test-no-more-url .cos-swiper-list') as ElementHandle;

        // 获取`.cos-swiper`元素的边界框
        const swiperBoundingBox = await swiperElement.boundingBox() as BoundingBox;
        expect(swiperBoundingBox).not.toBeNull();

        // 计算向左滑动20px的目标位置
        const targetX = swiperBoundingBox.x - 60;
        const targetY = swiperBoundingBox.y + swiperBoundingBox.height / 2;

        // 模拟触发touch事件
        await dispatchTouchEvent(
            page,
            'touchstart',
            '.swiper-overscroll-test-no-more-url.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page,
            'touchmove',
            '.swiper-overscroll-test-no-more-url.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.swiper-overscroll-test-no-more-url.cos-swiper .cos-swiper-list',
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.swiper-overscroll-test-no-more-url.cos-swiper .cos-swiper-list',
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
        );

        await page.waitForLoadState('load', {
            timeout: 5000
        });

        await page.waitForTimeout(3000);

        const url = page.url();
        expect(url.endsWith(docPath + '/overscroll-test')).toBeTruthy();
    });

    test('swiper-overscroll jump to overscrollUrl', async ({page}) => {
        await page.waitForSelector('.cos-swiper-list');
        const swiperElement = await page.$('.cos-swiper-list') as ElementHandle;

        // 获取`.cos-swiper`元素的边界框
        const swiperBoundingBox = await swiperElement.boundingBox() as BoundingBox;

        expect(swiperBoundingBox).not.toBeNull();

        // 计算向左滑动20px的目标位置
        const targetX = swiperBoundingBox.x - 60;
        const targetY = swiperBoundingBox.y + swiperBoundingBox.height / 2;

        // 模拟触发touch事件
        await dispatchTouchEvent(
            page,
            'touchstart',
            '.swiper-overscroll-test.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page,
            'touchmove',
            '.swiper-overscroll-test.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.swiper-overscroll-test.cos-swiper .cos-swiper-list',
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.swiper-overscroll-test.cos-swiper .cos-swiper-list',
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
        );

        await page.waitForLoadState('load', {
            timeout: 5000
        });

        await page.waitForTimeout(3000);

        const url = page.url();
        expect(url.endsWith(docPath)).toBeTruthy();
    });

    test('swiper-overscroll with no overscrollUrl', async ({page}) => {
        await page.waitForSelector('.cos-swiper-list');
        const swiperElement = await page.$('.swiper-overscroll-test-no-more-url .cos-swiper-list') as ElementHandle;

        // 获取`.cos-swiper`元素的边界框
        const swiperBoundingBox = await swiperElement.boundingBox() as BoundingBox;

        expect(swiperBoundingBox).not.toBeNull();

        // 计算向左滑动20px的目标位置
        const targetX = swiperBoundingBox.x - 60;
        const targetY = swiperBoundingBox.y + swiperBoundingBox.height / 2;

        // 模拟触发touch事件
        await dispatchTouchEvent(
            page,
            'touchstart',
            '.swiper-overscroll-test-no-more-url.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page,
            'touchmove',
            '.swiper-overscroll-test-no-more-url.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.swiper-overscroll-test-no-more-url.cos-swiper .cos-swiper-list',
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.swiper-overscroll-test-no-more-url.cos-swiper .cos-swiper-list',
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
            {
                x: targetX,
                y: targetY
            },
        );

        await page.waitForLoadState('load', {
            timeout: 5000
        });

        await page.waitForTimeout(3000);

        const url = page.url();
        expect(url.endsWith(docPath + '/overscroll-test')).toBeTruthy();
    });
});

test.describe('swiper-scrollbar', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/scrollbar');
    });

    test('swiper-scrollbar', async ({page}) => {
        await page.waitForSelector('.cos-swiper');
        const swiper = await page.$('[data-testid=swiper-scrollbar] .cos-swiper') as ElementHandle;
        const scrollbar = await swiper.$('.cos-swiper-scrollbar') as ElementHandle;
        expect(await scrollbar.isVisible()).toBeTruthy();
    });

    test('swiper-scrollbar scroll', async ({page}) => {
        await page.waitForSelector('[data-testid=swiper-scrollbar] .cos-swiper');
        const swiper = await page.$('[data-testid=swiper-scrollbar] .cos-swiper') as ElementHandle;

        const scrollBarSlide = await swiper.$('.cos-swiper-slide');
        expect(await scrollBarSlide?.getAttribute('style')).toBe('transform: translateX(0px);');

        const swiperItem = await swiper.$$('.cos-swiper-item');
        await swiperItem[swiperItem.length - 1].scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        expect(await scrollBarSlide?.getAttribute('style')).not.toBe('transform: translateX(0px);');
    });
});

test.describe('swiper-snap', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/snap');
    });

    test('swiper-snap', async ({page}) => {
        await page.waitForSelector('.cos-swiper');

        const swiper = await page.$('[data-testid=swiper-snap] .cos-swiper .cos-swiper-list') as ElementHandle;
        expect(await swiper?.getAttribute('class')).toContain('cos-swiper-snap');
    });
});

// A helper function that simulate swipe left then right on an element
// const swipeLeftAndRightOnElement = async (page: any, selector: string) => {
//     const element = await page.locator(selector);
//     const box = await element.boundingBox();
//     const startX = box.x + box.width / 2;
//     const startY = box.y + box.height / 2;
//     const endXRight = box.x + box.width;
//     const endXLeft = box.x;
//     // Swipe right to left
//     await dispatchTouchEvent(page, 'touchstart', selector, {x: startX, y: startY});
//     await dispatchTouchEvent(page, 'touchmove', selector, {x: endXRight, y: startY});
//     await dispatchTouchEvent(page, 'touchend', selector, {x: endXRight, y: startY});
//     // Swipe left to right
//     await dispatchTouchEvent(page, 'touchstart', selector, {x: startX, y: startY});
//     await dispatchTouchEvent(page, 'touchmove', selector, {x: endXLeft, y: startY});
//     await dispatchTouchEvent(page, 'touchend', selector, {x: endXLeft, y: startY});
// };

test.describe('swiper autoplay and loop test mobile', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/autoplay-loop');
    });

    test('swiper-loop', async ({page}) => {
        await page.waitForSelector('.cos-swiper');

        const swiperIndicator = await page.$('.cos-swiper .cos-swiper-indicator') as ElementHandle;
        await page.waitForTimeout(1000);

        const activeIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await activeIndicator.getAttribute('key') === '0').toBeTruthy();

        await page.waitForTimeout(3000);
        let nextIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await nextIndicator.getAttribute('key') === '1').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await nextIndicator.getAttribute('key') === '2').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await nextIndicator.getAttribute('key') === '3').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await nextIndicator.getAttribute('key') === '4').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await nextIndicator.getAttribute('key') === '5').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await nextIndicator.getAttribute('key') === '6').toBeTruthy();

        await page.waitForTimeout(3000);
        nextIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await nextIndicator.getAttribute('key') === '0').toBeTruthy();
    });

    test('scroll loop & touch event', async ({page}) => {
        await page.waitForSelector('.cos-swiper');

        const swiperIndicator = await page.$('.cos-swiper .cos-swiper-indicator') as ElementHandle;
        const swiperElement = await page.$('.cos-swiper') as ElementHandle;

        // 获取`.cos-swiper`元素的边界框
        const swiperBoundingBox = await swiperElement.boundingBox() as BoundingBox;
        const targetY = swiperBoundingBox.y + swiperBoundingBox.height / 2;

        // 模拟触发touch事件
        await dispatchTouchEvent(
            page,
            'touchstart',
            '.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        let activeIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await activeIndicator.getAttribute('key') === '0').toBeTruthy();

        // 模拟触发touchstar事件后，自动轮播会关闭
        await page.waitForTimeout(3000);
        activeIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await activeIndicator.getAttribute('key') === '0').toBeTruthy();

        await dispatchTouchEvent(
            page,
            'touchend',
            '.cos-swiper .cos-swiper-list',
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
            {
                x: swiperBoundingBox.x,
                y: targetY
            },
        );

        // 模拟触发touchend事件后，被关闭的自动轮播会开启
        await page.waitForTimeout(4000);
        activeIndicator = await swiperIndicator.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(await activeIndicator.getAttribute('key') === '1').toBeTruthy();
    });
});

test.describe('swiper indicator test mobile', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/indicator-and-space');
    });

    test('swiper-indicator', async ({page}) => {
        await page.waitForSelector('.cos-swiper');
        const selectEntry = page.locator('.cos-select');
        await selectEntry.click();
        await page.waitForSelector('.cos-select-panel');
        const selectOption = page.locator('.cos-select-option-text:has-text("center")');
        await selectOption.click();
        const swiperIndicator = page.locator('.cos-swiper .cos-swiper-indicator').first();
        expect(await swiperIndicator.getAttribute('class')).toContain('cos-swiper-indicator-center');
    });

    test('scroll change indicator', async ({page}) => {
        await page.waitForSelector('.cos-swiper');
        const selectEntry = page.locator('.cos-select');
        await selectEntry.click();
        await page.waitForSelector('.cos-select-panel');
        const selectOption = page.locator('.cos-select-option-text:has-text("center")');
        await selectOption.click();
        const swiper = await page.$('.cos-swiper') as ElementHandle;
        const swiperItem = await swiper.$$('.cos-swiper-item');
        expect(swiperItem.length).toBe(10);

        let activeItem = await swiper.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(activeItem).toBeTruthy();
        expect(await activeItem.getAttribute('key')).toBe('0');

        await swiperItem[9].scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        activeItem = await swiper.$('.cos-swiper-indicator-active') as ElementHandle;
        expect(activeItem).toBeTruthy();
        expect(await activeItem.getAttribute('key')).toBe('9');
    });
});

test.describe('swiper auto-height test mobile', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(docPath + '/auto-height');
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
        await swiperItems[1].scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const swiperContent = await swiper.$('.cos-swiper-content');
        const swiperContentHeight = await swiperContent?.evaluate(el => el.style.height);
        expect(Math.abs(parseInt(swiperContentHeight || '', 10) - 130)).toBeLessThanOrEqual(1);
    });
});