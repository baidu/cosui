/**
 * @file dialog 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';
import {dispatchTouchEvent} from '@e2e/e2e-utils';

const path = '/components/cosmic/dialog';

test.describe('[dialog]: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('shows mobile default dialog', async ({page}) => {
        const button = page.locator('.cos-button');
        // 检查单按钮弹窗
        const one = button?.nth(0);
        one.click();
        const oneDialog = page.locator('.cos-dialog-container');
        await expect(oneDialog).toBeVisible();
        const cancel = page.locator('.cos-dialog-cancel');
        const ok = page.locator('.cos-dialog-ok');
        const customBehavior = page.locator('.cos-dialog-custom-behavior');
        await expect(cancel).toBeVisible();
        await expect(ok).not.toBeVisible();
        await expect(customBehavior).not.toBeVisible();
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            if (message.type() === 'log') {
                consoleMessages.push(message.text());
            }
        };
        page.on('console', handleConsole);
        cancel.click();
        await expect(oneDialog).not.toBeVisible();
        expect(consoleMessages[0]).toContain('cancel');

        // 检查双按钮弹窗
        const two = button?.nth(1);
        two.click();
        const twoDialog = page.locator('.cos-dialog-container');
        await expect(twoDialog).toBeVisible();
        ok.click();
        await expect(twoDialog).not.toBeVisible();
        expect(consoleMessages[1]).toContain('ok');

        // 检查多按钮弹窗
        const three = button?.nth(3);
        three.click();
        const threeDialog = page.locator('.cos-dialog-container');
        await expect(threeDialog).toBeVisible();
        customBehavior.click();
        await expect(threeDialog).not.toBeVisible();
        expect(consoleMessages[2]).toContain('customBehavior');

        // 检查无操作区弹窗
        const footless = button?.nth(4);
        footless.click();
        const footlessDialog = page.locator('.cos-dialog-container');
        await expect(footlessDialog).toBeVisible();
        const footlessClass = await footlessDialog.evaluate(node => node.className);
        expect(footlessClass).not.toContain('cos-dialog-footer');
        const close = page.locator('.cos-dialog-close');
        // 检查关闭按钮
        close.click();
        await expect(footlessDialog).not.toBeVisible();
        expect(consoleMessages[3]).toContain('dialog close');
    });

    test('check dialog touchmove', async ({page}) => {
        const button = page.locator('.cos-button');
        // 检查自定义大弹窗
        const large = button?.nth(5);
        large.click();
        await expect(large).toBeVisible();
        // 检查遮罩层
        const mask = page.locator('.cos-dialog-mask');
        await expect(mask).toBeVisible();
        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-dialog-mask',
            {
                x: 399,
                y: 320
            },
            {
                x: 361,
                y: 419
            },
            {
                x: 399,
                y: 320
            },
        );
        await expect(mask).toBeVisible();

        // 模拟多根手指
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-dialog-body',
            {
                x: 405,
                y: 694
            },
            {
                x: 540,
                y: 699
            },
            {
                x: 405,
                y: 694
            },
            {
                isMultiFinger: true
            }
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-dialog-body',
            {
                x: 405,
                y: 654
            },
            {
                x: 540,
                y: 669
            },
            {
                x: 405,
                y: 654
            },
            {
                isMultiFinger: true
            }
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-dialog-body',
            {
                x: 405,
                y: 653
            },
            {
                x: 539,
                y: 668
            },
            {
                x: 405,
                y: 653
            },
            {
                isMultiFinger: true
            }
        );

        // 检查弹窗内容的滚动，往下滑
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-dialog-body',
            {
                x: 405,
                y: 694
            },
            {
                x: 540,
                y: 699
            },
            {
                x: 405,
                y: 694
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-dialog-body',
            {
                x: 405,
                y: 654
            },
            {
                x: 540,
                y: 669
            },
            {
                x: 405,
                y: 654
            },
        );
        await page.waitForTimeout(1000);
        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-dialog-body',
            {
                x: 405,
                y: 653
            },
            {
                x: 539,
                y: 668
            },
            {
                x: 405,
                y: 653
            },
        );

        // 检查弹窗内容的滚动，往上滑
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-dialog-body',
            {
                x: 405,
                y: 653
            },
            {
                x: 539,
                y: 668
            },
            {
                x: 405,
                y: 653
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-dialog-body',
            {
                x: 405,
                y: 654
            },
            {
                x: 540,
                y: 669
            },
            {
                x: 405,
                y: 654
            },
        );
        await page.waitForTimeout(1000);

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-dialog-body',
            {
                x: 405,
                y: 694
            },
            {
                x: 540,
                y: 699
            },
            {
                x: 405,
                y: 694
            },
        );

    });
});