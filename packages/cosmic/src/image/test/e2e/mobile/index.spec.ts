/**
 * @file image组件 e2e
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/image';

test.describe('default image', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('default image', async ({page}) => {
        const image = page.locator('[data-testid=image-default] .cos-image');
        expect(await image?.nth(0)?.getAttribute('class')).toContain('cos-image');
        expect(await image?.nth(1)?.getAttribute('class')).toContain('cos-image-hover');
    });

    test('image load and error event', async ({page}) => {
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        await page.waitForSelector('[data-testid=image-default] .cos-image');
        const errImg = await page.$('[data-testid=image-default] [data-testid=error-image] .cos-image');

        await errImg!.click();
        await page.waitForTimeout(3000);
        expect(consoleMessages).toContain('error image');

        await errImg!.click();
        await page.waitForTimeout(3000);
        expect(consoleMessages).toContain('load image');
    });
});

test.describe('ratio image', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/ratio`);
    });

    test('ratio image', async ({page}) => {
        const image = page.locator('[data-testid=image-ratio] .cos-image');
        expect(await image?.nth(0)?.getAttribute('class')).toContain('cos-image-3-1');
        expect(await image?.nth(1)?.getAttribute('class')).toContain('cos-image-3-2');
        expect(await image?.nth(2)?.getAttribute('class')).toContain('cos-image-3-4');
        expect(await image?.nth(3)?.getAttribute('class')).toContain('cos-image-1-1');
        expect(await image?.nth(4)?.getAttribute('class')).toContain('cos-image-5-2');
        expect(await image?.nth(5)?.getAttribute('class')).toContain('cos-image-16-9');
    });
});

test.describe('image placeholder', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/placeholder`);
    });

    test('image placeholder', async ({page}) => {
        const placeholder = page.locator('[data-testid=image-placeholder] .cos-image-placeholder');
        expect(placeholder).not.toBeNull();
        // placeholder 插槽
        const placeholderSlot = page.locator('[data-testid=image-placeholder] .cos-loading');
        expect(placeholderSlot).not.toBeNull();
    });
});

test.describe('image fit and position', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/fit-and-position`);
    });

    test('image fit and position', async ({page}) => {
        const image = page.locator('[data-testid=image-fit-and-position] .cos-image');
        expect(await image?.nth(0)?.getAttribute('class')).toContain('cos-image-fit-fill');
        expect(await image?.nth(1)?.getAttribute('class')).toContain('cos-image-fit-contain');
        expect(await image?.nth(2)?.getAttribute('class')).toContain('cos-image-fit-cover');
        expect(await image?.nth(3)?.getAttribute('class')).toContain('cos-image-position-center');
        expect(await image?.nth(4)?.getAttribute('class')).toContain('cos-image-position-top');
        expect(await image?.nth(5)?.getAttribute('class')).toContain('cos-image-position-right');
        expect(await image?.nth(6)?.getAttribute('class')).toContain('cos-image-position-bottom');
        expect(await image?.nth(7)?.getAttribute('class')).toContain('cos-image-position-left');
    });
});

test.describe('image content slot', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/label`);
    });

    test('image content slot', async ({page}) => {
        const image = page.locator('[data-testid=image-label] .cos-image');
        const centerElement = image?.nth(0)?.locator('.cos-icon');
        expect(centerElement).not.toBeNull();
        const ltElement = image?.nth(1)?.locator('div:text("左上角区域")');
        expect(ltElement).not.toBeNull();
        const rtElement = image?.nth(2)?.locator('div:text("右上角区域")');
        expect(rtElement).not.toBeNull();
        const lbElement = image?.nth(3)?.locator('div:text("左下角区域")');
        expect(lbElement).not.toBeNull();
        const rbElement = image?.nth(4)?.locator('div:text("右下角区域")');
        expect(rbElement).not.toBeNull();
    });
});
