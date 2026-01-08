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
    // 表示起点
    origin: string;
    /**
     * 格式: name:destination|latlng:latln
     * 表示起点位置和终点位置
     * latln为经纬度 destination为重点地址
     */
    destination: string;
    // 坐标 默认为'bd09mc'
    coord_type: string;
    // 调起地图打点参数(与地图pm shanshan约定)
    src: string;
    // 一般为固定值'yes'
    navInit: string;
}

export interface InvokeInfo {
    params?: Params;
    defaultUrl?: string;
}

interface Poi {
    // 地点名
    name: string;
    // 市区
    area?: string;
    // 地址
    address: string;
}

export interface ShopAddressProps {
    // 图片
    thumbnail: string;
    // 店铺名称
    title: string;
    // 地址距离用户距离
    distance?: string;
    // sku标签 固定灰色
    tags?: Array<{text: string}>;
    // 店铺跳转链接
    linkInfo?: object;
    // 导航跳转链接
    navigationInfo?: object;
    // 调用百度地图导航
    invokeInfo?: InvokeInfo;
    poi?: Poi;
    // 初始是否是折叠态
    folded: boolean;
}

export type ShopAddressData = Required<ShopAddressProps>;

export interface ShopAddressEvents {
    'poi-ready': {
        posName: string;
        params: InvokeInfo['params'];
        defaultUrl: InvokeInfo['defaultUrl'];
        inited: (callback: (event: Event) => void) => void;
    };
    click: {
        event: Event;
        from?: string;
    };
}