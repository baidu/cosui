/**
 * @file EntityList 实体列表组件
 */

import {Component} from 'san';
import EntityCard from '@cosui/cosmic-dqa/entity-card';
import type {EntityCardEvents} from '@cosui/cosmic-dqa/entity-card/interface';
import type {EntityListData} from './interface';

export default class EntityList extends Component<EntityListData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-entity-list">
            <cosd-entity-card
                s-for="item, index in items"
                s-bind="item"
                class="cosd-entity-list-item"
                on-click="handleClick($event, index)"
            />
        </div>
    `;

    static components = {
        'cosd-entity-card': EntityCard
    };

    initData(): EntityListData {
        return {
            items: []
        };
    }

    handleClick(params: EntityCardEvents['click'], index: number): void {
        this.fire('click', {
            ...params,
            index
        });
    }
}
