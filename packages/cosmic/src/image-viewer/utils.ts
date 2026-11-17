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
 *
 * @file ImageViewer 内部工具
 */

export interface RafBatch<T> {
    /**
     * 投递一个值并请求在下一帧 flush；同一帧内多次投递按 reduce 合并
     */
    schedule(value: T): void;

    /**
     * 若有挂起的值则立即 flush 并清空；无挂起为 no-op
     */
    flush(): void;

    /**
     * 丢弃挂起的值并取消下一帧回调（不 flush）；常用于组件销毁
     */
    cancel(): void;
}

/**
 * 创建一个自带状态的 rAF 合帧调度器。
 *
 * 与"回调 + 外部变量"的写法不同：累计值由调度器内部持有，
 * `schedule(value)` 投递数据、`handler(payload)` 每帧拿到合并后的值，
 * 调用方无需再声明和重置任何中间变量。
 *
 * @param handler 每帧执行一次，入参为本帧合并后的值
 * @param reduce  同一帧内多次 schedule 的合并方式；默认「后者覆盖前者」。
 *                累加场景传 `(prev, next) => (prev ?? 0) + next`
 */
export function createRafBatch<T>(
    handler: (payload: T) => void,
    reduce: (prev: T | undefined, next: T) => T = (_prev, next) => next
): RafBatch<T> {
    let rafId: number | null = null;
    let payload: T | undefined;
    let hasPayload = false;

    const run = () => {
        rafId = null;
        if (!hasPayload) {
            return;
        }
        const current = payload as T;
        payload = undefined;
        hasPayload = false;
        handler(current);
    };

    return {
        schedule(value: T) {
            payload = reduce(hasPayload ? payload : undefined, value);
            hasPayload = true;
            if (rafId === null) {
                rafId = requestAnimationFrame(run);
            }
        },

        flush() {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            run();
        },

        cancel() {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            payload = undefined;
            hasPayload = false;
        }
    };
}

/**
 * 把数值夹到 [min, max] 区间内；当 max < min 时返回 min
 */
export function clamp(value: number, min: number, max: number): number {
    if (max < min) {
        return min;
    }
    return Math.min(Math.max(value, min), max);
}

/**
 * 用一次性 <a> 触发下载。不设 download 属性，
 * 让浏览器按响应头（Content-Disposition）或 URL 自行决定文件名。
 */
function saveAs(url: string) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
}

/**
 * 触发浏览器下载指定图片。
 *
 * 跨域图片 URL 上的 `<a download>` 属性会被浏览器忽略、退化为直接打开链接。
 * 因此这里先 fetch 拿到 blob，再走 object URL —— 同源直接生效，跨域时若资源
 * 带 CORS 头也能下载；若 fetch 失败（无 CORS 头）再兜底走原生 a 标签跳转
 */
export function downloadImage(url: string): Promise<void> {
    if (!url) {
        return Promise.reject(new Error('empty url'));
    }
    return fetch(url, {mode: 'cors', credentials: 'omit'})
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const objectUrl = URL.createObjectURL(blob);
            saveAs(objectUrl);
            // 立即撤销 object URL 会打断部分浏览器的下载，延后一帧释放
            setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
        })
        .catch(err => {
            saveAs(url);
        });
}
