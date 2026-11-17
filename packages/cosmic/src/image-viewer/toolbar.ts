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
 * @file ImageViewer 右下角工具栏（下载 + 缩放）
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import {clamp} from './utils';

interface ImageViewerToolbarData {
    /**
     * 当前缩放百分比
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
     * 单次缩放步长
     */
    zoomStep: number;
}

/**
 * ImageViewer 右下角浮层：下载按钮 + 缩放控件。
 */
export default class ImageViewerToolbar extends Component<ImageViewerToolbarData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cos-image-viewer-toolbar" on-click="stopPropagation">
            <button
                type="button"
                class="cos-image-viewer-download"
                on-click="handleDownload"
            >
                <cos-icon name="download" />
                <span>下载</span>
            </button>
            <div class="cos-image-viewer-zoom">
                <button
                    type="button"
                    aria-label="缩小"
                    title="缩小"
                    on-click="handleZoomOut"
                >
                    <cos-icon name="minus" />
                </button>
                <span>{{zoom}}%</span>
                <button
                    type="button"
                    aria-label="放大"
                    title="放大"
                    on-click="handleZoomIn"
                >
                    <cos-icon name="plus" />
                </button>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    initData(): ImageViewerToolbarData {
        return {
            zoom: 0,
            zoomMin: 0,
            zoomMax: 0,
            zoomStep: 0
        };
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    handleDownload(event: Event) {
        event.stopPropagation();
        this.fire('download');
    }

    handleZoomIn() {
        const {zoom, zoomStep, zoomMin, zoomMax} = this.data.get();
        const next = Math.round(zoom * (1 + zoomStep / 100));
        this.fire('zoom-change', {zoom: clamp(next, zoomMin, zoomMax), source: 'button'});
    }

    handleZoomOut() {
        const {zoom, zoomStep, zoomMin, zoomMax} = this.data.get();
        const next = Math.round(zoom / (1 + zoomStep / 100));
        this.fire('zoom-change', {zoom: clamp(next, zoomMin, zoomMax), source: 'button'});
    }
}
