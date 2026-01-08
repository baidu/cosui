/**
 * @file drawer 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';
import {dispatchTouchEvent} from '@e2e/e2e-utils';

const path = '/components/cosmic/drawer';

test.describe('drawer: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('shows drawer on button click', async ({page}) => {
        await page.waitForSelector('.cos-button');
        // 点击触发 drawer 的按钮
        await page.click('.cos-button');
        // 检查 drawer 是否出现
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合底部位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-bottom');
        // 检查标题
        const title = page.locator('.cos-drawer-title');
        const titleText = await title.textContent();
        expect(titleText?.trim()).toBe('标题');
        // 检查遮罩层
        const mask = page.locator('.cos-drawer-mask');
        await expect(mask).toBeVisible();

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-mask',
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
        // 是否有关闭按钮
        const close = page.locator('.cos-drawer-close');
        await expect(close).toBeVisible();
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            if (message.type() === 'log') {
                consoleMessages.push(message.text());
            }
        };
        page.on('console', handleConsole);

        // 点击关闭按钮
        page.click('.cos-drawer-close');
        // 检查 drawer 是否消失
        await expect(drawer).not.toBeVisible();
        expect(consoleMessages[0]).toContain('handleClose');
    });
});

test.describe('drawer:position', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/position`);
    });

    test('dragging less than 30 is not effective', async ({page}) => {
        // 点击触发底部位置显示的 Drawer 按钮
        await page.click('.cos-button:has-text("底部抽屉")');
        // 检查 Drawer 是否出现在底部位置
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合底部位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-bottom');
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);
        // 下滑滑动关闭
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-container',
            {
                x: 514,
                y: 899
            },
            {
                x: 525,
                y: 774
            },
            {
                x: 514,
                y: 899
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 504,
                y: 928
            },
            {
                x: 519,
                y: 803
            },
            {
                x: 504,
                y: 928
            },
        );
        await page.waitForTimeout(1000);
        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-container',
            {
                x: 504,
                y: 928
            },
            {
                x: 519,
                y: 803
            },
            {
                x: 504,
                y: 928
            },
        );
        await page.waitForTimeout(1000);
        await expect(drawer).toBeVisible();
    });

    test('bottom: Dragging did not meet the closing condition', async ({page}) => {
        // 点击触发底部位置显示的 Drawer 按钮
        await page.click('.cos-button:has-text("底部抽屉")');
        // 检查 Drawer 是否出现在底部位置
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合底部位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-bottom');
        // 下滑滑动关闭
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-container',
            {
                x: 514,
                y: 899
            },
            {
                x: 525,
                y: 774
            },
            {
                x: 514,
                y: 899
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 504,
                y: 933
            },
            {
                x: 519,
                y: 810
            },
            {
                x: 504,
                y: 933
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 504,
                y: 938
            },
            {
                x: 519,
                y: 813
            },
            {
                x: 504,
                y: 938
            },
        );
        await page.waitForTimeout(1000);
        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-container',
            {
                x: 504,
                y: 938
            },
            {
                x: 519,
                y: 813
            },
            {
                x: 504,
                y: 938
            },
        );
        await page.waitForTimeout(1000);
        await expect(drawer).toBeVisible();
    });

    test('left: Dragging did not meet the closing condition', async ({page}) => {
        // 点击触发左侧位置显示的 Drawer 按钮
        await page.click('.cos-button:has-text("左侧抽屉")');
        // 检查 Drawer 是否出现在左侧位置
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合左侧位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-left');
        // 左滑滑动关闭
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-container',
            {
                x: 445,
                y: 779
            },
            {
                x: 516,
                y: 740
            },
            {
                x: 445,
                y: 779
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 435,
                y: 779
            },
            {
                x: 506,
                y: 740
            },
            {
                x: 435,
                y: 779
            },
        );
        await page.waitForTimeout(1000);
        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-container',
            {
                x: 435,
                y: 779
            },
            {
                x: 506,
                y: 740
            },
            {
                x: 435,
                y: 779
            }
        );
        await page.waitForTimeout(1000);
        await expect(drawer).toBeVisible();
    });

    test('shows drawer at bottom on button click', async ({page}) => {
        // 点击触发底部位置显示的 Drawer 按钮
        await page.click('.cos-button:has-text("底部抽屉")');
        // 检查 Drawer 是否出现在底部位置
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合底部位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-bottom');

        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            if (message.type() === 'log') {
                consoleMessages.push(message.text());
            }
        };
        page.on('console', handleConsole);
        // 模拟多根手指
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-container',
            {
                x: 514,
                y: 899
            },
            {
                x: 525,
                y: 774
            },
            {
                x: 514,
                y: 899
            },
            {
                isMultiFinger: true
            }
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 489,
                y: 1018
            },
            {
                x: 509,
                y: 851
            },
            {
                x: 489,
                y: 1018
            },
            {
                isMultiFinger: true
            }
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-container',
            {
                x: 489,
                y: 1018
            },
            {
                x: 509,
                y: 851
            },
            {
                x: 489,
                y: 1018
            },
            {
                isMultiFinger: true
            }
        );

        // 下滑滑动关闭
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-container',
            {
                x: 514,
                y: 899
            },
            {
                x: 525,
                y: 774
            },
            {
                x: 514,
                y: 899
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 489,
                y: 1018
            },
            {
                x: 509,
                y: 851
            },
            {
                x: 489,
                y: 1018
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-container',
            {
                x: 489,
                y: 1018
            },
            {
                x: 509,
                y: 851
            },
            {
                x: 489,
                y: 1018
            },
        );
        await expect(drawer).not.toBeVisible();
        // 下拉关闭后是否派发 close 事件
        expect(consoleMessages[0]).toContain('handleClose');
    });

    test('shows drawer at top on button click', async ({page}) => {
        // 点击触发顶部位置显示的 Drawer 按钮
        await page.click('.cos-button:has-text("顶部抽屉")');
        // 检查 Drawer 是否出现在顶部位置
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合顶部位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-top');
        // 上滑滑动关闭
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-container',
            {
                x: 417,
                y: 232
            },
            {
                x: 495,
                y: 355
            },
            {
                x: 417,
                y: 232
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 417,
                y: 171
            },
            {
                x: 495,
                y: 309
            },
            {
                x: 417,
                y: 171
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-container',
            {
                x: 417,
                y: 171
            },
            {
                x: 495,
                y: 309
            },
            {
                x: 417,
                y: 171
            },
        );
        await expect(drawer).not.toBeVisible();
    });

    test('shows drawer at left on button click', async ({page}) => {
        // 点击触发左侧位置显示的 Drawer 按钮
        await page.click('.cos-button:has-text("左侧抽屉")');
        // 检查 Drawer 是否出现在左侧位置
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合左侧位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-left');
        // 左滑滑动关闭
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-container',
            {
                x: 445,
                y: 779
            },
            {
                x: 516,
                y: 740
            },
            {
                x: 445,
                y: 779
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 380,
                y: 745
            },
            {
                x: 467,
                y: 740
            },
            {
                x: 380,
                y: 745
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-container',
            {
                x: 380,
                y: 745
            },
            {
                x: 467,
                y: 740
            },
            {
                x: 380,
                y: 745
            }
        );
        await expect(drawer).not.toBeVisible();
    });

    test('shows drawer at right on button click', async ({page}) => {
        // 点击触发右侧位置显示的 Drawer 按钮
        await page.click('.cos-button:has-text("右侧抽屉")');
        // 检查 Drawer 是否出现在右侧位置
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合右侧位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-right');
        // 右滑滑动关闭
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-container',
            {
                x: 251,
                y: 604
            },
            {
                x: 370,
                y: 634
            },
            {
                x: 251,
                y: 604
            }
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 601,
                y: 605
            },
            {
                x: 601,
                y: 639
            },
            {
                x: 601,
                y: 605
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-container',
            {
                x: 601,
                y: 605
            },
            {
                x: 601,
                y: 639
            },
            {
                x: 601,
                y: 605
            },
        );
        await expect(drawer).not.toBeVisible();
    });

    test('shows closeOnSwipe function', async ({page}) => {
        // 关闭下滑关闭功能
        await page.click('.cos-button:has-text("是否可以滑动关闭：true")');
        // 点击触发底部位置显示的 Drawer 按钮
        await page.click('.cos-button:has-text("底部抽屉")');
        // 检查 Drawer 是否出现在底部位置
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合底部位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-bottom');
        // 下滑滑动关闭
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-container',
            {
                x: 514,
                y: 899
            },
            {
                x: 525,
                y: 774
            },
            {
                x: 514,
                y: 899
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-container',
            {
                x: 489,
                y: 1018
            },
            {
                x: 509,
                y: 851
            },
            {
                x: 489,
                y: 1018
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-container',
            {
                x: 489,
                y: 1018
            },
            {
                x: 509,
                y: 851
            },
            {
                x: 489,
                y: 1018
            },
        );
        // 验证 Drawer 是否不能通过下滑关闭
        await expect(drawer).toBeVisible();
    });

});

test.describe('drawer:size', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/size`);
    });
    test('can scroll', async ({page}) => {
        // 点击触发底部位置显示的 Drawer 按钮
        await page.click('.cos-button:has-text("底部最小尺寸")');
        // 检查 Drawer 是否出现在底部位置
        const drawer = page.locator('.cos-drawer-container');
        await expect(drawer).toBeVisible();
        // 验证样式是否符合底部位置的预期
        const positionClass = await drawer.evaluate(node => node.className);
        expect(positionClass).toContain('cos-drawer-bottom');
        // 下滑滑动关闭
        await dispatchTouchEvent(
            page as any,
            'touchstart',
            '.cos-drawer-content',
            {
                x: 572,
                y: 951
            },
            {
                x: 572,
                y: 1335
            },
            {
                x: 572,
                y: 951
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-content',
            {
                x: 572,
                y: 919
            },
            {
                x: 572,
                y: 1302
            },
            {
                x: 572,
                y: 919
            },
        );

        await dispatchTouchEvent(
            page as any,
            'touchmove',
            '.cos-drawer-content',
            {
                x: 572,
                y: 909
            },
            {
                x: 572,
                y: 1593
            },
            {
                x: 572,
                y: 909
            },
        );
        await page.waitForTimeout(1000);
        await dispatchTouchEvent(
            page as any,
            'touchend',
            '.cos-drawer-content',
            {
                x: 572,
                y: 909
            },
            {
                x: 572,
                y: 1293
            },
            {
                x: 572,
                y: 909
            },
        );
        await page.waitForTimeout(1000);
        await expect(drawer).toBeVisible();
    });
});
