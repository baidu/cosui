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
 * @file ImageViewer 图片展示层
 */

import {Component} from 'san';
import {clamp, createRafBatch} from './utils';
import type {ImageViewerItem} from './interface';

interface ImageViewerStageData {
    /**
     * 当前展示的图片；为 null 时不渲染 img
     */
    image: ImageViewerItem | null;

    /**
     * 当前图片下标
     */
    currentIndex: number;

    /**
     * 缩放百分比（100 = 原始尺寸）
     */
    zoom: number;

    /**
     * 缩放最小百分比
     */
    zoomMin: number;

    /**
     * 缩放最大百分比
     */
    zoomMax: number;

    /**
     * 是否处于拖动中；仅用于切换鼠标指针样式（grab / grabbing）
     */
    dragging: boolean;

    /**
     * 图片相对初始位置的横向位移（px）
     */
    translateX: number;

    /**
     * 图片相对初始位置的纵向位移（px）
     */
    translateY: number;

    /**
     * 计算属性：img 的合成 transform 值
     */
    imageTransform?: string;
}

/**
 * 单次滚轮触发的最大缩放幅度（相对于当前 zoom）
 */
const MAX_STEP_RATIO = 0.5;

/**
 * deltaY 到缩放幅度的换算除数
 */
const DELTA_DIVISOR = 200;

/**
 * 根据累计的 deltaY 计算缩放倍率
 * - delta 为负（向上滚 / 双指外扩）→ 放大，返回 >1
 * - delta 为正（向下滚 / 双指内捏）→ 缩小，返回 <1
 */
function calcWheelRatio(delta: number): number {
    const absDelta = Math.abs(delta);
    const step = Math.min(absDelta / DELTA_DIVISOR, MAX_STEP_RATIO);
    const ratio = 1 + step;
    return delta < 0 ? ratio : 1 / ratio;
}

/**
 * ImageViewer 中间的图片展示区。
 * - 处理图片的放缩、拖动
 */
