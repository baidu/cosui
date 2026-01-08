/**
 * @file badge 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/badge';

test.describe('[badge]: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('shows different badge type', async ({page}) => {
        const getStyle = (dom: any, styleName: any) => {
            return dom.evaluate((el: Element, styleName: any) => {
                return getComputedStyle(el)[styleName];
            }, styleName);
        };
        // 检查 dot 样式
        const dot = await page.locator('.cos-badge-dot');
        const dotHeight = await getStyle(dot, 'height');
        const dotWidth = await getStyle(dot, 'width');
        const dotBorderRadius = await getStyle(dot, 'borderRadius');
        // 检查 badge dot 的样式
        expect(dotHeight).toBe('7px');
        expect(dotWidth).toBe('7px');
        expect(dotBorderRadius).toBe('9999px');

        // 检查 value 样式
        const badge = page.locator('.cos-badge-value');
        const value = badge.nth(1);
        const valueBorderRadius = await getStyle(value, 'borderRadius');
        expect(valueBorderRadius).toBe('9999px');

    });
});