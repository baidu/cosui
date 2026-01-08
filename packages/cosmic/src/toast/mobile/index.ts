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
 * @file Toast
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Button from '@cosui/cosmic/button';
import {
    ToastConfig,
    ToastSize,
    ToastType,
    ToastActionType,
    ToastEvents
} from '../interface';
import {
    defaultConfig,
    ToastComponentData
} from './interface';

class ToastComponent extends Component<Required<ToastComponentData>> {

    static template = `
        <div
            s-if="visible"
            class="cos-toast{{position ? ' cos-toast-' + position : ''}}">
            <div class="cos-toast-container{{size ? ' cos-toast-' + size : ''}}">
                <cos-icon
                    s-if="size === ToastSize.LG && type"
                    name="{{iconName}}"
                    class="cos-toast-lg-icon"
                    style="{{ {'animation-duration': animationDuration + 'ms'} }}"
                />

                <div class="cos-toast-content">
                    <cos-icon
                        s-if="size === ToastSize.MD && type"
                        class="cos-toast-md-icon"
                        style="{{ {'animation-duration': animationDuration + 'ms'} }}"
                        name="{{iconName}}"
                    />
                    <!--消除段落间距-->
                    <div class="cos-text-body-lg cos-space-m-none cos-toast-message">
                        {{displayMessage}}
                    </div>
                    <cos-button
                        s-if="actionText && actionType === ToastActionType.Button"
                        class="cos-toast-button"
                        size="sm"
                        on-click="onAction"
                    >
                        {{displayActionText}}
                    </cos-button>
                    <div
                        s-elif="actionText && actionType === ToastActionType.Link"
                        class="cos-toast-link"
                        on-click="onAction"
                    >
                        <div class="cos-toast-link-divider" />
                        <div class="cos-toast-link-text">
                            {{displayActionText}}
                        </div>
                        <cos-icon name="right" />
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cos-icon': Icon
    };

    static computed = {
        /**
         * 获取图标名称。
         * @param this ToastComponent 实例对象
         * @returns 返回图标名称，如果类型为 Success，返回 "check-circle"；否则返回空字符串，后续需要扩展
         */
        iconName(this: ToastComponent): string {
            switch (this.data.get('type')) {
                case ToastType.Success: {
                    return 'check-circle';
                }
                case ToastType.Refresh: {
                    return 'refresh';
                }
                default: {
                    return '';
                }
            }
        },

        /**
         * 根据当前 Toast 组件的消息数据进行处理，返回处理后的字符串
         * @param this - 当前 Toast 组件对象
         * @returns 返回处理后的字符串
         */
        displayMessage(this: ToastComponent): string {
            let message = this.data.get('message');
            switch (this.data.get('size')) {
                case ToastSize.MD: {
                    const maxLength = 10;
                    if (this.data.get('type') && message.length > maxLength) {
                        message = message.slice(0, maxLength);
                    }
                    break;
                }
                case ToastSize.LG: {
                    const maxLength = 6;
                    if (message.length > maxLength) {
                        message = message.slice(0, maxLength);
                    }
                    break;
                }
            }
            return message;
        },

        /**
         * 获取 Toast 组件的操作文本。
         * @param this Toast 组件实例。
         * @returns 如果操作文本存在且长度大于 4 个字符，则返回截取前 4 个字符；否则返回 undefined。
         */
        displayActionText(this: ToastComponent): undefined | string {
            let actionText = this.data.get('actionText');
            if (actionText && actionText.length > 4) {
                actionText = actionText.slice(0, 4);
            }
            return actionText;
        }
    };

    /**
     * 初始化数据
     */
    initData() {
        return Object.assign({
            // template variables
            ToastSize,
            ToastType,
            ToastActionType,
            // data
            visible: false
        }, defaultConfig);
    }

    /**
     * 展示 Toast
     */
    show() {
        this.data.set('visible', true);
    }

    /**
     * 隐藏 Toast
     */
    hide() {
        this.data.set('visible', false);
    }

    /**
     * 点击 Toast action 区域回调函数
     * @param event Event 对象
     */
    onAction(event: Event) {
        this.fire<ToastEvents['action']>('action', {event});
        this.hide();
    }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Toast {

    static component: ToastComponent;
    static config: ToastConfig;
    static hideTimer: null | ReturnType<typeof setTimeout> = null;
    static showing: 'na' | 'h5' | '';

    /**
     * 初始化 Toast 组件
     *
     * @param config - 传入的配置对象
     */
    static init(config: ToastConfig) {
        if (Toast.component) {
            Toast.component.hide();
        }

        Toast.config = config;
        Toast.component = new ToastComponent({data: Toast.config});
        if (Toast.config.onAction) {
            Toast.component.on('action', Toast.config.onAction);
        }

        // 处理当前 Toast 实例挂载到 DOM 哪个节点上
        const parentNode = config.parentSelector || document.body;
        Toast.component.attach(parentNode);
    }

    static show(config: ToastConfig) {
        const newConfig = Object.assign({}, defaultConfig, config);
        this.showing = 'h5';
        Toast.showH5Toast(newConfig);
    }

    static showH5Toast(config: ToastConfig) {
        Toast.init(config);
        Toast.component.show();

        if (Toast.hideTimer) {
            clearTimeout(Toast.hideTimer);
            Toast.hideTimer = null;
        }
        Toast.hideTimer = setTimeout(() => {
            Toast.component.hide();
        }, Toast.config.duration);
    }

    /**
     * 关闭 Toast
     */
    static hide() {
        if (!this.showing) {
            return;
        }
        Toast.component && Toast.component.hide();
        this.showing = '';
    }
}
