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
 * 触发事件位置
 */

export enum From {
    /**
     * 热门城市
     */
    HOT = 'hot',

    /**
     * 索引列表城市
     */
    LETTER = 'letter',
    /**
     * 菜单城市
     */
    MENU = 'menu',

    /**
     * 搜索城市
     */
    SEARCH = 'search'
}


export interface City {

    /**
     * 城市名
     */
    city: string;

    /**
     * 城市展现层级
     * 1 展现到 city，如“北京市”
     * 2 展现 county，如 “海淀区”
     */
    level: string;

    /**
     * 城市 Id（仅国内城市需要）
     */
    code?: number;

    /**
     * 国家（仅国际城市需要）
     * 国际城市必传
     */
    country?: string;

    /**
     * 大洲（仅国际城市需要）
     * 国际城市必传
     */
    continent?: string;

    /**
     * 县
     */
    county?: string;

    /**
     * 拼音
     */
    pinyin?: string;

    /**
     * 英语
     */

    english?: string;

    /**
     * 省/州；存在相同名称的城市，需要省份做标识
     */
    province?: string;

    /**
     * 是否是热门城市
     */
    hot?: boolean;

    /**
     * 是否存在相同名称的城市，存在时：国际展示国家、国内展示省份
     */
    same?: boolean;

    /**
     * 索引字母
     */
    _initial?: string;

    /**
     * mobile 索引列表展示文字
     */
    _showLabel?: string;

    /**
     * menu 展示文字
     */
    _showMenuLabel?: string;

    /**
     * 城市唯一标识
     */
    _index?: number;

    /**
     * menu 里的国家城市是否进行多行省略
     */
    _ellipsis?: boolean;

    /**
     * menu 索引
     */
    _menuIndex?: number;


    /**
     * 城市索引, 当前国家的第几个城市，仅 mobile menu 面板下使用
     */
    _cityIndex?: number;

    /**
     * tab 索引
     */
    _activeTab?: number;
}



export interface MenuCityItem {
    cities: City[];
    label: string;
}
export interface MenuCity {
    label: string;
    content: MenuCityItem[];
}

export interface CitySelectorHeaderProps {
    /**
     * 输入框 placeholder
     * @default '搜索国内外城市/区域名称'
     */
    placeholder: string;
}

export interface CitySelectorHeaderData {
    /**
     * 用于搜索的城市列表
     */
    _cities: City[];

    /**
     * 当前是否要搜索国际数据
     */
    _activeForeign: boolean;

    /**
     * 是否正在搜索
     */
    _isSearch: boolean;

    /**
     * 搜索结果
     */
    _sugList: City[];

    /**
     * 输入框的输入
     */
    _value: string;
}

export interface CitySelectorContentProps {
    /**
     * 热门城市标题
     */
    hotTitle: string;

    /**
     * 是否展现气泡
     */
    showBubble?: boolean;
}

export interface CitySelectorContentData {
    /**
     * 城市列表数据
     */
    _cities: City[];

     /**
     * 热门城市
     */
    _hotCities?: City[];

    /**
     * 渲染城市列表
     */
    _renderCityList: City[];

     /**
     * 索引字母列表
     */
    _initialList: Initial[];

    /**
     * 当前索引
     */
    _currentInitial: Initial;

    /**
     * 索引字母高度
     */
    _initialHeight?: number;

    /**
     * 菜单城市数据
     */
    _menuList: MenuCity[];

    /**
     * 当前选中菜单
     */
    _activeMenuIndex?: number;

    /**
     * 虚拟列表高度
     */
    _citiesHeight?: number;

    /**
     * 是否隐藏热门城市( h5 往下滑动一定距离后隐藏热门城市，避免往上滑动太快时，热门城市若隐若现问题)
     * @default false
     */
    _hideHot?: boolean;

    /**
     * 是否使用大洲面板
     */
    _useContinent: boolean;
}

export interface CitySelectorProps extends CitySelectorHeaderProps, CitySelectorContentProps {
    /**
     * 弹窗是否可见
     * @default false
     */
    open: boolean;

    /**
     * 弹窗标题
     * @default '城市选择'
     */
    title?: string;

    /**
     * 当前选中的 tab；仅有多个 tab 时生效
     * @default 0
     */
    activeTab?: number;

    /**
     * 已选中的城市
     */
    selectedCities?: City[];

    /**
     * 国内城市列表，为空时不展示
     * @default {}
     */
    nativeCities?: City[];

    /**
     * 国际城市列表，为空时不展示
     * @default {}
     */
    foreignCities?: City[];

    /**
     * tab 头部名字
     */
    tabs: string[];

    /**
     * 是否自动滚动到已选中城市
     */
    anchor?: boolean;

    /**
     * 国际城市第几个开始折叠省略（从 0 开始计数）
     * 7: 360 小屏两列四行，从第 7 个开始折叠省略
     * 11: 三列四行，从第 11 个开始折叠省略
     */
    _ellipsisCount?: number;

    /**
     * 记录哪些国际城市菜单项已经取消“省略显示”
     */
    _foreignNoEllipsis?: Record<number, Array<{index: number, cityIndex: number}>>;

    /**
     * 用于在模板中访问 From 枚举
     */
    _from?: typeof From;

    /**
     * 指定父级 DOM，弹层将会渲染至该 DOM
     * @default undefined
     */
    getPopupContainer?: () => HTMLElement;
};

export type CitySelectorData = Required<CitySelectorProps & CitySelectorContentData & CitySelectorHeaderData>;

export interface Initial {
    initial: string;
    index: number;
    cities?: City[];
}

export interface CitySelectorMethods {
    handleChange: (params: {index: number}) => void;
    selectCity: (params: {city: City, from: From}) => void;
    handleClose: () => void;
    handleMore: (params: {menuIndex: number, index: number, cityIndex: number}) => void;
}

export interface CitySelectorEvents {
    change: {city: City, from: From};
    close: void;
    relocate: City;
}

