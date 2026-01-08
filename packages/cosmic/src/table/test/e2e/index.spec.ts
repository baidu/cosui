/**
 * @file Table 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/table';

test.describe('[table]: basic props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/basic`);
    });

    test('should displayed striped and borderless style by default', async ({page}) => {
        await page.waitForSelector('[data-testid="basic-table"] .cos-table');
        const tableComponent = await page.locator('[data-testid="basic-table"] .cos-table .cos-table-main').first();
        await expect(tableComponent).toBeVisible();
        await expect(tableComponent).toHaveClass(/cos-table-striped/);
    });

    test('should displayed row style when the border property is set to row', async ({page}) => {
        await page.waitForSelector('[data-testid="basic-table"] .cos-table');
        const tableComponent = await page.locator('[data-testid="basic-table"] .cos-table .cos-table-main').nth(2);
        await expect(await page.locator('[data-testid="basic-table"] .cos-table .cos-table-border-row'
        ).first()).toBeVisible();

        const thBorders = await tableComponent.locator('.cos-table-th .cos-table-border-row');
        const tdBorders = await tableComponent.locator('.cos-table-td .cos-table-border-row');

        for (let i = 0; i < await thBorders.count(); i++) {
            const thBorder = thBorders.nth(i);
            const tdBorder = tdBorders.nth(i);
            const thBorderHeight = await thBorder.evaluate(el => getComputedStyle(el).height);
            expect(thBorderHeight).toBe('1px');

            const tdBorderDisplay = await tdBorder.evaluate(el => getComputedStyle(el).display);
            expect(tdBorderDisplay).toBe('none');
        }
    });

    test('should filter content with content when the content property is set', async ({page}) => {
        await page.waitForSelector('[data-testid="basic-table"] .cos-table');
        const tdEl = await page.locator('[data-testid="basic-table"] .custom-border .cos-table-td').nth(3);
        const content = await tdEl.textContent();
        expect(content?.endsWith('月')).toBeTruthy();
    });

    test('default table click event', async ({page}) => {
        await page.waitForSelector('[data-testid="basic-table"] .cos-table');
        const tdEl = await page.locator('[data-testid="basic-table"] .cos-table-td').first();

        const consoleMessages: string[] = [];
        page.on('console', message => {
            consoleMessages.push(message.text());
        });

        await tdEl.click();

        expect(consoleMessages[0]).toContain('row[0] be click!');
        expect(consoleMessages[1]).toContain('cell[0][0] be click!');
    });
});

test.describe('[table]: fixed props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/fixed-column`);
    });

    test('should fix column when set fixed', async ({page}) => {
        await page.waitForSelector('[data-testid="fixed-column"] .cos-table');
        const tdEl = await page.locator('[data-testid="fixed-column"] .cos-table .cos-table-td').first();
        const position = await tdEl.evaluate(el => getComputedStyle(el).position);
        expect(position).toBe('sticky');

        const left = await tdEl.evaluate(el => getComputedStyle(el).left);
        expect(left).toBe('0px');

        await page.evaluate(() => {
            const tableComponent = document.querySelector('[data-testid="fixed-column"] .cos-table');
            tableComponent?.scrollBy(100, 0);
        });
        await page.waitForTimeout(1000);
        expect(await tdEl.getAttribute('class')).toContain('cos-table-column-left-shadow');
    });
});

test.describe('[table]: span props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/span-cell`);
    });

    test('should span cell when set rowspan/colspan', async ({page}) => {
        await page.waitForSelector('[data-testid="span-cell"] .cos-table');
        const trEls = await page.locator('[data-testid="span-cell"] .cos-table .cos-table-body-tr');

        // 获取第一行的单元格
        const firstTrCells = trEls.nth(0).locator('.cos-table-td');
        expect(await firstTrCells.nth(1).getAttribute('rowspan')).toBe('2');
        expect(await firstTrCells.nth(2).getAttribute('rowspan')).toBe('2');

        // 获取第三行的单元格
        const thirdTrCells = trEls.nth(2).locator('.cos-table-td');
        expect(await thirdTrCells.nth(2).getAttribute('rowspan')).toBe('3');

        // 获取第最后一行的单元格
        const lastTrCell = trEls.last().locator('.cos-table-td').first();
        expect(await lastTrCell.getAttribute('colspan')).toBe('5');
    });
});

test.describe('[table]: check props and lifecycle', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/e2e-test`);
    });

    test('should cover the detached lifecycle in table component', async ({page}) => {
        await page.waitForSelector('.remove-table .cos-table');
        const tableComponent = page.locator('.remove-table .cos-table');
        const button = page.locator('.cos-button-secondary').nth(0);
        await button.click();
        await expect(tableComponent).not.toBeVisible();
    });

    test('should cover the miss column.prop in table component', async ({page}) => {
        await page.waitForSelector('.reset-prop .cos-table');
        const tableComponent = await page.locator('.reset-prop .cos-table');
        const tdEl = tableComponent.locator('.cos-table-td').first();
        const button = page.locator('.reset-prop .cos-button-secondary').nth(0);
        await button.click();

        const content = await tdEl.textContent();
        expect(content).toBe('');
    });

    test('should cover the illegality prop in table component', async ({page}) => {
        await page.waitForSelector('.illegality-prop .cos-table');
        const tableComponent = await page.locator('.illegality-prop .cos-table');
        const tds = tableComponent.locator('.cos-table-td');

        expect(await tds.count()).toBe(0);
    });

    test('should cover the rowspan/colspan with not-func type in table component', async ({page}) => {
        await page.waitForSelector('.not-func-span .cos-table');
        const trEls = await page.locator('.not-func-span .cos-table .cos-table-body-tr');

        // 获取第一行的单元格
        const firstTrCells = trEls.nth(0).locator('.cos-table-td');
        expect(await firstTrCells.nth(1).getAttribute('rowspan')).toBe('2');

        // 获取第最后一行的单元格
        const lastTrCell = trEls.last().locator('.cos-table-td').first();
        expect(await lastTrCell.getAttribute('colspan')).toBe('1');
    });

    test('should cover the column.fixed with underwidth in table component', async ({page}) => {
        await page.waitForSelector('.unwidth .cos-table');
        const tableComponent = await page.locator('.unwidth .cos-table');
        const tdEl = tableComponent.locator('.cos-table-td').first();

        expect(await tdEl.getAttribute('class')).not.toContain('cos-table-column-fixed');
    });
});
