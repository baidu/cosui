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
 * @file image-group mobile 组件
 */

import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import {RATIO} from './interface';
import type {PCImageData, MobileImageData} from '@cosui/cosmic/image/interface';
import type {ImageGroupData, ImageGroupProps, ImageGroupEvents} from './interface';

export default class ImageGroup extends Component<ImageGroupData> {
    static template = `
        <template
            s-is="{{linkInfo.href ? 'a' : 'div'}}"
            s-bind="linkInfo.href ? linkInfo : ''"
            class="cosc-image-group{{linkInfo.href ? ' cos-link' : ''}}
                {{mainImageMode ? ' cos-row cos-row-col-12 cos-gutter cosc-image-group-main' : ''}}
                {{containerRatio}}
            "
            style="{{mainImageMode ? '--cos-grid-gutter: 2px' : ''}}"
        >
            <fragment s-if="scrollable">
                <div class="cosc-image-group-scrollable">
                    <cos-swiper
                        on-scrollend="handleScroll"
                        space-between="8"
                        class="cosc-image-group-scrollable-swiper"
                    >
                        <cos-swiper-item
                            s-for="item, index in list"
                            class="cosc-image-group-scrollable-swiper-item"
                            width="calc((100% + 8px) * {{item.span || span || 12}}/12 - 8px)"
                        >
                            <cos-image
                                class="cosc-image-group-scrollable-swiper-image
                                    cos-image-fit-cover
                                    cos-image-position-center
                                "
                                src="{{item.src}}"
                                on-click="native:showImage($event, item, index)"
                            />
                        </cos-swiper-item>
                    </cos-swiper>
                </div>
            </fragment>
            <fragment s-else>
                <div
                    s-if="mainImageMode"
                    class="cos-col-{{hasMainImage ? 8 : 6}} cosc-image-group-item"
                >
                    <cos-image
                        s-bind="{{list[0]}}"
                        class="{{imageRatio}}"
                        on-click="native:showImage($event, list[0], 0)"

                    />
                </div>
                <div class="{{mainImageMode ? 'cos-col-' + (hasMainImage ? 4 : 6) : ''}}">
                    <div
                        s-for="rowList, rowNum in imageList"
                        class="cos-row cos-row-col-12 cos-gutter"
                        style="--cos-grid-gutter: 2px"
                    >
                        <div
                            s-for="aImage, imageIndex in rowList"
                            class="cos-col-{{imageSpan}} cosc-image-group-item"
                        >
                            <cos-image
                                s-bind="{{aImage}}"
                                class="{{imageRatio}}
                                    {{(rowNum > 0 && ((imageIndex + 1) < (12 / imageSpan)))
                                        ? ' cosc-image-group-middle'
                                        : ''}}"
                                on-click="native:showImage($event, aImage,
                                    (mainImageMode ? 1 : 0) + rowNum * (12 / imageSpan) + imageIndex))"

                            />
                        </div>
                    </div>
                </div>
            </fragment>
        </template>
    `;

    static components = {
        'cos-image': Image,
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem
    };

    static computed = {
        imageList(this: ImageGroup) {
            const list = this.data.get('list');
            const span = this.data.get('imageSpan');
            let maxRow = this.data.get('maxRow');
            const useDefault = this.data.get('useDefault');
            const mainImageMode = this.data.get('mainImageMode');
            // 每行图片个数
            const colNum = Math.floor(12 / span);
            // 图片行数，最大行数不超过 3
            const MAX_ROW = 3;
            // 主图模式，副图要排两行
            if (useDefault) {
                maxRow = mainImageMode ? 2 : 1;
            }
            const rowNum = Math.min(maxRow, MAX_ROW);
            let rowsList = [];

            for (let i = 0; i < rowNum; i++) {
                // 如果是主图模式，第一张图用来做主图，不通过 rowsList 展示
                const start = mainImageMode ? 1 : 0;
                rowsList.push(list.slice(i * colNum + start, (i + 1) * colNum + start));
            }
            return rowsList;
        },

        /**
         *
         * 判断是否使用默认图集
         * 即用户不传入 span 值，仅传入图片列表
         */
        useDefault(this: ImageGroup) {
            const span = this.data.get('span');
            return !span;
        },

        /**
         *
         * 是否有主图
         * 默认图集模式下，三图需要支持主图模式/普通模式
         */
        hasMainImage(this: ImageGroup) {
            const showMainImage = this.data.get('showMainImage');
            const count = this.data.get('list').length;
            return showMainImage && count === 3;
        },

        /**
         *
         * 图片子项跨度，所占栅格列数
         * 如果用户传入 span，则使用用户传入的 span 值
         * 否则，使用默认图集，并且图片数量大于 4 时，使用主图模式配置
         */
        imageSpan(this: ImageGroup) {
            const span = this.data.get('span');
            const hasMainImage = this.data.get('hasMainImage');
            const count = this.data.get('list').length;
            return span ? span : (hasMainImage ? 12 : count > 4 ? 6 : (12 / count));
        },

        /**
         *
         * 判断是否为主图模式，即第一张图为主图，占据一半显示，其余为副图
         * 目前默认图集模式下，传入的图片数量大于 4 时，使用主图模式
         */
        mainImageMode(this: ImageGroup) {
            const useDefault = this.data.get('useDefault');
            const hasMainImage = this.data.get('hasMainImage');
            const count = this.data.get('list').length;
            const scrollable = this.data.get('scrollable');
            return ((useDefault && count > 4) || hasMainImage) && !scrollable;
        },

        /**
         *
         * 图片子项的尺寸，
         * 栅格为 3，竖图比例
         * 栅格为 4，方图比例
         * 其他为横图比例
         */
        imageRatio(this: ImageGroup) {
            const imageSpan = this.data.get('imageSpan');
            let ratio = this.data.get('ratio');
            let imageRatio = RATIO.HORIZONTAL;
            switch (imageSpan) {
                case 3:
                    imageRatio = RATIO.VERTICAL;
                    break;
                case 4:
                    imageRatio = RATIO.SQUARE;
                    break;
            }
            return `cos-image-${ratio || imageRatio}`;
        },

        /**
         *
         * 默认图集在三图时，屏效统一，外层容器需要统一设置比例 7:3
         */
        containerRatio(this: ImageGroup) {
            const ratio = this.data.get('ratio');
            const span = this.data.get('span');
            const count = this.data.get('list').length;
            const hasMainImage = this.data.get('hasMainImage');
            const scrollable = this.data.get('scrollable');
            if (scrollable) {
                return '';
            }
            if (!span) {
                if ((ratio && count === 3) || hasMainImage) {
                    return ' cos-image-7-3';
                }
                return ' cos-image-3-1';
            }
        }
    };

    initData(): ImageGroupProps {
        return {
            list: [],
            linkInfo: {},
            maxRow: 1,
            span: null,
            showMainImage: false,
            ratio: undefined,
            scrollable: false
        };
    }

    handleScroll(event: Event) {
        this.fire<ImageGroupEvents['scroll']>('scroll', {event});
    }

    showImage(event: Event, image: PCImageData | MobileImageData, index: number) {
        event.stopPropagation();
        event.preventDefault();
        this.fire<ImageGroupEvents['click']>('click', {event, image, index});
    }
}
