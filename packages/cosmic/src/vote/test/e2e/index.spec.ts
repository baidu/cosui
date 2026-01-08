/**
 * @file vote e2e test
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/vote';

test.describe('Vote Component', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(path);
    });

    test('should display options without images correctly', async ({page}) => {
        const voteComponent = page.locator('[data-testid="vote-default"]');
        await expect(voteComponent).toBeVisible();

        const options = voteComponent.locator('.cos-vote-option');
        await expect(options).toHaveCount(2);

        const option1 = options.nth(0);
        const option2 = options.nth(1);

        await expect(option1).toContainText('Option 1');
        await expect(option2).toContainText('Option 2');
    });

    test('should handle option click correctly', async ({page}) => {
        const voteComponent = page.locator('[data-testid="vote-default"]');
        const options = voteComponent.locator('.cos-vote-option');

        await options.nth(0).click();
        const target = voteComponent.locator('.cos-vote-option-result-value');
        await expect(target).toContainText('60%');
    });

    test('should display options with images correctly', async ({page}) => {
        const voteComponent = page.locator('[data-testid="vote-default"]');
        const optionsWithImage = voteComponent.locator('.cos-vote-option-image');

        await expect(optionsWithImage).toHaveCount(2);

        const option1Image = optionsWithImage.nth(0);
        const option2Image = optionsWithImage.nth(1);

        await expect(option1Image).toHaveAttribute('src', 'https://gips2.baidu.com/it/u=504690712,4202149249&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f632_632');
        await expect(option2Image).toHaveAttribute('src', 'https://gips2.baidu.com/it/u=504690712,4202149249&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f632_632');
    });

    test('should handle option click with images correctly', async ({page}) => {
        const voteComponent = page.locator('[data-testid="vote-default"]');
        const optionsWithImage = voteComponent.locator('.cos-vote-option-image');

        await optionsWithImage.nth(0).click();
        const targetWithImage = voteComponent.locator('.cos-vote-option-result-value');
        await expect(targetWithImage).toContainText('30%');
    });
});