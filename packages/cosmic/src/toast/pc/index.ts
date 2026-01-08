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
        <div class="cos-toast" style="{{computedStyle}}">
            <cos-icon
                s-if="type"
                name="{{iconName}}"
                class="cos-toast-md-icon cos-toast-{{type}}-icon"
            />
            <div class="cos-toast-message">
                {{displayMessage}}
            </div>
            <div
                s-if="actionText"
                class="cos-toast-link"
                on-click="onAction"
            >
                {{displayActionText}}
            </div>
            <div
                s-if="closable"
                class="cos-toast-close-icon"
                on-click="onClose"
            >
                <cos-icon name="close" />
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    static computed = {
        /**
         * 获取 toast 组件的 computedStyle 属性值
         */
        computedStyle(this: ToastComponent): string {
            return `top: ${this.data.get('top')}px; opacity: ${this.data.get('opacity')};`;
        },

        /**
         * 显示 Toast 组件的消息
         * @param this ToastComponent 实例
         * @returns 返回截取后的消息，长度不超过 30 个字符
         */
        displayMessage(this: ToastComponent): string {
            const maxLength = 30;
            let message = this.data.get('message');
            if (message.length > maxLength) {
                message = message.slice(0, maxLength);
            }
            return message;
        },

        /**
         * 获取图标名称
         * @param this ToastComponent 实例对象
         */
        iconName(this: ToastComponent) {
            switch (this.data.get('type')) {
                case ToastType.Info:
                case ToastType.Warning:
                    return 'info-circle-fill';
                case ToastType.Success:
                    return 'check-circle-fill';
                case ToastType.Error:
                    return 'close-circle-fill';
                default:
                    return undefined;
            }
        },

        /**
         * 获取显示 Toast 操作文本的函数
         * @param this ToastComponent 类的实例对象
         * @returns 如果操作文本超过最大长度，则返回截取后的操作文本；否则返回传入的操作文本
         */
        displayActionText(this: ToastComponent): undefined | string {
            const maxLength = 4;
            let actionText = this.data.get('actionText');
            if (actionText && actionText.length > maxLength) {
                actionText = actionText.slice(0, maxLength);
            }
            return actionText;
        }
    };

    /**
     * 初始化数据，返回合并后的配置对象
     */
    initData() {
        return Object.assign({
            // template variables
            ToastSize,
            ToastType,
            ToastActionType,
            // data
            top: 0,
            opacity: 0
        }, defaultConfig);
    }

    /**
     * 渲染挂载的时候调用声明周期函数
     * 当元素首次连接到 DOM 时调用。设置不透明度为 1 并隐藏元素
     */
    attached() {
        this.data.set('opacity', 1);
        this.hide();
    }

    /**
     * 隐藏遮罩层
     */
    hide() {
        const duration = this.data.get('duration');
        setTimeout(() => {
            this.data.set('opacity', 0);
            // 给动画一些时间消失
            setTimeout(() => this.fire('dismiss'), 200);
        }, duration);
    }

    /**
     * 立即隐藏视图。
     */
    hideImmediately() {
        this.data.set('opacity', 0);
        this.fire('dismiss');
    }

    /**
     * 点击操作按钮时触发的事件处理函数
     * @param event {Event} 事件对象
     */
    onAction(event: Event) {
        this.fire<ToastEvents['action']>('action', {event});
        this.hideImmediately();
    }

    /**
     * 手动关闭 Toast
     *
     * @param event 事件对象
     */
    onClose(event: Event) {
        this.fire<ToastEvents['close']>('close', {event});
        this.hideImmediately();
    }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Toast {

    // Toast 调度队列
    static queue: ToastComponent[] = [];
    // ToastComponent 固定高度，计算要用到
    static toastHeight = 42;
    // ToastComponent 距离页面顶部的基础距离
    static baseTop = 15;
    // ToastComponent 之间的垂直间距
    static gap = 15;
    // 最多显示的 Toast 数量
    static maxToastCount = 3;

    /**
     * 显示 Toast
     * @param config 配置对象
     */
    static show(config: ToastConfig) {
        // 当队列长度达到最大值时，先移除最早的 Toast
        if (Toast.queue.length >= Toast.maxToastCount) {
            const earliestToast = Toast.queue.shift();
            if (earliestToast) {
                earliestToast.hideImmediately();
            }
        }

        const baseTop = config?.top !== undefined ? config.top : Toast.baseTop;
        const top = baseTop + Toast.calculateTop();
        const toast = new ToastComponent({data: Object.assign({}, defaultConfig, config, {top})});
        toast.on('dismiss', () => Toast.onDismiss(toast));
        if (config.onAction) {
            toast.on('action', config.onAction);
        }
        if (config.closable && config.onClose) {
            toast.on('close', config.onClose);
        }
        Toast.queue.push(toast);

        const parentNode = config.parentSelector || document.body;
        toast.attach(parentNode);
    }

    /**
     * 信息类型展示 Toast
     * @param config - 提示的配置项
     */
    static info(config: ToastConfig) {
        Toast.show({...config, type: ToastType.Info});
    }

    /**
     * 成功类型展示 Toast
     * @param config - 提示的配置项
     */
    static success(config: ToastConfig) {
        Toast.show({...config, type: ToastType.Success});
    }

    /**
     * 警告类型展示 Toast
     * @param config - 提示的配置项
     */
    static warn(config: ToastConfig) {
        Toast.show({...config, type: ToastType.Warning});
    }

    /**
     * 错误类型展示 Toast
     * @param config - 提示的配置项
     */
    static error(config: ToastConfig) {
        Toast.show({...config, type: ToastType.Error});
    }

    /**
     * 计算显示 Toast 距离上方的位置
     */
    static calculateTop() {
        return Toast.queue.length * (Toast.toastHeight + Toast.gap);
    }

    /**
     * 关闭 Toast 的回调事件
     *
     * @param dismissedToast - Toast 组件
     */
    static onDismiss(dismissedToast: ToastComponent) {
        Toast.queue = Toast.queue.filter(toast => toast !== dismissedToast);
        dismissedToast.dispose();
        Toast.updateToastPositions();
    }

    /**
     * 更新 Toast 位置
     */
    static updateToastPositions() {
        Toast.queue.forEach((toast, index) => {
            const newTop = Toast.baseTop + index * (Toast.toastHeight + Toast.gap);
            toast.data.set('top', newTop);
        });
    }
}
