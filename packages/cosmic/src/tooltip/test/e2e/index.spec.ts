/**
 * @file tooltip 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/tooltip';

test.describe('[tooltip]: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('shows default tooltip', async ({page}) => {
        const button = page.locator('.cos-button');
        const base1 = button?.nth(0);
        base1.click();
        const tooltip = page.locator('.cos-tooltip-trigger');
        await expect(tooltip).toBeVisible();
        base1.click();
        await expect(tooltip).not.toBeVisible();
        const base2 = button?.nth(1);
        base2.click();
        base1.click();
        await expect(tooltip).not.toBeVisible();
        base2.click();
        await page.waitForTimeout(1000);
        base1.click();
        await expect(tooltip).toBeVisible();
        const base3 = button?.nth(2);
        base3.click();
        await expect(tooltip.nth(1)).toBeVisible();
        base3.click();
        await expect(tooltip.nth(1)).not.toBeVisible();
    });
});

test.describe('[tooltip]: trigger props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/trigger`);
    });

    test('shows trigger tooltip', async ({page}) => {
        const button = page.locator('.cos-button');
        const trigger1 = button?.nth(0);
        trigger1.hover();
        const tooltip = page.locator('.cos-tooltip-trigger');
        await expect(tooltip).toBeVisible();
        const box = await tooltip.boundingBox();
        // 移动鼠标到新的位置
        await page.mouse.move(box.x, box.y);
        await expect(tooltip).toBeVisible();
        await page.mouse.move(0, 0);
        await expect(tooltip).not.toBeVisible();

        const trigger2 = button?.nth(1);
        trigger2.click();
        await expect(tooltip.nth(1)).toBeVisible();
        const trigger3 = button?.nth(2);
        trigger3.click();
        await expect(tooltip.nth(1)).not.toBeVisible();
        await expect(tooltip.nth(2)).toBeVisible();
        trigger3.click();
        await expect(tooltip.nth(2)).not.toBeVisible();
    });
});

test.describe('[tooltip]: delay props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/delay`);
    });

    test('shows delay tooltip', async ({page}) => {
        const button = page.locator('.cos-button');
        const delay = button?.nth(0);
        delay.click();
        const tooltip = page.locator('.cos-tooltip-trigger');
        await expect(tooltip).not.toBeVisible();
        await page.waitForTimeout(4000);
        await expect(tooltip).toBeVisible();
        const delay1 = button?.nth(1);
        delay1.click();
        await expect(tooltip.nth(0)).not.toBeVisible();
        await expect(tooltip.nth(1)).toBeVisible();
        delay.click();
        await expect(tooltip.nth(1)).toBeVisible();
        await page.waitForTimeout(4000);
        await expect(tooltip.nth(1)).not.toBeVisible();
    });
});

test.describe('tooltip component lifecycle', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/lifecycle`);
    });

    test('should cover the detached lifecycle in tooltip component', async ({page}) => {
        const tooltipClick = page.locator('.remove-click .cos-tooltip');
        const button = page.locator('.cos-button-secondary');
        await button.nth(0).click();
        await expect(tooltipClick).not.toBeVisible();
        button.nth(1).hover();
        const tooltip = page.locator('.cos-tooltip-trigger');
        await button.nth(1).click();
        await expect(tooltip).not.toBeVisible();
        await button.nth(2).click();

        const buttonT = page.locator('.cos-button');
        await buttonT.nth(3).click();
        await page.evaluate(() => {
            // 创建并派发 app_font_change 事件
            const event = new Event('app_font_change');
            window.dispatchEvent(event);
        });
        await button.nth(3).click();
    });
});

test.describe('tooltip pc resize', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/resize?platform=pc`);
    });

    test('tooltip pc resize', async ({page}) => {
        const trigger = page.locator('.cos-tooltip-trigger');
        await expect(trigger).toBeVisible();
        await page.setViewportSize({width: 800, height: 600});
        await expect(trigger).toBeVisible();
    });
});

test.describe('tooltip app_font_change', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/resize`);
    });

    test('tooltip app_font_change', async ({page}) => {
        const trigger = page.locator('.cos-tooltip-trigger');
        await expect(trigger).toBeVisible();
        await page.evaluate(() => {
            // 创建并派发 app_font_change 事件
            const event = new Event('app_font_change');
            window.dispatchEvent(event);
        });
        await expect(trigger).toBeVisible();
    });
});