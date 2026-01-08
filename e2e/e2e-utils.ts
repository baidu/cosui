/**
 * @file e2e-utils 测试工具公共方法集
 */

import type {BrowserContext} from '@playwright/test';

interface Position {
    x?: number;
    y?: number;
}
interface PageExtraTouchOptions {
    /**
     * @default true
     */
    bubbles?: boolean;
    /**
     * @default true
     */
    cancelable?: boolean;

    /**
     * 是否需要模拟多根手指
     */
    isMultiFinger?: boolean;
}

/**
 * 获取最新一个page，pc跳转是_blank，需要去新的页面校验
 * @param context BrowserContext
 * @returns Page
 */
export function getPages(context: BrowserContext) {
    const pages = context.pages();
    return pages[pages.length - 1];
}

export async function dispatchTouchEvent(
    playWright: any,
    type: 'touchstart' | 'touchend' | 'touchcancel' | 'touchmove',
    selector: string,
    page?: Position,
    screen?: Position,
    client?: Position,
    options?: PageExtraTouchOptions
) {
    await playWright.$eval(
        selector,
        (el: any, options: any) => {
            const rect = el.getBoundingClientRect();

            const {
                client = {},
                page = {},
                screen = {},
                type,
                options: touchOpt
            } = options;

            const touchObj = new Touch({
                clientX: client.x,
                clientY: client.y,
                identifier: Date.now(),
                pageX:
                page.x || (client.x !== undefined ? rect.left + client.x : undefined),
                pageY:
                page.y || (client.y !== undefined ? rect.top + client.y : undefined),
                screenX: screen.x,
                screenY: screen.y,
                target: el
            });
            let touchArr = [touchObj];
            // 模拟多根手指
            if (touchOpt?.isMultiFinger) {
                touchArr.push(touchObj);
            }
            const touchEvent = new TouchEvent(type, {
                bubbles: true,
                cancelable: true,
                ...touchOpt,
                changedTouches: touchArr,
                targetTouches: touchArr,
                touches: touchArr
            });
            return el.dispatchEvent(touchEvent);
        },
        {client, options, page, screen, type}
    );
};
