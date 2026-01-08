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

export interface PaginationProps {

    /**
     * 数据总数
     */
    total: number;

    /**
     * 每页条数
     */
    pageSize?: number;

    /**
     * 当前页码
     */
    current?: number;

    /**
     * 总页数
     */
    pageCount?: number;
}

export interface PaginationEvents {
    change: {
        current: number;
        prev: number;
    };
}

export type PaginationData = Required<PaginationProps>;