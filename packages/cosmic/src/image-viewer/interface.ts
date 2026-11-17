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

import type {LinkInfo} from '../util/interface';

/**
 * 图片来源信息
 */
export interface ImageViewerSource {
    /**
     * 跳转链接信息；未提供时整个来源区域不展示
     */
    linkInfo: LinkInfo;

    /**
     * 左上角展示的网站或页面标题；未提供时不展示标题部分
     */
    title?: string;

    /**
     * 跳转按钮文字
     * @default '查看原网页'
     */
    actionText?: string;
}

/**
 * 图片列表项
 */
export interface ImageViewerItem {
    /**
     * 原图地址
     */
    src: string;

    /**
     * 底部缩略图地址，未传时使用原图地址
     */
    thumbnail?: string;

    /**
     * 图片替代文本
     * @default ''
     */
    alt?: string;

    /**
     * 图片原始宽度，单位 px
     */
    width?: number;

    /**
     * 图片原始高度，单位 px
     */
    height?: number;

    /**
     * 图片来源及页面跳转信息；未传时不展示左上角来源区域
     */
    source?: ImageViewerSource;
}

/**
 * 缩放参数配置
 */
export interface ImageViewerZoomOptions {
    /**
     * 缩放最小百分比
     * @default 10
     */
    min?: number;

    /**
     * 缩放最大百分比
     * @default 400
     */
    max?: number;

    /**
     * 单次缩放步长
     * @default 10
     */
    step?: number;

    /**
     * 打开时首次展示的缩放百分比
     * @default 100
     */
    initial?: number;
}

/**
 * 图片切换的触发来源
 * - `thumbnail`：底部缩略图点击
 * - `navigation`：左右切换按钮
 * - `keyboard`：键盘 ArrowLeft / ArrowRight
 * - `method`：外部调用 `ImageViewer.goTo`
 */
export type ImageViewerChangeSource = 'thumbnail' | 'navigation' | 'keyboard' | 'method';

/**
 * 缩放的触发来源
 * - `button`：工具栏 +/- 按钮
 * - `wheel`：Ctrl + 滚轮
 */
export type ImageViewerZoomSource = 'button' | 'wheel';

/**
 * 查看器回调事件详情
 *
 * 切换 / 点击来源 / 点击下载 / 关闭 / 缩放共享的基础 payload：
 * 都携带触发时的图片下标及对应的图片数据。
 */
export interface ImageViewerEventDetail {
    /**
     * 事件触发时展示的图片下标
     */
    index: number;

    /**
     * 事件触发时展示的图片数据
     */
    item: ImageViewerItem;
}

/**
 * 图片切换回调事件详情
 */
export interface ImageViewerChangeEventDetail extends ImageViewerEventDetail {
    /**
     * 触发切换的来源
     */
    source: ImageViewerChangeSource;
}

/**
 * 缩放回调事件详情
 */
export interface ImageViewerZoomEventDetail extends ImageViewerEventDetail {
    /**
     * 触发缩放的来源
     */
    source: ImageViewerZoomSource;

    /**
     * 变化后的缩放百分比
     */
    zoom: number;
}

/**
 * 打开图片查看器的配置项
 */
export interface ImageViewerOptions {
    /**
     * 图片列表，至少包含一项
     */
    items: ImageViewerItem[];

    /**
     * 本次数据替换后首先展示的图片下标
     * @default 0
     */
    activeIndex?: number;

    /**
     * 点击蒙层是否关闭查看器
     * @default true
     */
    outsideClosable?: boolean;

    /**
     * 按下 Esc 是否关闭查看器
     * @default true
     */
    closeOnEsc?: boolean;

    /**
     * 缩放参数配置
     */
    zoom?: ImageViewerZoomOptions;

    /**
     * 当前图片切换后的回调
     */
    onChange?: (detail: ImageViewerChangeEventDetail) => void;

    /**
     * 缩放变化后的回调，仅用于打点，不影响缩放行为
     */
    onZoom?: (detail: ImageViewerZoomEventDetail) => void;

    /**
     * 点击来源跳转按钮的回调，仅用于打点，不影响跳转行为
     */
    onSourceClick?: (detail: ImageViewerEventDetail) => void;

    /**
     * 点击下载按钮的回调，仅用于打点，不影响下载行为
     */
    onDownload?: (detail: ImageViewerEventDetail) => void;

    /**
     * 查看器关闭后的回调
     */
    onClose?: (detail: ImageViewerEventDetail) => void;
}

/**
 * 内部 San 组件的数据结构
 */
export interface ImageViewerComponentData {
    items: ImageViewerItem[];
    currentIndex: number;
    outsideClosable: boolean;
    closeOnEsc: boolean;
    zoomMin: number;
    zoomMax: number;
    zoomStep: number;
    zoomInitial: number;
    zoom: number;
}
