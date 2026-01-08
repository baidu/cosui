/**
 * @file Pagination 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/pagination';

test.use({timeout: 50000});

test.describe('[pagination]: pages display', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/pages?platform=pc`);
    });

    test('should display all page numbers directly within 7 pages', async ({page}) => {
        const selector = '[data-testid="pages-pagination"] .cos-pagination.display-all-pages';
        await page.waitForSelector(selector);
        const paginationComponent = await page.locator(selector);
        await expect(paginationComponent.first()).toBeVisible();
        await expect(paginationComponent.first().locator('.cos-pagination-pager-item')).toHaveCount(5);

        await expect(paginationComponent.nth(1)).toBeVisible();
        await expect(paginationComponent.nth(1).locator('.cos-pagination-pager-item')).toHaveCount(7);
    });

    test('should displayed the first 6 pages + ... + last page when the current page is the first', async ({page}) => {
        const selector = '[data-testid="pages-pagination"] .cos-pagination.display-first-6-pages';
        await page.waitForSelector(selector);
        const paginationComponent = await page.locator(selector).first();
        await expect(paginationComponent).toBeVisible();
        const pagesItem = paginationComponent.locator('.cos-pagination-pager-item');
        await expect(pagesItem).toHaveCount(8);
        for (let i = 0; i < await pagesItem.count(); i++) {
            const pageItem = pagesItem.nth(i);
            if (i === 0) {
                expect(pageItem).toHaveClass(/cos-pagination-pager-item-current/);
            }
            if (i < 6) {
                expect(await pageItem.textContent()).toBe(`${i + 1}`);
            }
            else if (i === 6) {
                expect(pageItem).toHaveClass(/cos-pagination-pager-item-ellipsis/);
                expect(await pageItem.textContent()).toBe('...');
            }
            else {
                expect(await pageItem.textContent()).toBe('10');
            }
        }
    });

    test('should displayed the last 6 pages + ... + last page when the current page is the last', async ({page}) => {
        const selector = '[data-testid="pages-pagination"] .cos-pagination.display-last-6-pages';
        await page.waitForSelector(selector);
        const paginationComponent = await page.locator(selector).first();
        await expect(paginationComponent).toBeVisible();
        const pagesItem = paginationComponent.locator('.cos-pagination-pager-item');
        await expect(pagesItem).toHaveCount(8);

        const pageCount = await pagesItem.count();
        for (let i = pageCount - 1; i >= 0; i--) {
            const pageItem = pagesItem.nth(i);
            if (i === pageCount - 1) {
                expect(pageItem).toHaveClass(/cos-pagination-pager-item-current/);
            }
            if (i === 0) {
                expect(await pageItem.textContent()).toBe('1');
            }
            else if (i === 1) {
                expect(pageItem).toHaveClass(/cos-pagination-pager-item-ellipsis/);
                expect(await pageItem.textContent()).toBe('...');
            }
            else {
                expect(await pageItem.textContent()).toBe(`${20 - pageCount + i + 1}`);
            }
        }
    });

    test('should displayed the center pages when the current page is not the first and last page', async ({page}) => {
        const selector = '[data-testid="pages-pagination"] .cos-pagination.display-center-pages';
        await page.waitForSelector(selector);
        const paginationComponent = await page.locator(selector).first();
        await expect(paginationComponent).toBeVisible();
        const pagesItem = paginationComponent.locator('.cos-pagination-pager-item');
        await expect(pagesItem).toHaveCount(9);

        const currentPageItemContent = await paginationComponent.locator('.cos-pagination-pager-item-current')
            .textContent();
        await expect(currentPageItemContent).not.toBeNull();

        const pageItems = paginationComponent.locator('.cos-pagination-pager-item');
        const count = await pageItems.count();
        let currentIndex = 0;
        for (let i = 0; i < count; i++) {
            const className = await pageItems.nth(i).getAttribute('class');
            if (className?.includes('cos-pagination-pager-item-current')) {
                currentIndex = i;
                break;
            }
        }

        expect(await pagesItem.nth(0).textContent()).toBe('1');
        expect(await pagesItem.nth(currentIndex - 3).textContent()).toBe('...');
        expect(await pagesItem.nth(currentIndex - 2).textContent()).toBe(`${+(currentPageItemContent!) - 2}`);
        expect(await pagesItem.nth(currentIndex - 1).textContent()).toBe(`${+(currentPageItemContent!) - 1}`);
        expect(await pagesItem.nth(currentIndex).textContent()).toBe(`${+(currentPageItemContent!)}`);
        expect(await pagesItem.nth(currentIndex + 1).textContent()).toBe(`${+(currentPageItemContent!) + 1}`);
        expect(await pagesItem.nth(currentIndex + 2).textContent()).toBe(`${+(currentPageItemContent!) + 2}`);
        expect(await pagesItem.nth(currentIndex + 3).textContent()).toBe('...');
        expect(await pagesItem.nth(count - 1).textContent()).toBe('50');
    });
});

test.describe('[pagination]: page click event', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/pages?platform=pc`);
    });

    test('should disabled the previous page button when the current is the first', async ({page}) => {
        const selector = '[data-testid="pages-pagination"] .cos-pagination.display-first-6-pages';
        await page.waitForSelector(selector);
        const paginationComponent = await page.locator(selector).first();

        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        const prevButton = paginationComponent.locator('.cos-pagination-prev');
        await expect(prevButton).toHaveClass(/cos-pagination-in-first-page/);
        await prevButton.click();
        await page.waitForTimeout(1000);
        expect(consoleMessages[0]).toBeUndefined();

        const nextButton = paginationComponent.locator('.cos-pagination-next');
        await nextButton.click();
        await page.waitForTimeout(1000);
        expect(consoleMessages[0]).toContain('pagination] change event');

        page.removeListener('console', handleConsole);
    });

    test('should disabled the next page button when the current is the last', async ({page}) => {
        const selector = '[data-testid="pages-pagination"] .cos-pagination.display-last-6-pages';
        await page.waitForSelector(selector);
        const paginationComponent = await page.locator(selector).first();

        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        const nextButton = paginationComponent.locator('.cos-pagination-next');
        await expect(nextButton).toHaveClass(/cos-pagination-in-last-page/);
        await nextButton.click();
        await page.waitForTimeout(1000);
        expect(consoleMessages[0]).toBeUndefined();

        const prevButton = paginationComponent.locator('.cos-pagination-prev');
        await prevButton.click();
        await page.waitForTimeout(1000);
        expect(consoleMessages[0]).toContain('pagination] change event');

        page.removeListener('console', handleConsole);
    });

    test('should dispatch change event when the page number be clicked', async ({page}) => {
        const selector = '[data-testid="pages-pagination"] .cos-pagination';
        await page.waitForSelector(selector);
        const paginationComponent = await page.locator(selector).last();

        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        const pageItems = paginationComponent.locator('.cos-pagination-pager-item');
        const prevText = await paginationComponent.locator('.cos-pagination-pager-item-current').textContent();

        const count = await pageItems.count();
        let currentIndex = 0;
        for (let i = 0; i < count; i++) {
            const className = await pageItems.nth(i).getAttribute('class');
            if (className?.includes('cos-pagination-pager-item-current')) {
                currentIndex = i;
                break;
            }
        }
        const prevPageItem = pageItems.nth(currentIndex - 1);
        await prevPageItem.click();
        await page.waitForTimeout(1000);
        const currentText = await paginationComponent.locator('.cos-pagination-pager-item-current').textContent();
        expect(consoleMessages[0]).toContain(`[pagination] change event, current: ${currentText} ,prev: ${prevText}`);

        consoleMessages.length = 0;
        const ellipsisItem = await paginationComponent.locator('.cos-pagination-pager-item-ellipsis').first();
        await ellipsisItem.click();
        await page.waitForTimeout(1000);
        expect(consoleMessages[0]).toBeUndefined();

        page.removeListener('console', handleConsole);
    });
});

test.describe('[pagination]: boundary parameter check', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/props?platform=pc`);
    });

    test('should display empty when pageCount less then 0', async ({page}) => {
        const selector = '[data-testid="set-props"] .cos-pagination';
        await page.waitForSelector(selector);
        const paginationComponent = await page.locator(selector).first();
        await expect(paginationComponent).toBeVisible();

        const totalInput = await page.locator('#total-input .cos-input-box');
        await totalInput.click();
        await totalInput.fill('0');
        await page.waitForTimeout(1000);
        expect(paginationComponent).not.toBeVisible();

        const switchEl = await page.locator('.cos-switcher');
        await switchEl.click();
        await page.waitForTimeout(1000);
        expect(paginationComponent).not.toBeVisible();

        const pageCountInput = await page.locator('#page-count-input .cos-input-box');
        await pageCountInput.click();
        await pageCountInput.fill('0');
        await page.waitForTimeout(1000);
        expect(paginationComponent).not.toBeVisible();
    });

    test('should set first page be default when current is less than 0 or greater than pageCount', async ({page}) => {
        const selector = '[data-testid="set-props"] .cos-pagination';
        await page.waitForSelector(selector);
        const paginationComponent = await page.locator(selector).first();
        await expect(paginationComponent).toBeVisible();

        const currentInput = await page.locator('#current-input .cos-input-box');
        await currentInput.click();
        await currentInput.fill('0');
        await page.waitForTimeout(1000);
        const firstPageItem = await paginationComponent.locator('.cos-pagination-pager-item').first();
        expect(firstPageItem).toHaveClass(/cos-pagination-pager-item-current/);

        await currentInput.click();
        await currentInput.fill('999999');
        await page.waitForTimeout(1000);
        expect(firstPageItem).toHaveClass(/cos-pagination-pager-item-current/);
    });
});