/**
 * @file MoreLink 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/more-link';

test.describe('[more-link]: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('should has correct parts and classes', async ({page}) => {
        const firstChild = page.locator('[data-testid=default] .cos-more-link > :first-child');
        const secondChild = page.locator('[data-testid=default] .cos-more-link > :nth-child(2)');

        await expect(firstChild).toHaveClass(/cos-more-link-text/);
        await expect(secondChild).toHaveClass(/cos-more-link-icon/);
    });

    test('should render correctly with default props', async ({page}) => {
        const component = page.locator('[data-testid=default] .cos-more-link');
        const textNode = component.locator('.cos-more-link-text');
        const text = await textNode.textContent();
        expect(text?.trim()).toBe('查看更多');
    });

    test('should render correctly with custom text', async ({page}) => {
        const component = page.locator('[data-testid=custom-text] .cos-more-link');
        const textNode = component.locator('.cos-more-link-text');
        const text = await textNode.textContent();
        expect(text?.trim()).toBe('查看详情');
    });

    test('should open url when click', async ({page}) => {
        const component = page.locator('[data-testid=default] .cos-more-link');
        await component.click();
        const url = await page.url();
        expect(url.includes('/')).toBeTruthy();
    });

    test('should not open url when url is empty', async ({page}) => {
        const component = page.locator('[data-testid=custom-text] .cos-more-link');
        await component.click();
        const url = await page.url();
        expect(url.includes(path)).toBeTruthy();
    });
});

test.describe('[more-link]: filled appearance', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/filled`);
    });

    test('should has correct classes', async ({page}) => {
        const component = page.locator('[data-testid=filled] .cos-more-link');
        await expect(component).toHaveClass(/cos-more-link-filled/);
    });

    test('should render correctly with default background', async ({page}) => {
        const component = page.locator('[data-testid=filled] .cos-more-link');
        const bgColor = await component.evaluate(el => getComputedStyle(el).backgroundColor);
        expect(bgColor).toBe('rgb(245, 246, 250)');
    });

    test('should render correctly with custom background', async ({page}) => {
        const component = page.locator('[data-testid=filled-custom-bg] .cos-more-link');
        const bgColor = await component.evaluate(el => getComputedStyle(el).backgroundColor);
        expect(bgColor).toBe('rgb(232, 243, 255)');
    });
});

test.describe('[more-link]: plain appearance', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/plain?platform=pc`);
    });

    test('should has correct classes', async ({page}) => {
        const component = page.locator('.cos-more-link');
        await expect(component).toHaveClass(/cos-more-link-plain/);
    });
});
