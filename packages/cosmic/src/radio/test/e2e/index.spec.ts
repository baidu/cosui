/**
 * @file Radio 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/radio';

test.describe('radio: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('should render radio', async ({page}) => {
        await page.waitForSelector('.cos-radio');
        const component = await page.locator('.cos-radio').first();
        expect(await component.isVisible()).toBeTruthy();
        await component.click();
    });
});