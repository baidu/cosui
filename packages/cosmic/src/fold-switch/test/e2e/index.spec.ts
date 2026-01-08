/**
 * @file FoldSwitch 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/fold-switch';

test.describe('[fold-switch]: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('should toggle unfold and fold when click', async ({page}) => {
        await page.waitForSelector('[data-testid=default] .cos-fold-switch');
        const component = await page.locator('[data-testid=default] .cos-fold-switch');
        const unfoldText = await component.textContent();
        expect(unfoldText?.trim()).toBe('展开');

        // 监听控制台输出
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        await component.click();
        const foldText = await component.textContent();
        expect(foldText?.trim()).toBe('收起');

        await component.click();
        const unfoldText2 = await component.textContent();
        expect(unfoldText2?.trim()).toBe('展开');
        page.removeListener('console', handleConsole);
    });
});