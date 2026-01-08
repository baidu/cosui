/**
 * @file avatar-badge 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-card/avatar-badge';

const getStyle = (dom: any, styleName: any) => {
    return dom.evaluate((el: Element, styleName: any) => {
        return getComputedStyle(el)[styleName];
    }, styleName);
};
let changeSelect = async (page: any, value: string) => {
    const selectEntry = page.locator('.cos-select');
    await selectEntry.click();
    await page.waitForSelector('.cos-select-panel');
    const selectOption = page.locator(`.cos-select-option-text:has-text("${value}")`);
    await selectOption.click();
};

test.describe('[avatar-badge]', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('avatarBadge vip styling', async ({page}) => {
        let avatarBadge = page.locator('.cosc-avatar-badge-vip').nth(0);

        // 检查 vip-1 标样式
        const Vip1Border = await getStyle(avatarBadge, 'border');
        const Vip1Background = await getStyle(avatarBadge, 'background');
        let vipBadge = page.locator('.cosc-avatar-badge-vip > .cos-icon').nth(0);
        const Vip1Color = await getStyle(vipBadge, 'color');
        expect(Vip1Border).toBe('1px solid rgb(255, 211, 82)');
        expect(Vip1Background).toBe('rgb(255, 234, 82) none repeat scroll 0% 0% / auto padding-box border-box');
        expect(Vip1Color).toBe('rgb(255, 50, 27)');

        avatarBadge = page.locator('.cosc-avatar-badge-vip').nth(1);
        // 检查 vip-2 标样式
        const Vip2Border = await getStyle(avatarBadge, 'border');
        const Vip2Background = await getStyle(avatarBadge, 'background');
        vipBadge = page.locator('.cosc-avatar-badge-vip > .cos-icon').nth(1);
        const Vip2Color = await getStyle(vipBadge, 'color');
        expect(Vip2Border).toBe('1px solid rgb(255, 255, 255)');
        expect(Vip2Background).toBe('rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
        expect(Vip2Color).toBe('rgb(56, 151, 240)');

        avatarBadge = page.locator('.cosc-avatar-badge-vip').nth(2);
        // 检查 vip-3 标样式
        const Vip3Border = await getStyle(avatarBadge, 'border');
        const Vip3Background = await getStyle(avatarBadge, 'background');
        vipBadge = page.locator('.cosc-avatar-badge-vip > .cos-icon').nth(2);
        const Vip3Color = await getStyle(vipBadge, 'color');
        expect(Vip3Border).toBe('1px solid rgb(255, 255, 255)');
        expect(Vip3Background).toBe('rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
        expect(Vip3Color).toBe('rgb(255, 187, 32)');
    });

    test('avatarBadge size', async ({page}) => {
        const getSize = async (dom: any): Promise<{ height: number, width: number }> => {
            return await dom.evaluate((el: Element) => {
                return {
                    height: Math.round(el.getBoundingClientRect().height),
                    width: Math.round(el.getBoundingClientRect().width)
                };
            });
        };

        const sizeMap = {'md': 14, 'sm': 12};
        let avatarBadge = null;
        for (let size in sizeMap) {
            await changeSelect(page, size);
            await page.waitForTimeout(1000);
            avatarBadge = page.locator(`.cosc-avatar-badge-${size} .cosc-avatar-badge-vip`).nth(0);
            let {height, width} = await getSize(avatarBadge);
            expect(height).toBe(sizeMap[size as keyof typeof sizeMap]);
            expect(width).toBe(sizeMap[size as keyof typeof sizeMap]);
        }
    });

    test('avatarBadge live', async ({page}) => {
        const liveBtn = page.locator('.cosc-avatar-badge-live');
        const text = liveBtn.locator('.cos-badge-value');
        // 直播默认文字
        const liveDefaultText = await text.textContent();
        expect(liveDefaultText?.trim()).toBe('直播中');
        // size 是 md 时设置有效
        await changeSelect(page, 'md');
        const mdLiveInner = page.locator(
            '.cosc-avatar-badge-md .cosc-avatar-badge-live .cosc-avatar-badge-border-inner'
        );
        const mdLiveOuter = page.locator(
            '.cosc-avatar-badge-md .cosc-avatar-badge-live .cosc-avatar-badge-border-outer'
        );
        await expect(mdLiveInner).toBeVisible();
        await expect(mdLiveOuter).toBeVisible();
        // size 不是 md 时， live 设置无效
        await changeSelect(page, 'sm');
        const smLive = page.locator('.cosc-avatar-badge-sm .cosc-avatar-badge-live');
        await expect(smLive).not.toBeVisible();
    });
});



test.describe('[avatar-badge] text 示例', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/text`);
    });

    test('avatarBadge text', async ({page}) => {
        // size 是 md 时文字设置有效
        const md = page.locator('.cosc-avatar-badge-md .cos-badge-value').nth(0);
        const mdText = await md.textContent();
        expect(mdText?.trim()).toBe('示例');
        // size 是 lg 时文字设置有效
        const lg = page.locator('.cosc-avatar-badge-lg .cos-badge-value');
        const lgText = await lg.nth(0).textContent();
        expect(lgText?.trim()).toBe('示例');

        // size不是md/lg时， text 设置无效
        const sm = page.locator('.cosc-avatar-badge-sm .cos-badge-value');
        await expect(sm).not.toBeVisible();
    });
});