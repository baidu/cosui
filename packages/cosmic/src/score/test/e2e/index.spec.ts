/**
 * @file score e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/score';

test.describe('[score] test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    // 关于五星评分demo的测试
    // 测试是否正确渲染了5个星星
    test('5 stars should be rendered', async ({page}) => {
        await page.waitForSelector('.cos-score');
        const scores = page.locator('.cos-score');
        let multiplestarnode = scores.nth(0).locator('.cos-score-icon-empty');
        expect(await multiplestarnode.count()).toBe(5);
    });

    // 测试得分和星星涂色比例是否匹配
    test('scored star color should be rendered correctly according score given', async ({page}) => {
        await page.waitForSelector('.cos-score');
        const scoreLocator = page.locator('.cos-score').nth(0);
        const value = 7.1;
        const max = 10;

        // 算出期望的五分制得分-即(7/10)=(3.5/5)
        const score = value / max * 5;

        // 取期望的整数部分
        const scoreInt = Math.floor(score);

        // 取期望小数部分, 不能直接score - scoreInt, 因为会有js浮点数精度问题，例如：3.5 - 3 = 0.49999999999999994
        const scoreDecimal = (score % 1 * 14);

        // 取出涂满的星星
        const fullStar = scoreLocator.locator('.cos-score-icon:not([class*=" "])');
        const showScoreInt = await fullStar.count();

        // 判断涂满的星星个数是否正确
        expect(showScoreInt).toBe(scoreInt);

        //  如果还有小数部分，则要判断涂一部分的星星涂色的比例是否正确
        if (scoreDecimal) {

            // 避免浮点数精度问题
            const decimal = scoreDecimal.toFixed(2);
            const decimalStar = scoreLocator.locator('.cos-score-icon-decimal');

            // 结果为形为：‘width: 7.7px;’的string
            const widthStyleString = await decimalStar.getAttribute('style') as string;

            // 取出显示的星星宽度
            const showWidth = parseFloat(widthStyleString.split(':')[1].trim().split('p')[0]).toFixed(2);

            // 判断星星的宽度是否正确
            expect(showWidth).toBe(decimal);
        }
    });

    // 测试五星评分的分数显示
    test('multiple-score: score', async ({page}) => {
        await page.waitForSelector('.cos-score');
        const scores = page.locator('.cos-score').nth(1);
        const scoreCountNode = scores.locator('.cos-score-count');
        expect(await scoreCountNode.count()).toBe(1);
    });


    // 关于单星评分demo的测试

    // 测试是否正确渲染了1个星星
    test('1 star num shoud be rendered', async ({page}) => {
        await page.waitForSelector('.cos-score');
        const scores = page.locator('.cos-score').nth(2);
        const multiplestarnode = scores.locator('.cos-score-icon-empty');
        expect(await multiplestarnode.count()).toBe(1);
    });

    // 测试得分和星星涂色比例是否匹配
    test('sigle-score star color should be rendered correctly', async ({page}) => {
        await page.waitForSelector('.cos-score');
        const scoreMultipleStarNode = page.locator('.cos-score').nth(2);
        const value = 3;
        const max = 5;

        // 算出期望得分与满分的比例
        const score = value / max;

        // 取期望小数部分, 同样为了避免浮点数精度问题
        const scoreDecimal = (score % 1 * 14).toFixed(2);
        const decimalStar = scoreMultipleStarNode.locator('.cos-score-icon-decimal');

        // 结果为形为：‘width: 7.7px;’的string
        const widthStyleString = await decimalStar.getAttribute('style') as string;

        // 取出显示的星星宽度
        const showWidth = parseFloat(widthStyleString.split(':')[1].trim().split('%')[0]).toFixed(2);

        // 判断星星的宽度是否正确
        expect(showWidth).toBe(scoreDecimal);
    });

    // 测试单星评分分数显示
    test('score should be showed', async ({page}) => {
        await page.waitForSelector('.cos-score');
        const showScoreSingleNode = page.locator('.cos-score').nth(3);
        const scoreCountNode = showScoreSingleNode.locator('.cos-score-count');
        expect(await scoreCountNode.count()).toBe(1);
    });

    // 测试单星评分文案显示
    test('text should be showed', async ({page}) => {
        await page.waitForSelector('.cos-score');
        const showScoreSingleNode = page.locator('.cos-score').nth(3);
        const scoreTextNode = showScoreSingleNode.locator('.cos-score-text');
        expect(await scoreTextNode.count()).toBe(1);
    });

    // 测试无分数时单元显示
    test('unit should not be showed when no score', async ({page}) => {
        await page.waitForSelector('.cos-score');
        const showScoreUnitNode = page.locator('.cos-score').last();
        const scoreUnitNode = showScoreUnitNode.locator('.cos-score-unit');
        expect(await scoreUnitNode.count()).toBe(0);
    });
});

test.describe('score: change event', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/single-basic-style`);
    });
    test('should not fire change event when click', async ({page}) => {
        await page.waitForSelector('.score-single .cos-score-icon-empty');
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);
        const fisrtIcon = page.locator('.cos-score-icon').first();
        await fisrtIcon.click();

        expect(consoleMessages.length).toBe(0);
        page.removeListener('console', handleConsole);
    });
});

test.describe('score: change event', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/change-value`);
    });

    test('change event should be triggered', async ({page}) => {
        await page.waitForSelector('[data-testid=clearable-false] .cos-score');
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);
        const fisrtIcon = page.locator('[data-testid=clearable-false] .cos-score-icon').first();
        await fisrtIcon.click();

        expect(consoleMessages[0]).toContain('[score] trigger change event');

        await fisrtIcon.click();
        expect(consoleMessages[1]).toBe(undefined);
    });

    test('value should be 0 when click the same value', async ({page}) => {
        await page.waitForSelector('[data-testid=clearable-true] .cos-score');
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);
        const fisrtIcon = page.locator('[data-testid=clearable-true] .cos-score-icon').first();
        await fisrtIcon.click();
        expect(consoleMessages[0]).toContain('[score] trigger change event');

        // 二次点击清空
        await fisrtIcon.click();
        expect(consoleMessages[1]).toContain('value: 0');

    });
});
