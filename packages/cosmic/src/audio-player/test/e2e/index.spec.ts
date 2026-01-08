/**
 * @file AudioPlayer组件 e2e
 */

import {expect, test} from '@bgotink/playwright-coverage';

const path = '/components/cosmic/audio-player';

test.describe('default audio player', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/default`);
    });


    test('default audio player click', async ({page}) => {
        await page.waitForSelector('.cos-audio-player');

        const audioPlayer = await page.locator('.cos-audio-player .cos-audio-player-icon');
        const audioPlayerSvg = await page.locator('.cos-audio-player svg');
        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-audio-player-init');

        // 监听控制台输出
        const consoleMessages: string[] = [];
        page.on('console', message => {
            consoleMessages.push(message.text());
        });

        // 模拟点击播放按钮
        await audioPlayer.click();

        // 等待音频播放结束
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio');
            return audio && audio.ended;
        });
        expect(consoleMessages).toContain('click');
        // 断言音频播放是否结束
        expect(consoleMessages).toContain('audio ended!');
    });

    test('default audio player pause', async ({page}) => {
        await page.waitForSelector('.cos-audio-player');
        const audioPlayer = await page.locator('.cos-audio-player .cos-audio-player-icon');
        const audioPlayerSvg = await page.locator('.cos-audio-player svg');

        // 模拟点击播放按钮
        await audioPlayer.click();
        await page.waitForTimeout(100);

        // 模拟点击暂停按钮
        await audioPlayer.click();
        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-audio-player-pause');

        // 模拟点击继续播放
        await audioPlayer.click();
        const audioPlayerPlay = await page.locator('.cos-audio-player-play');
        await expect(audioPlayerPlay).toBeVisible();
    });

    test('audio visibility', async ({page}) => {
        await page.waitForSelector('.cos-audio-player');
        const audioPlayer = await page.locator('.cos-audio-player .cos-audio-player-icon');
        const audioPlayerSvg = await page.locator('.cos-audio-player svg');

        // 模拟点击播放按钮
        await audioPlayer.click();
        await page.waitForTimeout(100);

        await page.evaluate(() => {
            Object.defineProperty(document, 'hidden', {value: true, configurable: true});
            window.dispatchEvent(new Event('visibilitychange'));
        });
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            Object.defineProperty(document, 'hidden', {value: false, configurable: true});
            window.dispatchEvent(new Event('visibilitychange'));
        });
        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-audio-player-pause');
    });
});


test.describe('enhance audio player', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/enhance`);
    });
    test('enhance audio player click', async ({page}) => {
        await page.waitForSelector('.cos-audio-player');

        const audioPlayer = await page.locator('.cos-audio-player .cos-audio-player-icon');

        // 监听控制台输出
        const consoleMessages: string[] = [];
        page.on('console', message => {
            consoleMessages.push(message.text());
        });

        // 模拟点击播放按钮
        await audioPlayer.click();

        // 等待音频播放结束
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio');
            return audio && audio.ended;
        });
        expect(consoleMessages).toContain('click');
        // 断言音频播放是否结束
        expect(consoleMessages).toContain('audio ended!');
    });

    test('enhance audio player pause', async ({page}) => {
        await page.waitForSelector('.cos-audio-player');
        const audioPlayer = await page.locator('.cos-audio-player .cos-audio-player-icon');
        const audioPlayerSvg = await page.locator('.cos-audio-player-enhance .cos-icon');
        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-icon-play-circle');

        // 模拟点击播放按钮
        await audioPlayer.click();
        await page.waitForTimeout(100);
        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-icon cos-icon-pause-circle');

        // 模拟点击暂停按钮
        await audioPlayer.click();
        const audioPlayerPlay = await page.locator('.cos-icon-play-circle');
        await expect(audioPlayerPlay).toBeVisible();

        // 模拟点击继续按钮
        await audioPlayer.click();
        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-icon cos-icon-pause-circle');
    });
});

test.describe('loop audio player', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/loop`);
    });

    test('loop audio player click', async ({page}) => {
        await page.waitForTimeout(1000);
        await page.waitForSelector('.cos-audio-player .cos-audio-player-icon');
        const audioPlayer = await page.locator('.cos-audio-player .cos-audio-player-icon');
        const audioPlayerSvg = await page.locator('.cos-audio-player svg');
        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-audio-player-init');

        await audioPlayer.click({force: true});
        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-audio-player-play');
    });

    test('loop audio player pause', async ({page}) => {
        await page.waitForSelector('.cos-audio-player');
        const audioPlayer = await page.locator('.cos-audio-player .cos-audio-player-icon');
        const audioPlayerSvg = await page.locator('.cos-audio-player svg');

        // 模拟点击播放按钮
        await audioPlayer.click();
        await page.waitForTimeout(100);

        // 模拟点击暂停按钮
        const audioPlayerPlay = await page.locator('.cos-audio-player-play');
        await audioPlayerPlay.click();
        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-audio-player-pause');

        // 模拟点击继续播放
        await audioPlayer.click();
        await expect(audioPlayerPlay).toBeVisible();
    });
});

test.describe('multi audio player', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/multi`);
    });

    test('multi audio player click', async ({page}) => {
        await page.waitForSelector('.cos-audio-player');

        const audioPlayer = await page.$$('.cos-audio-player .cos-audio-player-icon');
        const audioPlayerSvgs = await page.$$('.cos-audio-player svg');
        expect(await audioPlayerSvgs[0].getAttribute('class')).toContain('cos-audio-player-init');
        expect(await audioPlayerSvgs[1].getAttribute('class')).toContain('cos-audio-player-init');
        await audioPlayer[0].click();
        expect(await audioPlayerSvgs[1].getAttribute('class')).not.toContain('cos-audio-player-play');
    });
});

test.describe('src audio player', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/error`);
    });

    test('src audio player click', async ({page}) => {
        await page.waitForSelector('.cos-audio-player');
        const audioPlayer = await page.locator('.cos-audio-player .cos-audio-player-icon');
        const audioPlayerSvg = await page.locator('.cos-audio-player svg');

        // 模拟点击播放按钮
        await audioPlayer.click();
        await page.waitForTimeout(100);

        expect(await audioPlayerSvg.getAttribute('class')).toContain('cos-audio-player-init');
    });
});


test.describe('audio component lifecycle', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(`${path}/lifecycle`);
    });

    test('should cover the detached lifecycle in audio component', async ({page}) => {
        await page.waitForSelector('.cos-audio-player');
        const audioPlayer = await page.locator('.cos-audio-player svg');
        const button = page.locator('.cos-button');
        await button.click();
        await expect(audioPlayer).not.toBeVisible();
    });
});