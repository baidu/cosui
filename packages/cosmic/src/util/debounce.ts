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
 * @file 防抖
 */

export default class Debounce {
    /** 防抖定时器 */
    timer: NodeJS.Timeout | null;
    /** 防抖时间间隔 */
    interval: number = 50;

    /**
     * 构造函数
     * @param interval 防抖时间间隔
     */
    constructor(interval = 50) {
        this.timer = null;
        this.interval = interval;
    };

    /**
     * 节流函数
     * @param interval 防抖间隔
     * @param callBack 回调函数
     * @param app this指向
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    debounce(callBack: Function, app: any, interval: number = this.interval) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.timer = setTimeout(() => {
            callBack.bind(app)();
            this.timer = null;
        }, interval) as any;
    };

    /**
     * 清除防抖
     */
    clean() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };
}