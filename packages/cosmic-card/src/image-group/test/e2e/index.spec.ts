/**
 * @file imageGroup组件 e2e
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-card/image-group';

test.describe('base image group', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/base`);
    });

    test('base image group', async ({page}) => {
        const imageGroup = page.locator('[data-testid=image-group-default] .cosc-image-group');
        expect(await imageGroup?.nth(0)?.getAttribute('class')).toContain('cosc-image-group');
    });

    test('image group click', async ({page}) => {
        const imageGroup = page.locator('[data-testid=image-group-default] .cosc-image-group');
        await imageGroup.click();

        // 点击后有跳转，需要等待页面加载完成继续操作，避免有异常
        await page.waitForLoadState('load', {
            timeout: 50000
        });
        await page.waitForTimeout(10000);

        const url = page.url();
        expect(url.includes('baidu.com')).toBeTruthy();
    });

});

test.describe('ratio image group', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/ratio`);
    });

    test('ratio image group', async ({page}) => {
        const imageGroup = page.locator('[data-testid=image-group-ratio] .cosc-image-group');
        expect(await imageGroup?.nth(0)?.getAttribute('class')).toContain('cosc-image-group-1-1');
    });
});

test.describe('multi image group', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/multi`);
    });

    test('multi image group', async ({page}) => {
        await page.waitForSelector('div[data-testid=image-group-multi]');
        const imageGroup = await page.$$('div[data-testid=image-group-multi] .cosc-image-group .cos-row');
        expect(imageGroup).toHaveLength(3);
    });

    test('image real tag click event', async ({page}) => {
        await page.waitForSelector('div[data-testid=image-group-multi]');

        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        const imageTagArr = await page.$$('div[data-testid=image-group-multi] .cosc-image-group .cos-row .cos-image');
        await imageTagArr[0].click();

        expect(consoleMessages[1]).toBe('https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753');
    });
});

// test.describe('custom image group', () => {
//     test.beforeEach(async ({page}) => {
//         await page.goto(`${path}/custom`);
//     });

//     test('custom image group', async ({page}) => {
//         await page.waitForSelector('div[data-testid=image-group-costomized]');
//         const imageGroup = await page.$$('div[data-testid=image-group-costomized] .cos-image');
//         expect(await imageGroup[0].getAttribute('class')).toContain('cos-image-fit-fill');
//         expect(await imageGroup[1].getAttribute('class')).toContain('cos-image-fit-fill');
//     });
// });

test.describe('default image group', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('default image group', async ({page}) => {
        await page.waitForSelector('.cosc-image-group');
        const imageGroupTwo = await page.$$('.cosc-image-group:nth-of-type(2)');
        const imageGroupFive = await page.$$('.cosc-image-group:last-of-type');
        expect(await imageGroupTwo[0].getAttribute('class')).not.toContain('cosc-image-group-main');
        expect(await imageGroupFive[0].getAttribute('class')).toContain('cosc-image-group-main');
    });
});
