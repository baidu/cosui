/**
 * @file title component e2e test for PC and Mobile
 */

import {expect, test} from '@bgotink/playwright-coverage';

test.describe('title', () => {
    const basePath = '/components/cosmic-card/title/';

    // 默认插槽：渲染了插槽节点
    test('default slot: renders text node', async ({page}) => {
        await page.goto(`${basePath}default-slot`);
        await page.waitForSelector('.cosc-title .cosc-title-a');
        const titleElement = page.locator('.cosc-title .cosc-title-a');
        await expect(titleElement).toBeVisible();
    });

    // 高亮：存在 em 标签
    test('highlight with default slot: renders em tag', async ({page}) => {
        await page.goto(`${basePath}highlight-red`);
        await page.waitForSelector('.cosc-title em');
        const emTag = page.locator('.cosc-title em');
        await expect(emTag).toBeVisible();
    });

    // 设置不同size，字体规格不一样
    test('size is xs', async ({page}) => {
        await page.goto(`${basePath}size`);
        const ele = page.locator('.cosc-title .cosc-title-xs');
        await expect(ele).toBeVisible();
    });
    test('size is sm', async ({page}) => {
        await page.goto(`${basePath}size`);
        const ele = page.locator('.cosc-title .cosc-title-sm');
        await expect(ele).toBeVisible();
    });
    test('size is md', async ({page}) => {
        await page.goto(`${basePath}size`);
        const ele = page.locator('.cosc-title .cosc-title-md');
        await expect(ele).toBeVisible();
    });
    test('size is lg', async ({page}) => {
        await page.goto(`${basePath}size`);
        const ele = page.locator('.cosc-title .cosc-title-lg');
        await expect(ele).toBeVisible();
    });

    // url 属性：渲染了 a 标签
    test('url prop: renders anchor tag', async ({page}) => {
        await page.goto(`${basePath}url`);
        const anchorElements = page.locator('.cosc-title .cosc-title-a');
        const count = await anchorElements.count();

        for (let i = 0; i < count; ++i) {
            const href = await anchorElements.nth(i).getAttribute('href');
            expect(href).toBe('https://www.baidu.com');
        }
    });


    // icon 为 url 时
    test('icon is url: renders background image correctly, width and height are 14px', async ({page}) => {
        await page.goto(`${basePath}custom-icon`);
        const iconElement = page.locator('.cosc-title.cosc-title-icon-size-14 .cosc-title-icon');
        await expect(iconElement).toHaveCSS('background-image', 'url("https://www.baidu.com/favicon.ico")');
        await expect(iconElement).toHaveCSS('width', '14px');
        await expect(iconElement).toHaveCSS('height', '14px');
    });
    test('icon is url: renders background image correctly, width and height are 16px', async ({page}) => {
        await page.goto(`${basePath}custom-icon`);
        const iconElement = page.locator('.cosc-title.cosc-title-icon-size-16 .cosc-title-icon');
        await expect(iconElement).toHaveCSS('background-image', 'url("https://www.baidu.com/favicon.ico")');
        await expect(iconElement).toHaveCSS('width', '16px');
        await expect(iconElement).toHaveCSS('height', '16px');
    });
    test('icon is url: renders background image correctly, width and height are 18px', async ({page}) => {
        await page.goto(`${basePath}custom-icon`);
        const iconElement = page.locator('.cosc-title.cosc-title-icon-size-18 .cosc-title-icon');
        await expect(iconElement).toHaveCSS('background-image', 'url("https://www.baidu.com/favicon.ico")');
        await expect(iconElement).toHaveCSS('width', '18px');
        await expect(iconElement).toHaveCSS('height', '18px');
    });
    test('icon is url: renders background image correctly, width and height are 20px', async ({page}) => {
        await page.goto(`${basePath}custom-icon`);
        const iconElement = page.locator('.cosc-title.cosc-title-icon-size-20 .cosc-title-icon');
        await expect(iconElement).toHaveCSS('background-image', 'url("https://www.baidu.com/favicon.ico")');
        await expect(iconElement).toHaveCSS('width', '20px');
        await expect(iconElement).toHaveCSS('height', '20px');
    });

    // icon 为组件时
    test('icon is component: renders icon correctly, width and height are 14px', async ({page}) => {
        await page.goto(`${basePath}icon`);
        const iconElement = page.locator('.cosc-title.cosc-title-icon-size-14 i.cosc-title-icon');
        await expect(iconElement).toHaveCSS('font-size', '14px');
    });
    test('icon is component: renders icon correctly, width and height are 16px', async ({page}) => {
        await page.goto(`${basePath}icon`);
        const iconElement = page.locator('.cosc-title.cosc-title-icon-size-16 i.cosc-title-icon');
        await expect(iconElement).toHaveCSS('font-size', '16px');
    });
    test('icon is component: renders icon correctly, width and height are 18px', async ({page}) => {
        await page.goto(`${basePath}icon`);
        const iconElement = page.locator('.cosc-title.cosc-title-icon-size-18 i.cosc-title-icon');
        await expect(iconElement).toHaveCSS('font-size', '18px');
    });
    test('icon is component: renders icon correctly, width and height are 20px', async ({page}) => {
        await page.goto(`${basePath}icon`);
        const iconElement = page.locator('.cosc-title.cosc-title-icon-size-20 i.cosc-title-icon');
        await expect(iconElement).toHaveCSS('font-size', '20px');
    });


    // 标题前有 tag 组件
    test('tag component renders', async ({page}) => {
        await page.goto(`${basePath}tag`);
        const tagElements = page.locator('.cosc-title .cosc-title-tag');
        const count = await tagElements.count();

        for (let i = 0; i < count; ++i) {
            await expect(tagElements.nth(i)).toBeVisible();
        }
    });

    test('click event: checks for console log on click', async ({page}) => {
        await page.goto(`${basePath}click`);
        await page.waitForSelector('.cosc-title');
        const consoleMessagePromise = new Promise(resolve => page.on('console', message => resolve(message.text())));
        const clickableElement = page.locator('.cosc-title');
        await clickableElement.click();
        const consoleMessage = await consoleMessagePromise;
        expect(consoleMessage).toContain('You clicked the title!');
    });

});
