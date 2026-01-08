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
 * @file 节流
 */

export default class Throttle {
    /** 节流时间间隔 */
    wait: number = 50;
    /** 节流定时器 */
    timer: NodeJS.Timeout | null;
    /** 是否触发最后一次回调 */
    isLatest: boolean = false;
    /** 节流触发最后一次的定时器 */
    latesttimer: NodeJS.Timeout | null;
    /** 最后一次节流触发回调 */
    latestCallBack: () => void;
    /** 最后一次节流触发回调的上下文 */
    latestApp: any;

    /**
     * 构造函数
     * @param wait 节流时间间隔
     * @param isLatest 是否触发最后一次回调，默认false
     */
    constructor(wait = 50, isLatest = false) {
        this.wait = wait;
        this.isLatest = isLatest;
    }

    /**
     * 节流方法
     * @param callBack 回调函数
     * @param app 回调上下文
     * @param wait 节流时间间隔(设置后会更新后面每一次回调间隔)
     * @param argsArray 回调参数数组
     */
    throttle(callBack: () => void, app: any, wait: number = this.wait, argsArray: any[] = []) {
        if (this.timer) {

            // 每次更新一下最后的回调和上下文
            if (this.isLatest) {
                this.latestCallBack = callBack;
                this.latestApp = app;
                this.cleanLatest();
            }
            return;
        }

        this.wait = wait;
        callBack.apply(app, argsArray);

        this.timer = setTimeout(() => {
            this.timer = null;

            // 最后一次触发，避免最后一次在前面return没有执行
            if (this.isLatest) {
                this.latest();
            }
        }, this.wait);
    }

    /**
     * 触发最后一次回调入口
     */
    latest() {
        this.latesttimer = setTimeout(() => {
            this.latesttimer = null;
            this.latestCallBack && this.latestApp && this.latestCallBack.apply(this.latestApp);
        }, this.wait);
    }

    /**
     * 清除最后一次回调定时器
     */
    cleanLatest() {
        if (this.latesttimer) {
            clearTimeout(this.latesttimer);
            this.latesttimer = null;
        }
    }

    /**
     * 清理函数
     */
    clean() {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        this.cleanLatest();
    }
}