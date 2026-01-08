/**
 * @file image组件 e2e
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-card/image-with-tags';

test.describe('base ImageWithTags', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/base`);
    });
    test('image click、 load and error event', async ({page}) => {
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        await page.waitForSelector('.demo-base-event .cosc-image-with-tags');
        const errImg = page.locator('.demo-base-event .cosc-image-with-tags');
        await errImg.click();
        await page.waitForTimeout(3000);
        expect(consoleMessages).toContain('click image');
        expect(consoleMessages).toContain('error image');

        await errImg.click();
        await page.waitForTimeout(3000);
        expect(consoleMessages).toContain('load image');
    });
});

test.describe('position image', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/position`);
    });

    test('position image', async ({page}) => {
        const image = page.locator('.cosc-image-with-tags-overlay');
        expect(await image?.nth(0)?.getAttribute('class')).toContain('cosc-image-with-tags-left-top');
        expect(await image?.nth(1)?.getAttribute('class')).toContain('cosc-image-with-tags-left-bottom');
        expect(await image?.nth(2)?.getAttribute('class')).toContain('cosc-image-with-tags-right-top');
        expect(await image?.nth(3)?.getAttribute('class')).toContain('cosc-image-with-tags-right-bottom');
    });
});
