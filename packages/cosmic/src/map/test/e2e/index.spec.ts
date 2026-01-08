/**
 * @file e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/map';

test.describe('[map]: basic props and marker', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/marker?platform=pc`);
    });

    test('should render map correctly', async ({page}) => {
        const mapContainer = page.locator('[data-testid=marker] .cos-map');
        await expect(mapContainer).toHaveCount(1);

        const fullScreenButton = mapContainer.locator('.cos-map-fullscreen');
        await expect(fullScreenButton).toHaveCount(1);

        const zoomControl = mapContainer.locator('.cos-map-zoom-control');
        await expect(zoomControl).toHaveCount(1);
    });
});

test.describe('[map]: district', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/district?platform=pc`);
    });

    test('should render map correctly', async ({page}) => {
        const mapContainer = page.locator('[data-testid=district] .cos-map');
        await expect(mapContainer).toHaveCount(1);
    });
});

test.describe('[map]: route', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/route?platform=pc`);
    });

    test('should render map correctly', async ({page}) => {
        const mapContainer = page.locator('[data-testid=route] .cos-map');
        await expect(mapContainer).toHaveCount(1);

        const fullScreenButton = mapContainer.locator('.cos-map-fullscreen');
        await expect(fullScreenButton).toHaveCount(1);

        const zoomControl = mapContainer.locator('.cos-map-zoom-control');
        await expect(zoomControl).toHaveCount(1);
    });

    test('should fire event when click button', async ({page}) => {
        const zoomInButton = page.locator('[data-testid=route] .cos-map .cos-map-zoom-in');
        const zoomOutButton = page.locator('[data-testid=route] .cos-map .cos-map-zoom-out');
        const fullScreenButton = page.locator('[data-testid=route] .cos-map .cos-map-fullscreen');
        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);
        await zoomInButton.click();
        await zoomOutButton.click();
        await fullScreenButton.click();
        await page.waitForTimeout(3000);
        const eventMessages = consoleMessages.filter(msg => msg.includes('[map] trigger'));
        expect(eventMessages.length).toBeGreaterThan(0);
        page.removeListener('console', handleConsole);
    });
});

