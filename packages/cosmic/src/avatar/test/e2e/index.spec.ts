/**
 * @file avatar 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/avatar';

test.describe('[avatar]: size props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('load event', async ({page}) => {
        await page.waitForSelector('.cos-avatar');

        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        const locator = page.locator('h4:text("size: lg (56px)")');
        await locator.click();
        await page.waitForTimeout(3000);

        console.log(consoleMessages);
        expect(consoleMessages).toContain('avatar click');
    });

    test('avatar sizes', async ({page}) => {
        const getSize = async (dom: any): Promise<{ height: string, width: string }> => {
            return await dom.evaluate((el: Element) => {
                return {
                    height: getComputedStyle(el).height,
                    width: getComputedStyle(el).width
                };
            });
        };
        const sizes = {
            xs: '16px',
            sm: '24px',
            md: '40px',
            lg: '56px'
        };

        for (const [size, dimension] of Object.entries(sizes)) {
            const avatarSelector = `.cos-avatar-${size}`;
            await page.waitForSelector(avatarSelector);
            const avatar = page.locator(avatarSelector);
            let {height, width} = await getSize(avatar);
            expect(height).toBe(dimension);
            expect(width).toBe(dimension);
        }
    });
});
