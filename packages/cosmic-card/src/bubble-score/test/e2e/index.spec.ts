/**
 * @file bubble-score e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-card/bubble-score';

test.describe('basic style test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic-style`);
    });

    // 测试默认气泡颜色是否正确
    test('bgcolor-test', async ({page}) => {
        await page.waitForSelector('.cosc-bubble-score');
        const bubbleScoreNode = await page.locator('.cosc-bubble-score');
        expect(await bubbleScoreNode?.nth(0)).toHaveClass(/cos-color-bg-primary/);
    });
});
