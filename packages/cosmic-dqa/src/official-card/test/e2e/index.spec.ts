/**
 * @file official card e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/official-card';

test.describe('OfficialCard Component', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render official', async ({page}) => {
        const card = page.locator('.cosd-official-card');
        await expect(card).toHaveCount(1);

        const poster = card.locator('.cos-image-16-9');
        await expect(poster).toHaveCount(1);

        const mask = card.locator('.cosd-official-card-mask');
        await expect(mask).toHaveCount(1);

        const logo = card.locator('.cosd-official-card-logo img');
        await expect(logo).toHaveCount(1);

        const title = card.locator('.cosd-official-card-info-title-text');
        await expect(title).toHaveText(/.+/);
        const tag = card.locator('.cosd-official-card-info-title-tag');
        await expect(tag).toHaveText(/.+/);

        const urlText = card.locator('.cosd-official-card-info-link');
        await expect(urlText).toHaveText(/.+/);

        const button = card.locator('.cosd-official-card-button');
        await expect(button).toHaveText(/.+/);
    });

    test('should be wrapped in <a> if href exists', async ({page}) => {
        const linkWrapper = page.locator('.cosd-official-card');
        const tagName = await linkWrapper.evaluate(el => el.tagName.toLowerCase());
        expect(tagName).toBe('a');
    });
});

test.describe('OfficialCard Component - No Logo + RGB Gradient', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/noLogo`);
    });

    test('should render correctly without logo', async ({page}) => {
        const card = page.locator('.cosd-official-card');
        await expect(card).toHaveCount(1);
        // 不应该有 logo 元素
        const logo = card.locator('.cosd-official-card-logo');
        await expect(logo).toHaveCount(0);
    });
});