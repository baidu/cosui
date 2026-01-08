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
 * @file pagination 分页器组件
 */

import {Component} from 'san';
import type {PaginationData, PaginationProps, PaginationEvents} from './interface';

const ELLIPSIS = '...';

export default class Pagination extends Component<PaginationData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cos-pagination">
            <div
                s-if="showPagination"
                class="cos-pagination-prev{{
                    _current === 1 ? ' cos-pagination-in-first-page' : ''
                }}"
                on-click="onPrev"
            >
                上一页
            </div>
            <div class="cos-pagination-pager">
                <div
                    s-for="page, index in pageList"
                    class="cos-pagination-pager-item{{
                        page === _current ? ' cos-pagination-pager-item-current' : ''
                    }}{{
                        page === '...' ? ' cos-pagination-pager-item-ellipsis' : ''
                    }}"
                    on-click="pageClick(page)"
                >
                    <!-- 页码超过两位数，按照左右边距 6px 自适应 -->
                    <span class="{{ page > 99 ? 'cos-space-pl-xxs cos-space-pr-xxs' : ''}}">
                        {{page}}
                    </span>
                </div>
            </div>
            <div
                s-if="showPagination"
                class="cos-pagination-next{{
                    _current === _pageCount ? ' cos-pagination-in-last-page' : ''
                }}"
                on-click="onNext"
            >
                下一页
            </div>
        </div>
    `;

    static computed = {

        showPagination(this: Pagination) {
            const _pageCount = this.data.get('_pageCount');
            return _pageCount > 0;
        },

        _total(this: Pagination) {
            const total = Number(this.data.get('total'));
            return isNaN(total) ? 0 : total;
        },

        _current(this: Pagination) {
            const current = isNaN(Number(this.data.get('current'))) ? 1 : Number(this.data.get('current'));
            if (current <= 0 || current > this.data.get('_pageCount')) {
                return 1;
            }
            return current;
        },

        _pageSize(this: Pagination) {
            const pageSize = Number(this.data.get('pageSize')) || 10;
            return isNaN(pageSize) ? 10 : pageSize;
        },

        /**
         * 分页器页数计算规则：
         * - 当传入 pageCount，则页数以传入为基准
         * - 当未传入 pageCount，则以 total 和 pageSize 做计算
         */
        _pageCount(this: Pagination) {
            const pageCount = this.data.get('pageCount');
            if (pageCount !== undefined && !isNaN(pageCount)) {
                return Number(pageCount);
            }

            const total = this.data.get('_total');
            const pageSize = this.data.get('_pageSize');
            let count = Math.ceil(total / pageSize);
            return count <= 0 ? 0 : count;
        },

        pageList(this: Pagination) {
            const _pageCount = +(this.data.get('_pageCount') || 0);
            const current = this.data.get('_current');

            if (_pageCount <= 0) {
                return [];
            }
            let pages: Array<number | string> = [];
            // 7 页以内直接展示所有页码
            if (_pageCount <= 7) {
                let idx = 0;
                while (idx < _pageCount) {
                    pages.push(idx + 1);
                    idx++;
                }
                return pages;
            }

            const head = [1, ELLIPSIS];
            const tail = [ELLIPSIS, _pageCount];

            // 当前页为前 5 页，展示前 6 页 +...+ 尾页
            // - 当选中页小于 5（1、2、3、4），不满足【展示选中页的前两页、选中页】；
            // - 当选中页等于 5，满足【展示选中页的前两页、选中页】，但没必要省略 2 （1, ..., 3, 4, 5)
            if (current <= 5) {
                let idx = 0;
                while (idx < 6) {
                    pages.push(idx + 1);
                    idx++;
                }
                return pages.concat(tail);
            }
            // 当前页为倒数 5 页，展示首页 +...+ 后 6 页
            if (_pageCount - current <= 4) {
                let idx = 0;
                while (idx < 6) {
                    pages.push(_pageCount - 5 + idx);
                    idx++;
                }
                return head.concat(pages);
            }
            // 当前页前 5 页和倒数 5 页时，展示首页、尾页、选中页、选中页的前两页、选中页的后两页，其余页码用...省略
            pages = [current - 2, current - 1, current, current + 1, current + 2];
            return head.concat(pages, tail);
        }
    };

    initData(): PaginationProps {
        return {
            total: 0,
            current: 1,
            pageSize: 10,
            pageCount: undefined
        };
    }

    attached() {
        this.watch('_current', (newValue: number, arg) => {
            if (newValue === arg.oldValue) {
                return;
            }
            this.fire<PaginationEvents['change']>('change', {
                current: newValue,
                prev: arg?.oldValue
            });
        });
    }

    onPrev() {
        const current = this.data.get('_current');
        current > 1 && this.data.set('current', current - 1);
    }

    onNext() {
        const current = this.data.get('_current');
        const _pageCount = this.data.get('_pageCount');
        current < _pageCount && this.data.set('current', current + 1);
    }

    /**
     * 点击页码，跳转到预期页码
     * @param page 页码
     */
    pageClick(page: string) {
        if (page === ELLIPSIS) {
            return;
        }
        this.data.set('current', page);
    }
}