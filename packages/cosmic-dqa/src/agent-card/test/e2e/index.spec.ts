/**
 * @file e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic-dqa/agent-card';

test.describe('[agent-card]: agent-card tooltip', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/csr`);
    });
    test('should render correct element', async ({page}) => {
        const component = page.locator('.cosd-agent-card').first();
        expect(component).not.toBeNull();
    });
});