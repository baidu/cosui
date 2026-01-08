/**
 * @file toast e2e test for PC
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/toast';

test.describe('pc text toast', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/pc-basic?platform=pc`);
    });

    test('shows short text toast on button click', async ({page}) => {
        // 点击触发短文本提示的按钮
        await page.click('[data-testid="pc-text-toast"] .cos-button:has-text("短文本提示")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('短文本提示');
    });

    test('shows long text toast on button click', async ({page}) => {
        // 点击触发长文本提示的按钮
        await page.click('[data-testid="pc-text-toast"] .cos-button:has-text("长文本提示")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('长文本应清晰的描述现状提示最长的内容在三十字以内避免长篇大论');
    });
});

test.describe('pc type toast', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/pc-type?platform=pc`);
    });

    test('shows info toast on button click', async ({page}) => {
        // 点击触发普通信息提示的按钮
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("普通信息")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('普通信息提示');
    });

    test('shows success toast on button click', async ({page}) => {
        // 点击触发成功信息提示的按钮
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("成功信息")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('成功信息提示');
    });

    test('shows warning toast on button click', async ({page}) => {
        // 点击触发警告信息提示的按钮
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("警告信息")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('警告信息提示');
    });

    test('shows error toast on button click', async ({page}) => {
        // 点击触发错误信息提示的按钮
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("错误信息")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 检查 Toast 是否包含正确的文本
        const message = await toast.locator('.cos-toast-message').textContent();
        expect(message).toContain('错误信息提示');
    });

    test('shows multi toast as queue on button click', async ({page}) => {
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("成功信息")');
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("警告信息")');
        await page.waitForTimeout(500);
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("错误信息")');
        // 检查 Toast 是否出现
        const firstToast = page.locator('.cos-toast').first();
        const firstMessage = await firstToast.locator('.cos-toast-message').textContent();
        expect(firstMessage).toContain('成功信息提示');
        // 等待前两次的 Toast 消失，为了确保消失，等待 2500ms 基础上再多等 300ms
        await page.waitForTimeout(2800);
        const lastToast = page.locator('.cos-toast').first();
        const lastMessage = await lastToast.locator('.cos-toast-message').textContent();
        expect(lastMessage).toContain('错误信息提示');
    });

    test('show max toast count on button click', async ({page}) => {
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("普通信息")');
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("成功信息")');
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("警告信息")');
        await page.click('[data-testid="pc-type-toast"] .cos-button:has-text("错误信息")');
        // 最多只能出现 3 个 Toast
        const count = await page.locator('.cos-toast').count();
        expect(count).toBeLessThanOrEqual(3);
    });
});

test.describe('pc action toast', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/pc-action?platform=pc`);
    });

    test('shows toast with text button', async ({page}) => {
        // 点击触发带文字按钮的 Toast
        await page.click('[data-testid="pc-action-toast"] .cos-button:has-text("显示文字按钮")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 验证按钮文本
        const button = toast.locator('.cos-toast-link');
        await expect(button).toContainText('文字按钮');
        // 点击 Toast 右侧文字按钮并验证回调执行
        await button.click();
        await expect(toast).not.toBeVisible();
    });

    test('shows toast with text and close button', async ({page}) => {
        // 点击触发带文字和关闭按钮的 Toast
        await page.click('[data-testid="pc-action-toast"] .cos-button:has-text("显示文字和关闭按钮")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 验证按钮文本
        const button = toast.locator('.cos-toast-link');
        await expect(button).toContainText('文字按钮');
        // 检查关闭按钮是否存在
        const closeButton = toast.locator('.cos-toast-close-icon');
        await expect(closeButton).toBeVisible();
        // 点击 Toast 右侧关闭按钮并验证回调执行
        await closeButton.click();
        await expect(toast).not.toBeVisible();
    });

    test('shows type toast with text button', async ({page}) => {
        // 点击触发带类型和文字按钮的 Toast
        await page.click('[data-testid="pc-action-toast"] .cos-button:has-text("类型信息组合文字按钮")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 验证按钮文本
        const button = toast.locator('.cos-toast-link');
        await expect(button).toContainText('文字按钮');
    });

    test('shows type toast with text and close button', async ({page}) => {
        // 点击触发带类型和文字和关闭按钮的 Toast
        await page.click('[data-testid="pc-action-toast"] .cos-button:has-text("类型信息组合文字和关闭按钮")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();
        // 验证按钮文本
        const button = toast.locator('.cos-toast-link');
        await expect(button).toContainText('文字按钮');
        // 检查关闭按钮是否存在
        const closeButton = toast.locator('.cos-toast-close-icon');
        await expect(closeButton).toBeVisible();
    });
});

test.describe('pc action toast', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/pc-config?platform=pc`);
    });

    test('shows toast with custom top', async ({page}) => {
        // 点击触发自定义 top 位置的 Toast
        await page.click('.cos-button:has-text("个性化配置顶部高度")');
        // 检查 Toast 是否出现
        const toast = page.locator('.cos-toast');
        await expect(toast).toBeVisible();

        // 获取 Toast 的实际位置并验证
        const toastBox = await toast.boundingBox();
        expect(toastBox).toBeTruthy();
        const toastBoxY = toastBox?.y;
        expect(toastBoxY).toBeGreaterThanOrEqual(400);
    });

    test('multiple toasts with different top positions work independently', async ({page}) => {
        // 触发 top 配置的 Toast，高度应为 top 配置的 400
        await page.click('.cos-button:has-text("个性化配置顶部高度")');
        const firstToast = page.locator('.cos-toast').nth(0);
        await expect(firstToast).toBeVisible();

        // 记录 Toast 的位置
        const firstBox = await firstToast.boundingBox();
        expect(firstBox).toBeTruthy();
        const firstBoxY = firstBox?.y;
        expect(firstBoxY).toBeGreaterThanOrEqual(400);

        // 等待 Toast 消失
        await page.waitForTimeout(3500);

        // 触发默认配置的 Toast，高度应为 baseTop 配置的 15
        await page.click('.cos-button:has-text("默认设置")');
        const secondToast = page.locator('.cos-toast').nth(0);
        await expect(secondToast).toBeVisible();

        // 记录 Toast 的位置
        const secondBox = await secondToast.boundingBox();
        expect(secondBox).toBeTruthy();
        const secondBoxY = secondBox?.y;
        expect(secondBoxY).toBeGreaterThanOrEqual(15);

        // 等待 Toast 消失
        await page.waitForTimeout(3500);

        // 触发 baseTop 配置的 Toast，高度应为 baseTop 配置的 200
        await page.click('.cos-button:has-text("顶部高度")');
        const thirdToast = page.locator('.cos-toast').nth(0);
        await expect(thirdToast).toBeVisible();

        // 记录 Toast 的位置
        const thirdBox = await secondToast.boundingBox();
        expect(thirdBox).toBeTruthy();
        const thirdBoxY = thirdBox?.y;
        expect(thirdBoxY).toBeGreaterThanOrEqual(200);
    });
});
