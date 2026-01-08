/**
 * @file accordion 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/accordion';
const ACCORDION_SELECTOR = '.cos-accordion';

test.describe('basic accordion', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('expand', async ({page}) => {
        await page.waitForSelector(ACCORDION_SELECTOR);
        const accordionComponent = page.locator(ACCORDION_SELECTOR);
        await expect(accordionComponent).toBeVisible();

        // 点击第一个标题展开
        const firstPanelHeader = page.locator('.cos-accordion-panel-header').first();
        await firstPanelHeader.click();

        // 验证标题点击后内容区展开&&内容是否正确
        const firstPanelContent = page.locator('.cos-accordion-panel-content').first();
        expect(firstPanelContent).toBeVisible();
        const text = await firstPanelContent.innerText();
        expect(text.includes('三花猫是一种身披黑、红（橘）和白三种颜色的猫')).toBeTruthy();

        // 点击最后一个标题展开
        const lastPanelHeader = page.locator('.cos-accordion-panel-header').last();
        await lastPanelHeader.click();
        const lastPanelContent = page.locator('.cos-accordion-panel-content').last();
        expect(lastPanelContent).toBeVisible();


        // 点击第一个标题收起
        await firstPanelHeader.click();
        expect(firstPanelContent).toBeHidden();
    });
});

test.describe('multiple accordion', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/multiple`);
    });

    test('expand', async ({page}) => {
        await page.waitForSelector(ACCORDION_SELECTOR);
        const accordionComponent = page.locator(ACCORDION_SELECTOR);
        await expect(accordionComponent).toBeVisible();

        // 点击第一个标题展开
        const accordionPanelFirstHeader = page.locator('.cos-accordion-panel-header').first();
        await accordionPanelFirstHeader.click();

        // 验证标题点击后内容区展开
        const firstPanelContent = page.locator('.cos-accordion-panel-content').first();
        expect(firstPanelContent).toBeVisible();
        const text = await firstPanelContent.innerText();
        expect(text.includes('三花猫是一种身披黑、红（橘）和白三种颜色的猫')).toBeTruthy();

        // 点击最后一个标题展开
        const lastPanelHeader = page.locator('.cos-accordion-panel-header').last();
        await lastPanelHeader.click();
        const lastPanelContent = page.locator('.cos-accordion-panel-content').last();
        expect(lastPanelContent).toBeVisible();
        expect(firstPanelContent).toBeHidden();


        // 点击最后一个标题收起
        await lastPanelHeader.click();
        expect(lastPanelContent).toBeHidden();
    });
});

test.describe('operation accordion', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/operation`);
    });

    test('insert', async ({page}) => {
        await page.waitForSelector(ACCORDION_SELECTOR);
        const accordionComponent = page.locator(ACCORDION_SELECTOR);
        await expect(accordionComponent).toBeVisible();

        const insertBtn = page.locator('.accordion-operation-head > :first-child');
        await insertBtn.click();
        const panelCount = await page.locator('.cos-accordion-panel').count();
        expect(panelCount).toBe(4);
    });

    test('delete', async ({page}) => {
        await page.waitForSelector(ACCORDION_SELECTOR);
        const accordionComponent = page.locator(ACCORDION_SELECTOR);
        await expect(accordionComponent).toBeVisible();
        const deleteBtn = page.locator('.accordion-operation-head > :last-child');

        await deleteBtn.click();
        const panelCount = await page.locator('.cos-accordion-panel').count();
        expect(panelCount).toBe(2);
    });
});
