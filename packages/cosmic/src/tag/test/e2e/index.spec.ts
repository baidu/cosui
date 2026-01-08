/**
 * @file tag e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/tag';

test.describe('tag filled', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/filled`);
    });
    test('tag filled', async ({page}) => {
        const tag = page.locator('[data-testid=tag-filled] .cos-tag');
        const classAttr = await tag.nth(0).getAttribute('class');
        expect(classAttr).toContain('cos-tag-filled');
        expect(classAttr).toContain('cos-color-bg-primary');
        expect(await tag.nth(1).getAttribute('class')).toContain('cos-color-bg-success');
        expect(await tag.nth(2).getAttribute('class')).toContain('cos-color-bg-alive');
    });
});

test.describe('tag outline', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/outline`);
    });
    test('tag outline', async ({page}) => {
        const tag = page.locator('[data-testid=tag-outline] .cos-tag');
        const classAttr = await tag.nth(0).getAttribute('class');
        expect(classAttr).toContain('cos-tag-outline');
        expect(classAttr).toContain('cos-color-border-primary-light');
        expect(await tag.nth(1).getAttribute('class')).toContain('cos-color-border-success-light');
        expect(await tag.nth(2).getAttribute('class')).toContain('cos-color-border-em-light');
    });
});
test.describe('tag with icon', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/icon`);
    });
    test('tag with icon', async ({page}) => {
        const icon = page.locator('[data-testid=tag-icon] .cos-tag > i');
        expect(await icon.nth(0).getAttribute('class')).toContain('cos-icon'); // 检查图标的类
    });
});

test.describe('tag size', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/size`);
    });
    test('tag size', async ({page}) => {
        const tag = page.locator('[data-testid=tag-size] .cos-tag');
        expect(await tag.nth(0).getAttribute('class')).toContain('cos-md');
        expect(await tag.nth(1).getAttribute('class')).toContain('cos-sm');
    });

    test('single character tag should have cos-tag-single-text class', async ({page}) => {
        const tag = page.locator('[data-testid=tag-size] .cos-tag');
        await page.waitForTimeout(100);

        // 检查单字符标签（"新" 和 "沸"）是否有 cos-tag-single-text class
        expect(await tag.nth(2).getAttribute('class')).toContain('cos-tag-single-text');
        expect(await tag.nth(3).getAttribute('class')).toContain('cos-tag-single-text');

        // 检查多字符标签不应该有 cos-tag-single-text class
        expect(await tag.nth(0).getAttribute('class')).not.toContain('cos-tag-single-text'); // "中号标签"
        expect(await tag.nth(1).getAttribute('class')).not.toContain('cos-tag-single-text'); // "小号标签"
    });
});


