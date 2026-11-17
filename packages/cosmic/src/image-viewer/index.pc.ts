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
 * @file ImageViewer 图片查看器
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Toast from '@cosui/cosmic/toast';
import Stage from './stage';
import Thumbnails from './thumbnails';
import Toolbar from './toolbar';
import {NavigationArrowIcon} from './svg';
import {createRafBatch, downloadImage} from './utils';
import type {
    ImageViewerChangeEventDetail,
    ImageViewerChangeSource,
    ImageViewerComponentData,
    ImageViewerEventDetail,
    ImageViewerItem,
    ImageViewerOptions,
    ImageViewerZoomEventDetail,
    ImageViewerZoomSource
} from './interface';

const DEFAULT_ZOOM = {
    min: 10,
    max: 400,
    step: 10,
    initial: 100
};

function clampIndex(index: number, length: number): number {
    const value = Number(index);
    if (isNaN(value)) {
        return 0;
    }
    return Math.min(Math.max(Math.floor(value), 0), Math.max(length - 1, 0));
}

/**
 * 查看器打开期间要独占的按键：
 * - Escape 关闭、ArrowLeft/Right 切换为查看器自身行为
 * - 其余（空格 / 上下方向 / 翻页 / Home / End）仅拦截，防止背景页滚动或触发宿主快捷键
 * 兼容旧版浏览器的 key 取值（Spacebar / Left / Right 等）
 */
const INTERCEPTED_KEYS = new Set([
    'Escape', 'Esc',
    ' ', 'Spacebar',
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
    'Left', 'Right', 'Up', 'Down',
    'PageUp', 'PageDown', 'Home', 'End',
    // 搜索框聚焦键
    '/',
    // 拦截 Tab，阻止浏览器tab切换焦点行为
    'Tab'
]);

class ImageViewerComponent extends Component<ImageViewerComponentData> {
    static trimWhitespace = 'all';

