/**
 * @file EntityList 组件属性和事件定义
 */

import type {EntityCardProps, EntityCardEvents} from '@cosui/cosmic-dqa/entity-card/interface';

export interface EntityListProps {

    // 实体列表数据，为空时不展示列表项
    items: EntityCardProps[];
}

export interface EntityListEvents {

    // 转发实体卡片点击并附加列表下标后 fire 事件
    click: EntityCardEvents['click'] & {

        // 当前列表项下标
        index: number;
    };
}

export type EntityListData = Required<EntityListProps>;
