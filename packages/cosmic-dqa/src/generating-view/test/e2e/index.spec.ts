/**
 * @file generating-view e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/generating-view';

test.describe('[generating-view]: default demo', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('filled variant renders slot and animation blobs', async ({page}) => {
        const filledCard = page.locator('.cosd-generating-view').first();
        await expect(filledCard).toHaveClass(/cosd-generating-view/);
        await expect(filledCard).toHaveClass(/cosd-generating-view-filled/);
        await expect(filledCard.locator('.cosd-generating-view-animation-blob')).toHaveCount(4);
        await expect(filledCard.locator('.cosd-generating-view-content-icon')).toHaveCount(1);
    });

    test('card variant renders icon title caption', async ({page}) => {
        const card = page.locator('.cosd-generating-view').nth(1);
        await expect(card).toHaveClass(/cosd-generating-view-card/);
        await expect(card.locator('.cosd-generating-view-content-icon'))
            .toHaveAttribute('class', /cosd-generating-view-content-icon/);
        await expect(card.locator('.cosd-generating-view-content-info-title')).toHaveText('标题');
        await expect(card.locator('.cosd-generating-view-content-info-caption')).toHaveText('说明文本');
    });

    test('dark gradient variant overrides gradient style', async ({page}) => {
        const darkCard = page.locator('.cosd-generating-view').nth(2);
        const backgroundStyle = await darkCard.locator('.cosd-generating-view-content')
            .evaluate(el => getComputedStyle(el).backgroundImage);
        expect(backgroundStyle.includes('linear-gradient')).toBeTruthy();
    });
});

test.describe('[generating-view]: ratio demo', () => {
    test('renders every aspect token class', async ({page}) => {
        await page.goto(`${path}/ratio`);

        const ratios = ['16-9', '4-3', '1-1', '3-4', '9-16'];
        for (const ratio of ratios) {
            const selector = `.cosd-generating-view-${ratio.replace('-', '\\-')}`;
            await expect(page.locator(selector)).toBeVisible();
        }
    });
});

test.describe('[generating-view]: dynamic demo', () => {
    const dynamicPath = `${path}/dynamic`;

    test.beforeEach(async ({page}) => {
        await page.goto(dynamicPath);
    });

    test('shows progress view then final image after complete', async ({page}) => {
        await expect(page.locator('.cosd-generating-view').first()).toBeVisible();
        await expect(page.locator('.cosd-generating-view-content-info-caption').first()).toHaveText(/%$/);

        // 等待进度达到 100 后切换到图片
        await page.waitForFunction(() =>
            document.querySelectorAll('.final-image.image-visible').length === 1, null, {timeout: 20000});
        const finalImage = page.locator('.final-image.image-visible');
        await expect(finalImage).toBeVisible();
        await expect(page.locator('.cosd-generating-view')).toHaveCount(0);
    });

    test('regenerate button resets progress and hides image', async ({page}) => {
        const button = page.locator('.cos-button-secondary');
        await button.click();
        await page.waitForSelector('.cosd-generating-view-content-info-caption');
        const progressText = await page.locator('.cosd-generating-view-content-info-caption').first().innerText();
        expect(progressText).toMatch(/\d+%/);
        await expect(page.locator('.final-image.image-visible')).toHaveCount(0);
    });
});

test.describe('[generating-view]: grid demo', () => {
    const gridPath = `${path}/grid`;

    test('renders row with four items and 2x2 grid', async ({page}) => {
        await page.goto(gridPath);

        const rowItems = page.locator('.grid-demo-row .grid-demo-item .cosd-generating-view');
        await expect(rowItems).toHaveCount(4);
        await expect(rowItems.first()).toHaveClass(/cosd-generating-view-9-16/);

        const quadItems = page.locator('.grid-demo-quad .grid-demo-item .cosd-generating-view');
        await expect(quadItems).toHaveCount(4);
        await expect(quadItems.first()).toHaveClass(/cosd-generating-view-16-9/);
    });
});
