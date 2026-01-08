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

interface Params {
    // 表示打开地图app的初始化页面类型
    show_type: string;
    // poi地点唯一id
    uid: string;
    // 调起地图打点参数(与地图pm shanshan约定)
    src: string;
}

export interface InvokeInfo {
    params?: Params;
    defaultUrl?: string;
}

export interface PoiProps {
    // 地图图片链接
    mapImage: string;
    // 地图跳转链接
    linkInfo?: object;
    // 仅弱样式下传
    marker?: boolean;
    // 地址
    address?: string;
    // 市区
    area?: string;
    // 调起百度地图单点页信息
    invokeInfo?: InvokeInfo;
    // 是否收起态
    folded?: boolean;
}

export type PoiData = Required<PoiProps>;

export interface PoiEvents {
    'poi-ready': {
        posName: string;
        params: InvokeInfo['params'];
        defaultUrl: InvokeInfo['defaultUrl'];
        inited: (invokeCallback: (event: Event) => void) => void;
    };

    click: {
        event: Event;
    };
}