/**
 * @file film-card e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/film-card';

const readMetaZones = (els: Element[]) => {
    const meta = els[0].closest('.cosd-film-card-meta')!.getBoundingClientRect();
    return els.map(el => {
        const {x, width} = el.getBoundingClientRect();
        return {x: x - meta.x, width};
    });
};

const readEllipsis = (el: Element) => el.scrollWidth > el.clientWidth;

const readMaxWidth = (els: Element[]) => els.map(el => getComputedStyle(el).maxWidth);

// 模拟宿主大字版：按比例放大字号与行高 token
const enlargeFontTokens = (el: HTMLElement, scale: number) => {
    const style = getComputedStyle(el);
    const keys = ['subtitle', 'subtitle-sm', 'body', 'caption']
        .flatMap(name => [`--cos-text-${name}`, `--cos-leading-${name}`]);
    for (const key of keys) {
        const value = parseFloat(style.getPropertyValue(key));
        if (value) {
            el.style.setProperty(key, `${value * scale}px`);
        }
    }
};

test.describe('[film-card]: default', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        await expect(card.locator('.cosd-film-card-thumbnail')).toBeVisible();
        await expect(card.locator('.cosd-film-card-title')).toHaveText('龙猫');
        await expect(card.locator('.cosd-film-card-score')).toContainText('豆瓣');
        await expect(card.locator('.cosd-film-card-score')).toContainText('9.2分');
        await expect(card.locator('.cosd-film-card-credit-item')).toHaveCount(2);
        await expect(card.locator('.cosd-film-card-meta-item')).toHaveCount(3);
        await expect(card.locator('.cosd-film-card-meta-text')).toHaveText(['1988年', '动画', '奇幻', '86分钟']);
        await expect(card.locator('.cosd-film-card-source')).toHaveText('爱奇艺');
        await expect(card.locator('.cosd-film-card-action')).toHaveText('播放');
        await expect(card.locator('.cosd-film-card-link')).toHaveCount(0);
    });

    test('should round card with 12px and thumbnail with 9px radius', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        const image = card.locator('.cosd-film-card-thumbnail .cos-image');
        const radius = await image.evaluate(el => getComputedStyle(el).borderTopLeftRadius);
        expect(radius).toBe('9px');
        const cardRadius = await card.evaluate(el => getComputedStyle(el).borderTopLeftRadius);
        expect(cardRadius).toBe('12px');
    });

    test('should put meta zones next to each other without ellipsis', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        const zones = await card.locator('.cosd-film-card-meta-item').evaluateAll(readMetaZones);
        const meta = await card.locator('.cosd-film-card-meta').evaluate(readEllipsis);

        expect(zones).toHaveLength(3);
        zones.forEach((zone, index) => {
            if (index > 0) {
                const prev = zones[index - 1];
                expect(Math.abs(zone.x - (prev.x + prev.width) - 9)).toBeLessThan(1);
            }
        });
        expect(meta).toBe(false);
    });

    test('should share safe area with source and ellipsis at the end when the card is narrow', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        await card.evaluate(el => {
            el.style.width = '300px';
        });
        const metaBox = await card.locator('.cosd-film-card-meta').boundingBox();
        const zones = await card.locator('.cosd-film-card-meta-item').evaluateAll(readMetaZones);
        const isEllipsis = await card.locator('.cosd-film-card-meta').evaluate(readEllipsis);
        const maxWidth = await card.locator('.cosd-film-card-meta, .cosd-film-card-source')
            .evaluateAll(readMaxWidth);

        expect(maxWidth[0]).toBe(maxWidth[1]);
        expect(isEllipsis).toBe(true);
        expect(zones[0].x + zones[0].width).toBeLessThanOrEqual(metaBox!.width);
        expect(zones[1].x + zones[1].width).toBeLessThanOrEqual(metaBox!.width);
        expect(zones[2].x + zones[2].width).toBeGreaterThan(metaBox!.width);
    });

    test('should not ellipsis each zone when host only enlarges font size', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        // 宿主只放大字号，不设置 --font-size-scale
        await card.evaluate(enlargeFontTokens, 1.3);
        const metaBox = await card.locator('.cosd-film-card-meta').boundingBox();
        const zones = await card.locator('.cosd-film-card-meta-item').evaluateAll(readMetaZones);

        await expect(card.locator('.cosd-film-card-meta-item').first()).toHaveText('1988年');
        expect(zones[0].x + zones[0].width).toBeLessThanOrEqual(metaBox!.width);
    });

    test('should stretch thumbnail to the height of text area', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        const cardBox = await card.boundingBox();
        const thumbnail = await card.locator('.cosd-film-card-thumbnail').boundingBox();
        const image = await card.locator('.cosd-film-card-thumbnail .cos-image').boundingBox();
        const content = await card.locator('.cosd-film-card-content').boundingBox();
        expect(thumbnail).not.toBeNull();
        expect(Math.abs(image!.height - thumbnail!.height)).toBeLessThan(1);
        // 封面上下比右文区各缩进 3px（半行距），距卡片边缘 9px
        expect(Math.abs(thumbnail!.y - content!.y - 3)).toBeLessThan(1);
        expect(Math.abs(content!.y + content!.height - (thumbnail!.y + thumbnail!.height) - 3)).toBeLessThan(1);
        expect(Math.abs(thumbnail!.y - cardBox!.y - 9)).toBeLessThan(1);
        expect(Math.abs(cardBox!.y + cardBox!.height - (thumbnail!.y + thumbnail!.height) - 9)).toBeLessThan(1);
    });

    test('should place action at the bottom right corner of the card', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        const cardBox = await card.boundingBox();
        const meta = await card.locator('.cosd-film-card-meta').boundingBox();
        const source = await card.locator('.cosd-film-card-source').boundingBox();
        const action = await card.locator('.cosd-film-card-action').boundingBox();
        expect(Math.abs(cardBox!.x + cardBox!.width - 9 - (action!.x + action!.width))).toBeLessThan(1);
        expect(Math.abs(cardBox!.y + cardBox!.height - 9 - (action!.y + action!.height))).toBeLessThan(1);
        expect(meta!.x + meta!.width).toBeLessThanOrEqual(action!.x);
        expect(source!.x + source!.width).toBeLessThanOrEqual(action!.x);
    });

    test('should keep action button at least 57px wide on mobile', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const btn = await page.locator('.cosd-film-card-action-btn').first().boundingBox();
        expect(Math.abs(btn!.width - 57)).toBeLessThan(1);
        expect(Math.abs(btn!.height - 30)).toBeLessThan(1);
    });

    test('should fade card content to 20% except background when pressed', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        const readOpacity = (selector: string) => card.locator(selector)
            .evaluate(el => getComputedStyle(el).opacity);
        await card.locator('.cosd-film-card-title').hover();
        await page.mouse.down();
        expect(await readOpacity('.cosd-film-card-thumbnail')).toBe('0.2');
        expect(await readOpacity('.cosd-film-card-content')).toBe('0.2');
        expect(await card.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
        await page.mouse.up();
    });

    test('should fade only the action button when it is pressed', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        const readOpacity = (selector: string) => card.locator(selector)
            .evaluate(el => getComputedStyle(el).opacity);
        await card.locator('.cosd-film-card-action-btn').hover();
        await page.mouse.down();
        expect(await readOpacity('.cosd-film-card-content')).toBe('1');
        expect(await readOpacity('.cosd-film-card-thumbnail')).toBe('1');
        expect(await readOpacity('.cosd-film-card-action-btn')).toBe('0.2');
        await page.mouse.up();
    });

    test('should scale thumbnail proportionally in large font mode', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        const thumbnail = card.locator('.cosd-film-card-thumbnail');
        const before = await thumbnail.boundingBox();
        await card.evaluate(el => {
            el.style.setProperty('--font-size-scale', '1.2');
        });
        const after = await thumbnail.boundingBox();
        expect(Math.abs(after!.width - before!.width * 1.2)).toBeLessThan(1);
    });

    test('should fire button-click event', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const logs: string[] = [];
        const onConsole = (msg: {text: () => string}) => logs.push(msg.text());
        page.on('console', onConsole);
        await page.locator('.cosd-film-card-action').first().click();
        expect(logs.join('\n')).toContain('[film-card] trigger button-click event');
        page.removeListener('console', onConsole);
    });
});

test.describe('[film-card]: pc', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default?platform=pc`);
    });

    test('should keep action button at least 88px wide on PC', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const btn = await page.locator('.cosd-film-card-action-btn').first().boundingBox();
        expect(btn!.width).toBeGreaterThanOrEqual(88);
        expect(Math.abs(btn!.height - 30)).toBeLessThan(1);
    });

    test('should change background color on hover', async ({page}) => {
        await page.waitForSelector('.cosd-film-card');
        const card = page.locator('.cosd-film-card').first();
        const readBg = () => card.evaluate(el => getComputedStyle(el).backgroundColor);
        const before = await readBg();
        await card.locator('.cosd-film-card-title').hover();
        expect(await readBg()).not.toBe(before);
    });
});
