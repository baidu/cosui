/**
 * @file EntityCard 实体卡片组件
 */

import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import Markdown from '@cosui/cosmic-dqa/markdown';
import type {EntityCardData, EntityCardContentClickParams, MarkdownClickParams} from './interface';

export default class EntityCard extends Component<EntityCardData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-entity-card">
            <div
                s-if="thumbnail && thumbnail.src"
                class="cosd-entity-card-thumbnail"
                on-click="handleImageClick"
            >
                <cos-image
                    s-bind="thumbnail"
                    class="cos-image-1-1 cos-image-fit-cover cos-image-position-center"
                />
            </div>
            <div class="cosd-entity-card-body">
                <cosd-markdown
                    content="{{title}}"
                    class="cosd-entity-card-title"
                    on-click="handleContentClick($event, 'title')"
                />
                <cosd-markdown
                    content="{{content}}"
                    class="cosd-entity-card-content"
                    on-click="handleContentClick($event, 'content')"
                />
            </div>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            thumbnail: {src: ''},
            title: '',
            content: ''
        };
    }

    // 点击图片时携带图片配置 fire 事件
    handleImageClick(event: Event) {
        this.fire('click', {
            event,
            area: 'thumbnail',
            thumbnail: this.data.get('thumbnail')
        });
    }

    // 仅处理蓝链，保留实际参数并附加区域后 fire 事件
    handleContentClick(params: MarkdownClickParams, area: EntityCardContentClickParams['area']) {
        const isSearch = params.directive === 'ml-search';
        const isLink = !params.directive && params.from === 'link';
        if (!isSearch && !isLink) {
            return;
        }

        let clickParams = params;
        let from = 'link';

        if (isSearch) {
            const {directive, ...rest} = params;
            clickParams = rest;
            from = 'search';
        }

        this.fire('click', {
            ...clickParams,
            area,
            from
        });
    }
}
