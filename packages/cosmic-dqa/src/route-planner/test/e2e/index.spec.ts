/**
 * @file route-planner mobile e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/route-planner';

test.describe('default route-planner', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-route-planner');
        const component = page.locator('div .cosd-route-planner');

        const overviewPath = component.locator('.cosd-route-planner-path');
        const overviewPathItem = component.locator('.cosd-route-planner-path-item').first();
        const overviewSwitch = component.locator('.cosd-route-planner-switch');
        const image = component.locator('.cosd-route-planner-image-item').first();

        expect(overviewPath).not.toBeNull();
        expect(overviewPathItem).not.toBeNull();
        expect(overviewSwitch).not.toBeNull();
        expect(image).not.toBeNull();
    });

    test('should fold correctly', async ({page}) => {
        await page.waitForSelector('div .cosd-route-planner');
        const component = page.locator('div .cosd-route-planner');
        const overviewSwitch = component.locator('.cosd-route-planner-switch');

        // 展开收起正常
        await overviewSwitch.click();
        const unfoldText = await overviewSwitch.textContent();
        const locationList = component.locator('.cosd-route-planner-location-list');
        expect(unfoldText?.trim()).toBe('收起');
        expect(locationList).not.toBeNull();
        await overviewSwitch.click();
        const foldText = await overviewSwitch.textContent();
        expect(foldText?.trim()).toBe('详情');
    });
});

test.describe('unfold route-planner', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/unfold`);
    });

    test('should render correct element', async ({page}) => {
        await page.waitForSelector('div .cosd-route-planner');
        const component = page.locator('div .cosd-route-planner');

        const locationList = component.locator('.cosd-route-planner-location-list');
        const locationRoute = component.locator('.cosd-route-planner-location-route');

        expect(locationList).not.toBeNull();
        expect(locationRoute).not.toBeNull();
    });

    test('should handle click event correctly', async ({page}) => {
        await page.waitForSelector('div .cosd-route-planner');
        const component = page.locator('div .cosd-route-planner');
        const locationItem = component.locator('.cosd-route-planner-location-item').first();
        const routeItem = component.locator('.cosd-route-planner-location-route').first();

        const consoleMessages: string[] = [];
        const handleConsole = (message: any) => {
            consoleMessages.push(message.text());
        };
        page.on('console', handleConsole);

        await locationItem.click();
        expect(consoleMessages[0]).toContain('[route-planner] location click event');
        await routeItem.click();
        expect(consoleMessages[1]).toContain('[route-planner] route click event');
        page.removeListener('console', handleConsole);
    });
});
