/**
 * @file avatar-group 组件 E2E 测试
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/avatar-group';

test.describe('[avatar-group]: size props', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });

    test('shows avatar-group size', async ({page}) => {
        const getWidth = (dom: any) => {
            return dom.evaluate((el: Element) => {
                return el.getBoundingClientRect().width;
            });
        };
        const getLeft = (dom: any) => {
            return dom.evaluate((el: Element) => {
                return el.getBoundingClientRect().left;
            });
        };
        const getRight = (dom: any) => {
            return dom.evaluate((el: Element) => {
                return el.getBoundingClientRect().right;
            });
        };

        const sizes = ['xs', 'sm', 'md', 'lg'];

        // Iterate over all sizes, 并检查第一个avatar的left和最后一个avatar的right间的距离是否等于avatar-group的width
        for (const size of sizes) {
            const avatarGroup = page.locator(`.cos-avatar-group-${size}`);
            const avatarGroupWidth = await getWidth(avatarGroup);
            const avatars = page.locator(`.cos-avatar-${size}`);
            const firstAvatarLeft = await getLeft(avatars.nth(0));
            const lastAvatarRight = await getRight(avatars.nth(2));
            expect(lastAvatarRight - firstAvatarLeft).toBe(avatarGroupWidth);
        }

    });
});