/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = '/components/cosmic-dqa/greeting-card';

import {test, expect} from '@playwright/test';

test.describe('GreetingCard Component', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('should render correctly', async ({page}) => {
        const greetingCard = page.locator('.cosd-greeting-card');
        await expect(greetingCard).toBeVisible();
    });

    test('should display avatar', async ({page}) => {
        const avatar = page.locator('.cosd-greeting-card-avatar');
        await expect(avatar).toBeVisible();
    });

    test('should display title and content', async ({page}) => {
        const title = page.locator('.cosd-greeting-card-body-text-title');
        const content = page.locator('.cosd-greeting-card-body-text-content');
        await expect(title).toBeVisible();
        await expect(content).toBeVisible();
    });

    test('should display action buttons', async ({page}) => {
        const buttons = page.locator('.cosd-greeting-card-body-action-btns');
        await expect(buttons).toHaveCount(1);
    });

    test('should apply card appearance by default', async ({page}) => {
        const greetingCard = page.locator('.cosd-greeting-card-card');
        await expect(greetingCard).toBeVisible();
    });
});