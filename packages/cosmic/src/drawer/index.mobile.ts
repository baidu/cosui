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
 * @file drawer 组件
 */

import {Component} from 'san';
import {DrawerProps, DrawerData, DrawerEvents} from './interface';
import {Position} from '../util';
import DrawerContainer from './drawer-container';

export default class Drawer extends Component<DrawerData> {

    static template = `<div s-if="_open">
    </div>`;

    drawer: null | DrawerContainer;
    initData(): DrawerProps {
        return {
            _open: true,
            position: Position.BOTTOM,
            open: false,
            mask: true,
            title: undefined,
            closeable: true,
            closeOnSwipe: false,
            getPopupContainer: undefined,
            destroyOnClose: true,
            _maskStyle: '',
            _containerStyle: ''
        };
    }

    attached() {
        this.attachDrawer();
    }

    attachDrawer() {
        this.drawer = new DrawerContainer({
            owner: this,
            source: `
                <cos-drawer-container
                    open="{=open=}"
                    class="{{class}}"
                    mask="{{mask}}"
                    title="{{title}}"
                    closeable="{{closeable}}"
                    closeOnSwipe="{{closeOnSwipe}}"
                    position="{{position}}"
                    getPopupContainer="{{getPopupContainer}}"
                    destroyOnClose="{{destroyOnClose}}"
                    on-close="handleClose"
                >
                    <template slot="title">
                        <slot name="title">
                            <div s-if="title || closeable"
                                class="cos-drawer-title"
                                on-touchmove="handleTouchmove"
                            >{{ title }}</div>
                         </slot>
                    </template>
                    <slot />
                </cos-drawer-container>
            `
        });
        const getPopupContainer = this.data.get('getPopupContainer');
        const container = typeof getPopupContainer === 'function' ? getPopupContainer() : this.el?.parentNode;
        this.drawer.attach(container);
        this.data.set('_open', false);
    }

    handleTouchmove(e: TouchEvent) {
        e.preventDefault();
    }

    handleClose(event: DrawerEvents['close']) {
        this.fire<DrawerEvents['close']>('close', event);
    }
}