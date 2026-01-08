/**
 * @file button e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';
import {dispatchTouchEvent} from '@e2e/e2e-utils';

const path = '/components/cosmic/button';

test.describe('small button', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/small`);
    });

    test('small button', async ({page}) => {
        const button = page.locator('[data-testid=button-small] .cos-button').first();
        expect(await button?.getAttribute('class')).toContain('cos-button-primary');
    });
});

test.describe('button lifecycle', () => {
    test.beforeEach(async ({page}) => {
        await [page.goto(`${path}/lifecycle`)];
    });

    test('should cover the detached lifecycle in button component', async ({page}) => {
        const button = page.locator('[data-testid=button-lifecycle] .cos-button');
        await button.click();
        await expect(button).not.toBeVisible();
    });
});

test.describe('loading button', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/loading`);
    });

    test('loading button', async ({page}) => {
        const button = page.locator('[data-testid=button-loading] .cos-button').first();
        const loading = button.locator('.cos-loading');
        expect(await loading.isVisible()).toBeFalsy();
        await button.click();
        expect(await loading.isVisible()).toBeTruthy();
    });
});

test.describe('disabled button', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/disabled`);
    });

    test('disabled button', async ({page}) => {
        const atts = '[data-testid=button-disabled] .cos-button';
        const button = page.locator(atts).first();
        expect(await button?.getAttribute('class')).toContain('cos-disabled');

        await dispatchTouchEvent(
            page as any,
            'touchstart',
            atts
        );
        expect(await button?.getAttribute('class')).not.toContain('cos-active');

        await dispatchTouchEvent(
            page as any,
            'touchend',
            atts
        );
        expect(await button?.getAttribute('class')).not.toContain('cos-active');
    });
});

let changeSelect = async (page: any, value: string) => {
    const selectEntry = page.locator('.cos-select');
    await selectEntry.click();
    await page.waitForSelector('.cos-select-panel');
    const selectOption = page.locator(`.cos-select-option-text:has-text("${value}")`);
    await selectOption.click();
};

test.describe('button test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('button size & active', async ({page}) => {
        const atts = '[data-testid=button-default] .cos-button';
        const button = page.locator(atts).nth(0);

        const sizes = ['sm', 'md'];
        for (const size of sizes) {
            await changeSelect(page, size);
            expect(await button.getAttribute('class')).toContain(`cos-${size}`);
        }

        await dispatchTouchEvent(page as any, 'touchstart', atts);
        expect(await button.getAttribute('class')).toContain('cos-active');
        await page.waitForTimeout(3000);
        expect(await button.getAttribute('class')).not.toContain('cos-active');
    });

    test('button appearance', async ({page}) => {
        let button = null;

        const appearances = ['primary', 'secondary', 'text', 'text-primary', 'icon'];

        for (const appearance of appearances) {
            button = page.locator(`[data-testid=button-default] .cos-button-${appearance}`);
            expect(await button.getAttribute('class')).toContain(`cos-button-${appearance}`);
        }
    });
});