export default class ImageViewerStage extends Component<ImageViewerStageData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cos-image-viewer-stage" on-wheel="handleWheel($event)">
            <img
                s-if="image"
                s-ref="image"
                class="cos-image-viewer-image{{dragging ? ' cos-image-viewer-image-dragging' : ''}}"
                src="{{image.src}}"
                alt="{{image.alt || ''}}"
                style="transform: {{imageTransform}};"
                draggable="false"
                on-click="stopPropagation"
                on-pointerdown="native:handlePointerDown($event)"
                on-pointermove="native:handlePointerMove($event)"
                on-pointerup="native:handlePointerUp($event)"
                on-pointercancel="native:handlePointerUp($event)"
            />
        </div>
    `;

    static computed = {
        imageScale(this: ImageViewerStage): number {
            const zoom = this.data.get('zoom');
            return Math.max(zoom, 0) / 100;
        },

        imageTransform(this: ImageViewerStage): string {
            const scale = this.data.get('imageScale');
            const x = this.data.get('translateX');
            const y = this.data.get('translateY');
            // translate 在 scale 之前书写：translate 距离按最终屏幕像素度量
            return `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        }
    };

    /**
     * wheel 合帧调度器：累加一帧内的 delta，每帧统一转成一次 zoom-change
     */
    private readonly wheelBatch = createRafBatch<number>(
        delta => {
            if (!delta) {
                return;
            }
            const ratio = calcWheelRatio(delta);
            const zoom = this.data.get('zoom');
            const min = this.data.get('zoomMin');
            const max = this.data.get('zoomMax');
            const next = Math.round(zoom * ratio);
            const clamped = clamp(next, min, max);
            if (clamped !== zoom) {
                this.fire('zoom-change', {zoom: clamped, source: 'wheel'});
            }
        },
        (prev, next) => (prev ?? 0) + next
    );

    /**
     * 拖动起点信息；null 表示未拖动
     */
    private dragStart: {
        pointerId: number;
        pageX: number;
        pageY: number;
        translateX: number;
        translateY: number;
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    } | null = null;

    /**
     * pointermove 合帧调度器：每帧统一把最新目标位移写回 data（后值覆盖前值）
     */
    private readonly moveBatch = createRafBatch<{x: number, y: number}>(pending => {
        this.data.set('translateX', pending.x);
        this.data.set('translateY', pending.y);
    });

    initData(): ImageViewerStageData {
        return {
            image: null,
            currentIndex: 0,
            zoom: 0,
            zoomMin: 0,
            zoomMax: 0,
            dragging: false,
            translateX: 0,
            translateY: 0
        };
    }

    attached() {
        // 切换图片时重置位移
        this.watch('currentIndex', () => {
            this.resetTranslate();
        });
        // 缩放变化后，按新的图片尺寸重新 clamp 当前位移
        this.watch('zoom', () => {
            this.clampTranslate();
        });
    }

    disposed() {
        this.wheelBatch.cancel();
        this.moveBatch.cancel();
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    handlePointerDown(event: PointerEvent) {
        // 仅响应鼠标左键 / 单指触摸 / 触控笔
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();

        const img = this.ref('image') as unknown as HTMLImageElement | null;
        // 抓住指针：后续 pointermove / pointerup 都由 img 元素接收，鼠标滑到浮层上也不会丢
        img?.setPointerCapture?.(event.pointerId);

        const {minX, maxX, minY, maxY} = this.getOffsetBounds();
        this.dragStart = {
            pointerId: event.pointerId,
            pageX: event.pageX,
            pageY: event.pageY,
            translateX: this.data.get('translateX'),
            translateY: this.data.get('translateY'),
            minX,
            maxX,
            minY,
            maxY
        };
        this.data.set('dragging', true);
    }

    handlePointerMove(event: PointerEvent) {
        const start = this.dragStart;
        if (!start || event.pointerId !== start.pointerId) {
            return;
        }
        const nextX = clamp(start.translateX + event.pageX - start.pageX, start.minX, start.maxX);
        const nextY = clamp(start.translateY + event.pageY - start.pageY, start.minY, start.maxY);
        this.moveBatch.schedule({x: nextX, y: nextY});
    }

    handlePointerUp(event: PointerEvent) {
        const start = this.dragStart;
        if (!start || event.pointerId !== start.pointerId) {
            return;
        }
        const img = this.ref('image') as unknown as HTMLImageElement | null;
        if (img?.hasPointerCapture?.(event.pointerId)) {
            img.releasePointerCapture(event.pointerId);
        }
        // 鼠标松开时立刻抛弃后续的更新, 避免松开后仍有未触发的batch触发
        this.moveBatch.flush();
        this.dragStart = null;
        this.data.set('dragging', false);
    }

    handleWheel(event: WheelEvent) {
        // 阻止蒙层滚动 / 冒泡
        event.preventDefault();
        event.stopPropagation();

        this.wheelBatch.schedule(event.deltaY || event.deltaX);
    }

    /**
     * 依据当前 img 布局尺寸 + 缩放比例，计算允许的位移范围。
     * 实现的交互效果: 
     * * 当图片在视口内时, 拖动图片， 图片内容不能被拖出视口外
     * * 当图片放大后, 宽/高大于视口后, 图片的边缘不能被拖进视口内
     * * 示例图: https://gips0.baidu.com/it/u=3082690222,4186783849&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f872_240
     */
    private getOffsetBounds(): {minX: number, maxX: number, minY: number, maxY: number} {
        const img = this.ref('image') as unknown as HTMLImageElement | null;
        const stage = img?.parentElement as HTMLElement | null;
        if (!img || !stage) {
            return {minX: 0, maxX: 0, minY: 0, maxY: 0};
        }
        const scale = this.data.get('imageScale');
        // offsetWidth/Height 是布局尺寸，不受 CSS transform 影响，乘以 scale 即为视觉尺寸
        const imageWidth = img.offsetWidth * scale;
        const imageHeight = img.offsetHeight * scale;
        const viewportWidth = stage.clientWidth;
        const viewportHeight = stage.clientHeight;
        // 图片布局中心相对 stage 物理中心的偏移
        const offsetX = img.offsetLeft + img.offsetWidth / 2 - viewportWidth / 2;
        const offsetY = img.offsetTop + img.offsetHeight / 2 - viewportHeight / 2;

        // 图片视觉边缘到视口边缘的距离
        const halfX = Math.abs(imageWidth - viewportWidth) / 2;
        const halfY = Math.abs(imageHeight - viewportHeight) / 2;
        return {
            minX: -halfX - offsetX,
            maxX: halfX - offsetX,
            minY: -halfY - offsetY,
            maxY: halfY - offsetY
        };
    }

    /**
     * 把当前 translate 强行约束到允许范围内
     */
    private clampTranslate() {
        const {minX, maxX, minY, maxY} = this.getOffsetBounds();
        const x = this.data.get('translateX');
        const y = this.data.get('translateY');
        const nextX = clamp(x, minX, maxX);
        const nextY = clamp(y, minY, maxY);
        if (nextX !== x) {
            this.data.set('translateX', nextX);
        }
        if (nextY !== y) {
            this.data.set('translateY', nextY);
        }
    }

    private resetTranslate() {
        this.data.set('translateX', 0);
        this.data.set('translateY', 0);
    }
}
