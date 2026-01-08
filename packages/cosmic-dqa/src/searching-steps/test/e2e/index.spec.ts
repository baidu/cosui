/**
 * @file source mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/searching-steps';

test.describe('[source]: default source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-steps');
        const component = await page.locator('div .cosd-searching-steps');
        const stepsIcon = component.locator('.cosd-searching-step-icon').first();
        const stepsTitle = component.locator('.cosd-searching-step-title').first();
        expect(stepsIcon).not.toBeNull();
        expect(stepsTitle).not.toBeNull();
    });

    test('should go to next step correctly with words', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-steps');
        const btn = await page.locator('.cos-button').first();
        const component = await page.locator('div .cosd-searching-steps').first();

        const firstStep = component.locator('.cosd-searching-step-process span').first();
        await expect(firstStep).toHaveText('问题分析');

        await btn.click();
        const secondStep = component.locator('.cosd-searching-step-process span').first();
        await expect(secondStep).toHaveText('搜索全网');
        const description = component.locator('.cosd-searching-step-description').first();
        await expect(description).not.toBeNull();

        await btn.click();
        const lastStep = component.locator('.cosd-searching-step-process span').first();
        await expect(lastStep).toHaveText('信息整理');
        await btn.click();
    });

    test('should go to next step correctly width description', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-steps');
        const btn = await page.locator('.cos-button').last();
        const component = await page.locator('div .cosd-searching-steps').last();
        const firstStep = component.locator('.cosd-searching-step-process span').first();
        await expect(firstStep).toHaveText('问题分析');

        await btn.click();
        const secondStep = component.locator('.cosd-searching-step-process span').first();
        await expect(secondStep).toHaveText('搜索全网');
        const description = component.locator('.cosd-searching-step-description').first();
        await expect(description).toHaveText('搜索全网5篇文章');

        await btn.click();
        const lastStep = component.locator('.cosd-searching-step-process span').first();
        await expect(lastStep).toHaveText('信息整理');
        await btn.click();
    });

});

test.describe('[source]: single source', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/single`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-steps');
        const component = await page.locator('div .cosd-searching-steps');
        const stepsItem = component.locator('.cosd-searching-step').first();
        expect(stepsItem).not.toBeNull();
    });

    test('should go to next step single correctly with words', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-steps');
        const btn = await page.locator('.cos-button').first();
        const component = await page.locator('div .cosd-searching-steps').first();
        const firstStep = component.locator('.cosd-searching-step-process span').first();
        await expect(firstStep).toHaveText('问题分析');

        await btn.click();
        const secondStep = component.locator('.cosd-searching-step-process span').first();
        await expect(secondStep).toHaveText('搜索全网');
        const description = component.locator('.cosd-searching-step-description').first();
        await expect(description).not.toBeNull();

        await btn.click();
        const lastStep = component.locator('.cosd-searching-step-process span').first();
        await expect(lastStep).toHaveText('信息整理');
        await btn.click();
    });

    test('should go to next step single correctly with description', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-steps');
        const btn = await page.locator('.cos-button').last();
        const component = await page.locator('div .cosd-searching-steps').last();
        const firstStep = component.locator('.cosd-searching-step-process span').first();
        await expect(firstStep).toHaveText('问题分析');

        await btn.click();
        const secondStep = component.locator('.cosd-searching-step-process span').first();
        await expect(secondStep).toHaveText('搜索全网');
        const description = component.locator('.cosd-searching-step-description').first();
        await expect(description).toHaveText('搜索全网3篇文章');

        await btn.click();
        const lastStep = component.locator('.cosd-searching-step-process span').first();
        await expect(lastStep).toHaveText('信息整理');
        await btn.click();
    });
});

test.describe('[source]: add step', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/special-case`);
    });

    test('should add step correctly', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-steps');

        const component = await page.locator('div .cosd-searching-steps').first();
        const btn = await page.locator('.cos-button').first();

        const firstStep = component.locator('.cosd-searching-step-process span').first();
        await expect(firstStep).toHaveText('问题分析');

        await btn.click();
        const secondStep = component.locator('.cosd-searching-step-process span').first();
        await expect(secondStep).toHaveText('搜索全网');

        const description = component.locator('.cosd-searching-step-description').first();
        await expect(description).not.toBeNull();

        await btn.click();
        const lastStep = component.locator('.cosd-searching-step-process span').first();
        await expect(lastStep).toHaveText('信息整理');
    });


    test('change single step correctly', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-steps');
        const component = await page.locator('div .cosd-searching-steps').nth(1);
        const btn = await page.locator('.cos-button').nth(1);

        const firstStep = await component.locator('.cosd-searching-step-process span').first();
        expect(firstStep).toHaveText('问题分析');

        await btn.click();
        const secondStep = await component.locator('.cosd-searching-step-process span').first();
        expect(secondStep).toHaveText('搜索全网');

        const description = component.locator('.cosd-searching-step-description').first();
        await expect(description).not.toBeNull();

        await btn.click();
        const lastStep = component.locator('.cosd-searching-step-process span').first();
        await expect(lastStep).toHaveText('信息整理');
    });

    test('should go to third step at beginning', async ({page}) => {
        await page.waitForSelector('div .cosd-searching-steps');
        const component = await page.locator('div .cosd-searching-steps').nth(2);

        const lastStep = component.locator('.cosd-searching-step-process span').first();
        await expect(lastStep).toHaveText('搜索全网');
    });
});