    static template = `
        <div
            class="cos-image-viewer"
            role="dialog"
            aria-modal="true"
            aria-label="图片查看器"
            on-click="handleMaskClick"
        >
            <!--左上角来源信息-->
            <div s-if="currentSource" class="cos-image-viewer-source" on-click="stopPropagation($event)">
                <span s-if="currentSource.title" class="cos-image-viewer-title">{{currentSource.title}}</span>
                <a
                    class="cos-image-viewer-original"
                    s-bind="currentSource.linkInfo"
                    href="{{currentSource.linkInfo.href}}"
                    target="{{currentSource.linkInfo.target || '_blank'}}"
                    rel="noopener noreferrer"
                    on-click="handleSourceClick"
                >
                    {{currentSource.actionText || '查看原网页'}}
                </a>
            </div>

            <!--右上角操作区-->
            <div class="cos-image-viewer-header-actions" on-click="stopPropagation($event)">
                <div class="cos-image-viewer-counter">{{currentIndex + 1}}/{{items.length}}</div>
                <button
                    type="button"
                    class="cos-image-viewer-close"
                    aria-label="关闭"
                    title="关闭"
                    on-click="handleClose($event)"
                >
                    <cos-icon name="close" />
                </button>
            </div>
            
            <!--图片操作区域-->
            <cos-image-viewer-stage
                image="{{currentImage}}"
                current-index="{{currentIndex}}"
                zoom="{{zoom}}"
                zoom-min="{{zoomMin}}"
                zoom-max="{{zoomMax}}"
                on-zoom-change="handleZoomChange($event)"
            />

            <button
                s-if="items.length > 1"
                type="button"
                class="cos-image-viewer-navigation cos-image-viewer-previous{{
                    currentIndex <= 0 ? ' cos-image-viewer-navigation-hidden' : ''
                }}"
                aria-label="上一张"
                aria-hidden="{{currentIndex <= 0 ? 'true' : 'false'}}"
                tabindex="{{currentIndex <= 0 ? -1 : 0}}"
                title="上一张"
                on-click="handleNavigate($event, -1)"
            >
                ${NavigationArrowIcon}
            </button>
            <button
                s-if="items.length > 1"
                type="button"
                class="cos-image-viewer-navigation cos-image-viewer-next{{
                    currentIndex >= items.length - 1 ? ' cos-image-viewer-navigation-hidden' : ''
                }}"
                aria-label="下一张"
                aria-hidden="{{currentIndex >= items.length - 1 ? 'true' : 'false'}}"
                tabindex="{{currentIndex >= items.length - 1 ? -1 : 0}}"
                title="下一张"
                on-click="handleNavigate($event, 1)"
            >
                ${NavigationArrowIcon}
            </button>
            
            <!--右下角工具栏-->
            <cos-image-viewer-toolbar
                zoom="{{zoom}}"
                zoom-min="{{zoomMin}}"
                zoom-max="{{zoomMax}}"
                zoom-step="{{zoomStep}}"
                on-download="handleDownload"
                on-zoom-change="handleZoomChange($event)"
            />

            <!--底部缩略图-->
            <cos-image-viewer-thumbnails
                items="{{items}}"
                current-index="{{currentIndex}}"
                on-change="handleChange($event)"
            />
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-image-viewer-stage': Stage,
        'cos-image-viewer-toolbar': Toolbar,
        'cos-image-viewer-thumbnails': Thumbnails
    };

    static computed = {
        currentImage(this: ImageViewerComponent): ImageViewerItem | null {
            const items = this.data.get('items') || [];
            const index = this.data.get('currentIndex');
            return items[index] || null;
        },

        currentSource(this: ImageViewerComponent) {
            const image: ImageViewerItem | null = this.data.get('currentImage');
            const source = image?.source;
            if (!source || !source.linkInfo || !source.linkInfo.href) {
                return null;
            }
            return source;
        }
    };

    initData(): ImageViewerComponentData {
        return {
            items: [],
            currentIndex: 0,
            outsideClosable: true,
            closeOnEsc: true,
            zoomMin: DEFAULT_ZOOM.min,
            zoomMax: DEFAULT_ZOOM.max,
            zoomStep: DEFAULT_ZOOM.step,
            zoomInitial: DEFAULT_ZOOM.initial,
            zoom: DEFAULT_ZOOM.initial
        };
    }

    attached() {
        // 捕获阶段监听key事件, 拦截一些快捷键
        document.addEventListener('keydown', this.keydownHandler, true);
        window.addEventListener('wheel', this.wheelHandler, {passive: false});
    }

    disposed() {
        document.removeEventListener('keydown', this.keydownHandler, true);
        window.removeEventListener('wheel', this.wheelHandler);
        this.thumbnailsWheelBatch.cancel();
        this.thumbnailsEl = null;
    }

    goTo(index: number, source: ImageViewerChangeSource = 'method') {
        const items: ImageViewerItem[] = this.data.get('items') || [];
        if (!items.length) {
            return;
        }
        const nextIndex = clampIndex(index, items.length);
        if (nextIndex === this.data.get('currentIndex')) {
            return;
        }
        this.data.set('currentIndex', nextIndex);
        this.data.set('zoom', this.data.get('zoomInitial'));
        const detail: ImageViewerChangeEventDetail = {...this.buildDetail(), source};
        this.fire('change', detail);
    }

    handleMaskClick() {
        if (this.data.get('outsideClosable')) {
            this.fire('close');
        }
    }

    handleClose() {
        this.fire('close');
    }

    handleNavigate(event: Event, delta: number) {
        event.stopPropagation();
        this.goTo(this.data.get('currentIndex') + delta, 'navigation');
    }

    handleChange(detail: {index: number, source: ImageViewerChangeSource}) {
        this.goTo(detail.index, detail.source);
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    handleSourceClick() {
        this.fire('source-click', this.buildDetail());
    }

    handleDownload() {
        const image = this.data.get('currentImage') as ImageViewerItem | null;
        if (!image) {
            return;
        }
        this.fire('download', this.buildDetail());
        downloadImage(image.src).then(
            () => Toast.success({message: '下载成功'}),
            () => Toast.error({message: '下载失败, 请重试'})
        );
    }

    handleZoomChange(payload: {zoom: number, source: ImageViewerZoomSource}) {
        this.data.set('zoom', payload.zoom);
        const detail: ImageViewerZoomEventDetail = {...this.buildDetail(), zoom: payload.zoom, source: payload.source};
        this.fire('zoom', detail);
    }

    buildDetail(): ImageViewerEventDetail {
        const items: ImageViewerItem[] = this.data.get('items') || [];
        const index: number = this.data.get('currentIndex');
        return {index, item: items[index]};
    }

    private readonly keydownHandler = (event: KeyboardEvent) => {
        const {key} = event;
        if (!INTERCEPTED_KEYS.has(key)) {
            return;
        }
        // 捕获阶段拦截：阻止背景页监听器（空格/方向键滚动、宿主快捷键等）收到事件
        event.preventDefault();
        event.stopPropagation();

        if ((key === 'Escape' || key === 'Esc') && this.data.get('closeOnEsc')) {
            this.fire('close');
            return;
        }
        const items: ImageViewerItem[] = this.data.get('items') || [];
        if (items.length <= 1) {
            return;
        }

        // 查看器翻页快捷键；其余被拦截的按键（空格 / 上下 / 翻页等）只拦不做动作
        if (key === 'ArrowLeft' || key === 'Left') {
            this.goTo(this.data.get('currentIndex') - 1, 'keyboard');
        }
        else if (key === 'ArrowRight' || key === 'Right') {
            this.goTo(this.data.get('currentIndex') + 1, 'keyboard');
        }
        else {
            // 无需处理
        }
    };

    private readonly wheelHandler = (event: WheelEvent) => {
        // 查看器为全屏模态：默认吞掉所有滚轮，杜绝背景页的滚动
        const target = event.target as HTMLElement | null;
        const thumbnails = target?.closest?.('.cos-image-viewer-thumbnails') as HTMLElement | null;

        // 阻止全部wheel事件后, 缩略图的元素滚动效果也会失效, 因此需要手动实现缩略图的滚动
        if (thumbnails) {
            this.thumbnailsEl = thumbnails;
            this.thumbnailsWheelBatch.schedule(event.deltaY || event.deltaX);
        }
        // 其余区域（stage 由自身 wheel 处理缩放，此处兜底非 stage 区域）一律阻止默认滚动
        if (event.cancelable) {
            event.preventDefault();
        }
    };

    /**
     * 当前正在滚动的缩略图条；由 wheelHandler 记录，供 rAF 回调写回 scrollLeft
     */
    private thumbnailsEl: HTMLElement | null = null;

    /**
     * 缩略图滚轮合帧调度器：累加一帧内的滚轮增量，每帧统一写一次 scrollLeft
     */
    private readonly thumbnailsWheelBatch = createRafBatch<number>(
        delta => {
            if (delta && this.thumbnailsEl) {
                this.thumbnailsEl.scrollLeft += delta;
            }
        },
        (prev, next) => (prev ?? 0) + next
    );
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ImageViewer {
    private static instance: ImageViewerComponent | null = null;

    private static currentOptions: ImageViewerOptions | null = null;

    static open(options: ImageViewerOptions) {
        if (!options || !Array.isArray(options.items) || options.items.length === 0) {
            return;
        }
        const zoomConfig = {...DEFAULT_ZOOM, ...(options.zoom || {})};
        const data: ImageViewerComponentData = {
            items: options.items,
            currentIndex: clampIndex(options.activeIndex ?? 0, options.items.length),
            outsideClosable: options.outsideClosable !== false,
            closeOnEsc: options.closeOnEsc !== false,
            zoomMin: zoomConfig.min,
            zoomMax: zoomConfig.max,
            zoomStep: zoomConfig.step,
            zoomInitial: zoomConfig.initial,
            zoom: zoomConfig.initial
        };
        if (ImageViewer.instance) {
            ImageViewer.currentOptions?.onClose?.(ImageViewer.instance.buildDetail());
            ImageViewer.instance.data.assign(data);
        }
        else {
            ImageViewer.instance = new ImageViewerComponent({data});
            ImageViewer.instance.attach(document.body);
        }
        ImageViewer.currentOptions = options;
        ImageViewer.instance.on('change', (detail: ImageViewerChangeEventDetail) => {
            ImageViewer.currentOptions?.onChange?.(detail);
        });
        ImageViewer.instance.on('zoom', (detail: ImageViewerZoomEventDetail) => {
            ImageViewer.currentOptions?.onZoom?.(detail);
        });
        ImageViewer.instance.on('source-click', (detail: ImageViewerEventDetail) => {
            ImageViewer.currentOptions?.onSourceClick?.(detail);
        });
        ImageViewer.instance.on('download', (detail: ImageViewerEventDetail) => {
            ImageViewer.currentOptions?.onDownload?.(detail);
        });
        ImageViewer.instance.on('close', () => ImageViewer.close());
    }

    static close() {
        if (!ImageViewer.instance) {
            return;
        }
        const detail = ImageViewer.instance.buildDetail();
        const {onClose} = ImageViewer.currentOptions || {};
        const disposed = ImageViewer.instance;
        ImageViewer.instance = null;
        ImageViewer.currentOptions = null;
        disposed.dispose();
        onClose?.(detail);
    }

    static goTo(index: number) {
        ImageViewer.instance?.goTo(index);
    }
}

export type {
    ImageViewerChangeEventDetail,
    ImageViewerChangeSource,
    ImageViewerEventDetail,
    ImageViewerItem,
    ImageViewerOptions,
    ImageViewerSource,
    ImageViewerZoomEventDetail,
    ImageViewerZoomOptions,
    ImageViewerZoomSource
} from './interface';
