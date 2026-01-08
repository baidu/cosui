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
 *
 * @file Score interface
 */

/**
 * 评分类型,  multiple 为五星评分，single 为单星评分，text 为不显示星星
 */
export enum ScoreType {
    Single = 'single',
    Multiple = 'multiple',
    Text = 'text'
}

export enum Size {
    SM = 'sm',
    MD = 'md',
    LG = 'lg'
}

/**
 * 评分组件的data接口
 */
export interface ScoreProps {
    /**
     * 当前分数
     */
    value?: number;

    /**
     * 最大分数（满分）
     */
    max?: number;

    /**
     * 是否展示分数
     */
    score?: boolean;

    /**
     * 分数单位
     */
    unit?: string;

    /**
     * 组件类型，五星评分或单星评分
     */
    type?: ScoreType;

    /**
     * 组件大小，sm, md 或 lg
     */
    size?: Size;

    /**
     * 是否可控
     */
    controlled?: boolean;

    /**
     * 是否支持清除（可控模式下，二次点击同一个分数）
     */
    clearable?: boolean;
}

export type ScoreData = Required<ScoreProps>;

export interface ScoreEvents {
    change: {
        value: number;
        event: MouseEvent;
    };
}
