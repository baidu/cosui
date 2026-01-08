/**
 * @file 展开收起组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/fold';

test.describe('[fold]: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('should unfold when click', async ({page}) => {
        await page.waitForSelector('[data-testid=default] .cos-fold-switch');
        const component = await page.locator('[data-testid=default] .cos-fold-switch');
        const content = await page.locator('[data-testid=default] .cos-fold-content');
        const foldHeight = await content.evaluate(el => getComputedStyle(el).height);
        expect(foldHeight).toBe('80px');

        const unfoldText = await component.textContent();
        expect(unfoldText?.trim()).toBe('展开');

        await component.click();
        const foldText = await component.textContent();
        expect(foldText?.trim()).toBe('收起');

        await component.click();
        const unfoldText2 = await component.textContent();
        expect(unfoldText2?.trim()).toBe('展开');
    });
});

test.describe('[fold]: async props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/async`);
    });

    test('should update height when async content loaded', async ({page}) => {
        await page.waitForSelector('[data-testid=async] .cos-fold-switch');
        const component = await page.locator('[data-testid=async] .cos-fold-switch');
        const content = await page.locator('[data-testid=async] .cos-fold-content');

        // 监听控制台输出
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        await component.click();
        await page.waitForTimeout(3000);
        const height = await content.evaluate(el => parseInt(getComputedStyle(el).height, 10));

        await page.waitForTimeout(5000);
        const asyncHeight = await content.evaluate(el => parseInt(getComputedStyle(el).height, 10));

        await component.click();
        expect(asyncHeight).toBeGreaterThan(height);
        expect(consoleMessages[0]).toContain('[fold] trigger toggle event');
        page.removeListener('console', handleConsole);
    });
});

test.describe('[fold]: more action', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/more`);
    });

    test('should show more-link when click', async ({page}) => {
        await page.waitForSelector('[data-testid=more] .cos-fold-switch');
        const component = await page.locator('[data-testid=more] .cos-fold-switch');

        const unfoldText = await component.textContent();
        expect(unfoldText?.trim()).toBe('展开');

        await component.click();
        const more = await page.locator('[data-testid=more] .cos-fold-more');
        const foldText = await more.textContent();
        expect(foldText?.trim()).toBe('查看更多');

        const isVisible = await component.isVisible();
        expect(isVisible).toBe(false);
    });
});

test.describe('[fold]: unfold only action', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/unfold-only`);
    });

    test('should remove fold-switch when click', async ({page}) => {
        await page.waitForSelector('[data-testid=unfold-only] .cos-fold-switch');
        const component = await page.locator('[data-testid=unfold-only] .cos-fold-switch');

        const unfoldText = await component.textContent();
        expect(unfoldText?.trim()).toBe('展开');

        await component.click();
        const isVisible = await component.isVisible();
        expect(isVisible).toBe(false);
    });
});

test.describe('[fold]: fold height props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/fold-height`);
    });

    test('should watch fold height', async ({page}) => {
        await page.waitForSelector('[data-testid=fold-height] .change-button');
        const button = await page.locator('[data-testid=fold-height] .change-button');
        const content = await page.locator('[data-testid=fold-height] .cos-fold-content');
        const originalHeight = await content.evaluate(el => getComputedStyle(el).height);
        expect(originalHeight).toBe('150px');

        button.click();
        await page.waitForTimeout(5000);
        const updatedHeight = await content.evaluate(el => getComputedStyle(el).height);
        expect(updatedHeight).toBe('90px');

        const foldSwitch = await page.locator('[data-testid=fold-height] .cos-fold-switch');
        foldSwitch.click();
        await page.waitForTimeout(3000);
        const unfoldHeight = await content.evaluate(el => getComputedStyle(el).height);
        expect(parseInt(unfoldHeight, 10)).toBeGreaterThan(parseInt(updatedHeight, 10));

        // 展开状态下更新高度不变
        button.click();
        await page.waitForTimeout(3000);
        const height = await content.evaluate(el => getComputedStyle(el).height);
        expect(height).toBe(unfoldHeight);
    });
});
