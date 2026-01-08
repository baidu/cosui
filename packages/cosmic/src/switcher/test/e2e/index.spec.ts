/**
 * @file switch mobile e2e
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/switcher';

test.describe('switch mobile e2e test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`, {
            waitUntil: 'load'
        });
    });

    test('验证switch点击后切换状态', async ({page}) => {
        const switchEl = page.locator('.cos-switcher');

        const classList = await switchEl.nth(0).getAttribute('class') || '';
        expect(classList.includes('cos-checked')).toBeFalsy();

        await switchEl.nth(0).click();

        const newClassList = await switchEl.nth(0).getAttribute('class') || '';
        expect(newClassList.includes('cos-checked')).toBeTruthy();
    });

    test('验证switch不同size和切换状态的样式', async ({page}) => {
        const switchEl = page.locator('.cos-switcher');
        const mdSwitchEl = switchEl.nth(0);
        const boundingBox = await mdSwitchEl.boundingBox();
        expect(boundingBox?.width).toBe(56);
        expect(boundingBox?.height).toBe(28);

        await page.waitForTimeout(1000);
        const smSwitchEl = switchEl.nth(1);
        const smBoundingBox = await smSwitchEl.boundingBox();
        expect(smBoundingBox?.width).toBe(36);
        expect(smBoundingBox?.height).toBe(20);

        await smSwitchEl.click();
        await page.waitForTimeout(1000);

        // 判断点击后状态token是否正确
        const newClassList = await smSwitchEl.getAttribute('class') || '';
        expect(newClassList.includes('cos-checked')).toBeTruthy();
    });

    test('验证switch设置disabled后状态不可切换', async ({page}) => {
        const switchEl = page.locator('.cos-switcher');

        let switchElClassList = await switchEl.nth(2).getAttribute('class') || '';
        expect(switchElClassList.includes('cos-checked')).toBeFalsy();
        await switchEl.nth(2).click();
        switchElClassList = await switchEl.nth(2).getAttribute('class') || '';
        expect(switchElClassList.includes('cos-checked')).toBeFalsy();


        await switchEl.nth(0).click();


        switchElClassList = await switchEl.nth(2).getAttribute('class') || '';
        expect(switchElClassList.includes('cos-checked')).toBeTruthy();
        await switchEl.nth(2).click();
        switchElClassList = await switchEl.nth(2).getAttribute('class') || '';
        expect(switchElClassList.includes('cos-checked')).toBeTruthy();
    });
});
