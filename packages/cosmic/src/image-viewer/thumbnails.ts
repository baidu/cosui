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
 * @file ImageViewer 底部缩略图列表
 */

import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import {clamp} from './utils';
import type {ImageViewerItem} from './interface';

interface ImageViewerThumbnailsData {
    /**
     * 图片列表数据
     */
    items: ImageViewerItem[];

    /**
     * 当前选中的图片下标
     */
    currentIndex: number;
}

/**
 * 缩略图可用展示比例，及其对应的复合类名后缀
 */
const RATIO_BUCKETS = [
    {value: 1, name: '1-1'},
    {value: 4 / 3, name: '4-3'},
    {value: 3 / 4, name: '3-4'}
];

// 按图片宽高选出最相近的展示比例，返回其复合类名后缀；默认 1:1
function classifyAspectRatio(item: ImageViewerItem): string {
    const {width, height} = item || {};
    if (!width || !height || width <= 0 || height <= 0) {
        return RATIO_BUCKETS[0].name;
    }
    const actual = Math.log(width / height);
    let best = RATIO_BUCKETS[0];
    let bestDelta = Math.abs(actual - Math.log(best.value));
    for (let i = 1; i < RATIO_BUCKETS.length; i++) {
        const delta = Math.abs(actual - Math.log(RATIO_BUCKETS[i].value));
        if (delta < bestDelta) {
            best = RATIO_BUCKETS[i];
            bestDelta = delta;
        }
    }
    return best.name;
}

/**
 * ImageViewer 底部缩略图列表。
 * - 会尽量让选中图片居中
 */
export default class ImageViewerThumbnails extends Component<ImageViewerThumbnailsData> {
    static trimWhitespace = 'all';

    static template = `
        <div
            class="cos-image-viewer-thumbnails"
            on-click="stopPropagation"
        >
            <div class="cos-image-viewer-thumbnail-list">
                <button
                    s-for="item, index in items"
                    type="button"
                    class="cos-image-viewer-thumbnail{{
                        index === currentIndex ? ' cos-image-viewer-thumbnail-active' : ''
                    }}"
                    aria-label="查看第{{index + 1}}张图片"
                    on-click="handleSelect(index)"
                >
                    <cos-image
                        class="cos-image-viewer-thumbnail-image cos-image-viewer-thumbnail-image-{{
                            item | ratio
                        }} cos-image-fit-cover"
                        src="{{item.thumbnail || item.src}}"
                        alt="{{item.alt || ''}}"
                    />
                </button>
            </div>
        </div>
    `;

    static components = {
        'cos-image': Image
    };

    static filters = {
        ratio: classifyAspectRatio
    };

    initData(): ImageViewerThumbnailsData {
        return {
            items: [],
            currentIndex: 0
        };
    }

    attached() {
        // 首次进入需要滚到当前 active；等 DOM 渲染完成再计算位置
        this.nextTick(() => this.scrollActiveIntoCenter());
        this.watch('currentIndex', () => {
            this.nextTick(() => this.scrollActiveIntoCenter());
        });
        this.watch('items', () => {
            this.nextTick(() => this.scrollActiveIntoCenter());
        });
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    handleSelect(index: number) {
        this.fire('change', {index, source: 'thumbnail'});
    }

    // 尝试将active元素居中
    private scrollActiveIntoCenter() {
        const scroller = this.el as unknown as HTMLElement | null;
        if (!scroller) {
            return;
        }
        // active 按顺序对应 currentIndex；用 nth-child 直接取，避免依赖 class 命中时机
        const index = this.data.get('currentIndex');
        const list = scroller.firstElementChild as HTMLElement | null;
        const activeElement = list?.children?.[index] as HTMLElement | undefined;
        if (!activeElement) {
            return;
        }
        const viewportWidth = scroller.clientWidth;
        const maxScrollLeft = Math.max(scroller.scrollWidth - viewportWidth, 0);
        // 前半段：activeCenter < viewportWidth/2，clamp 会命中下界, 达成左对齐效果
        // 后半段：activeCenter > scrollWidth - viewportWidth/2，clamp 会命中上界 maxScrollLeft, 达成右对齐效果
        const activeCenter = activeElement.offsetLeft + activeElement.offsetWidth / 2;
        const target = clamp(activeCenter - viewportWidth / 2, 0, maxScrollLeft);

        // 滚动距离设下限, 避免微小抖动
        if (Math.abs(scroller.scrollLeft - target) < 0.5) {
            return;
        }

        if (typeof scroller.scrollTo === 'function') {
            scroller.scrollTo({left: target, behavior: 'smooth'});
        }
        else {
            scroller.scrollLeft = target;
        }
    }
}
