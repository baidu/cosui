/**
 * @file dialog 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/dialog';

test.describe('[dialog]: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic?platform=pc`);
    });

    test('shows pc default dialog', async ({page}) => {
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

        // 检查 customBehavior 弹窗
        const three = button?.nth(2);
        three.click();
        const threeDialog = page.locator('.cos-dialog-container');
        await expect(threeDialog).toBeVisible();
        customBehavior.click();
        await expect(threeDialog).not.toBeVisible();
        expect(consoleMessages[2]).toContain('customBehavior');

        // 检查无操作区弹窗
        const footless = button?.nth(3);
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
});

test.describe('[dialog]: appearance props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/appearance?platform=pc`);
    });

    test('shows appearance', async ({page}) => {
        const button = page.locator('.cos-button');
        // info 弹窗
        const info = button?.nth(0);
        info.click();
        const infoDialog = page.locator('.cos-dialog-container');
        await expect(infoDialog).toBeVisible();
        const infoIcon = page.locator('.cos-icon-info-circle-fill');
        await expect(infoIcon).toBeVisible();
        const cancel = page.locator('.cos-dialog-cancel');
        cancel.click();
        await expect(infoDialog).not.toBeVisible();

        // warning 弹窗
        const warning = button?.nth(1);
        warning.click();
        const warningDialog = page.locator('.cos-dialog-container');
        await expect(warningDialog).toBeVisible();
        const warningIcon = page.locator('.cos-icon-info-circle-fill');
        await expect(warningIcon).toBeVisible();
        cancel.click();
        await expect(warningDialog).not.toBeVisible();

        // success 弹窗
        const success = button?.nth(2);
        success.click();
        const successDialog = page.locator('.cos-dialog-container');
        await expect(successDialog).toBeVisible();
        const successIcon = page.locator('.cos-icon-check-circle-fill');
        await expect(successIcon).toBeVisible();
        cancel.click();
        await expect(successDialog).not.toBeVisible();

        // error 弹窗
        const error = button?.nth(3);
        error.click();
        const errorDialog = page.locator('.cos-dialog-container');
        await expect(errorDialog).toBeVisible();
        const errorIcon = page.locator('.cos-icon-close-circle-fill');
        await expect(errorIcon).toBeVisible();
        cancel.click();
        await expect(errorDialog).not.toBeVisible();
    });
});


test.describe('[dialog]: mask props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/mask?platform=pc`);
    });

    test('mask props', async ({page}) => {
        const button = page.locator('.cos-button');
        button.click();
        const dialog = page.locator('.cos-dialog-container');
        await expect(dialog).toBeVisible();
        const mask = page.locator('.cos-dialog-mask');
        const box = await mask.boundingBox();
        await page.mouse.move(box.x, box.y);
        await page.mouse.click(box.x, box.y);
        await expect(dialog).not.toBeVisible();
    });
});