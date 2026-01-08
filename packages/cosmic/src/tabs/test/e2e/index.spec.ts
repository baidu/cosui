/**
 * @file tabs e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/tabs';

test.describe('basic tabs', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('switches tabs and displays corresponding content on tab click', async ({page}) => {
        // 定位到 Tabs 组件
        const selector = '[data-testid="basic-tabs"] .custom-content-tabs';
        await page.waitForSelector(selector);
        const tabsComponent = page.locator(selector);
        await expect(tabsComponent).toBeVisible();

        // 点击第二个标签
        const secondTab = tabsComponent.locator('.cos-tab:nth-child(2)');
        await secondTab.click();

        // 验证第二个标签被激活
        const activeTabContent = tabsComponent.locator('.cos-tab-pane');
        await expect(activeTabContent).toBeVisible();
        // 检查活动标签内容是否正确显示
        await expect(activeTabContent).toHaveText('标签内容 2');
    });

    test('dynamically adds a tab and displays corresponding content', async ({page}) => {
        const selector = '.custom-dynamic-tabs .cos-tab:last-child';
        await page.waitForSelector(selector);
        const newTab = page.locator(selector);
        await expect(newTab).toBeVisible();

        await page.click('text=增加 Tab');
        await newTab.click();
        const newTabContent = page.locator('.custom-dynamic-tabs .cos-tab-pane:last-child');
        await expect(newTabContent).toBeVisible();
        await expect(newTabContent).toHaveText('标签内容 3');
    });

    test('dynamically removes a tab and updates the content', async ({page}) => {
        const selector = '.custom-dynamic-tabs .cos-tab';
        await page.waitForSelector(selector);
        const tabsCount = await page.locator(selector).count();
        expect(tabsCount).toBe(2);

        await page.click('text=删除 Tab');
        const lastTabContent = page.locator('.custom-dynamic-tabs .cos-tab-pane:last-child');
        await expect(lastTabContent).toHaveText('标签内容 1');
    });

    test('activates a specific tab on button click', async ({page}) => {
        const selector = '.custom-active-tabs';
        await page.waitForSelector(selector);
        await page.click('text=激活 Tab 3');
        await page.waitForSelector(selector);
        const activeTabContent = page.locator('.custom-active-tabs .cos-tab-pane');
        await expect(activeTabContent).toBeVisible();
        await expect(activeTabContent).toHaveText('标签内容 3');
    });
});

test.describe('appearance tabs', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/appearance`);
    });

    test('displays tabs with bar appearance correctly', async ({page}) => {
        const selector = '[data-testid="appearance-tabs"] .custom-bar-tabs';
        await page.waitForSelector(selector);
        const barTabs = page.locator(selector);
        await expect(barTabs).toBeVisible();
        await expect(barTabs).toHaveClass(/cos-tabs cos-tabs-bar/);
    });

    test('displays tabs with pill appearance correctly', async ({page}) => {
        const selector = '[data-testid="appearance-tabs"] .custom-pill-tabs';
        await page.waitForSelector(selector);
        const pillTabs = page.locator(selector);
        await expect(pillTabs).toBeVisible();
        await expect(pillTabs).toHaveClass(/cos-tabs cos-tabs-pill/);
    });

    test('displays tabs with card appearance correctly', async ({page}) => {
        const selector = '[data-testid="appearance-tabs"] .custom-card-tabs .cos-tabs';
        await page.waitForSelector(selector);
        const cardTabs = page.locator(selector);
        await expect(cardTabs).toBeVisible();
        await expect(cardTabs).toHaveClass(/cos-tabs cos-tabs-card/);
    });

    test('displays tabs with line appearance correctly', async ({page}) => {
        const selector = '[data-testid="appearance-tabs"] .custom-line-tabs';
        await page.waitForSelector(selector);
        const lineTabs = page.locator(selector);
        await expect(lineTabs).toBeVisible();
        await expect(lineTabs).toHaveClass(/cos-tabs cos-tabs-line/);

        // 验证 line 指示器宽度是否设置正确
        const lineIndicator = lineTabs.locator('.cos-tab-indicator');
        await expect(lineIndicator).toHaveCSS('width', '60px');
    });
});

test.describe('scroll tabs', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/scroll`);
    });

    test('scrolls through tabs and displays corresponding content on tab click', async ({page}) => {
        // 定位到 Tabs 组件
        const selector = '[data-testid="scroll-tabs"]';
        await page.waitForSelector(selector);
        const scrollTabs = page.locator(selector);
        await expect(scrollTabs).toBeVisible();

        // 滚动到最后一个标签并点击
        const lastTab = scrollTabs.locator('.cos-tab').nth(19);
        await lastTab.scrollIntoViewIfNeeded();
        await lastTab.click();

        // 验证点击后，最后一个标签内容正确显示
        const activeTabPane = scrollTabs.locator('.cos-tab-pane:visible');
        await expect(activeTabPane).toHaveText('Content for Tab 20');
    });
});

test.describe('custom tabs', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/custom`);
    });

    test('displays double line text tabs correctly', async ({page}) => {
        const selector = '[data-testid="custom-tabs"] .custom-text-tabs';
        await page.waitForSelector(selector);
        const textTabs = page.locator(selector);
        await expect(textTabs).toBeVisible();

        // 验证具有双行文本的 Tab 是否正确渲染
        const firstTab = textTabs.locator('.cos-tab').first();
        await expect(firstTab).toContainText('主标题 1');
        await expect(firstTab).toContainText('副标题 1');
    });

    test('displays image and text tabs correctly', async ({page}) => {
        const selector = '[data-testid="custom-tabs"] .custom-img-tabs';
        await page.waitForSelector(selector);
        const imgTabs = page.locator(selector);
        await expect(imgTabs).toBeVisible();

        // 验证具有图文混合内容的 Tab 是否正确渲染
        const firstImgTab = imgTabs.locator('.cos-tab').first();
        const image = firstImgTab.locator('.cos-img');
        await expect(image).toBeVisible();
        await expect(firstImgTab).toContainText('主标题 1');
    });

    test('displays operational scenario tabs correctly', async ({page}) => {
        const selector = '[data-testid="custom-tabs"] .custom-op-tabs';
        await page.waitForSelector(selector);
        const opTabs = page.locator(selector);
        await expect(opTabs).toBeVisible();

        // 验证运营场景下的 Tab 是否正确渲染
        const opTab = opTabs.locator('.custom-op-tab');
        await expect(opTab).toContainText('运营标题 3');
        const badge = opTab.locator('.op-badge');
        await expect(badge).toHaveText('运营标签');
    });
});
