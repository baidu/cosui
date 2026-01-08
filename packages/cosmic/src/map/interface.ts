export interface MapProps {
    /**
     * 地图中心经度
     */
    lat: number;
    /**
     * 地图中心纬度
     */
    lng: number;
    /**
     * 地图缩放级别
     */
    zoom: number;
    /**
     * 百度地图ak
     */
    apiKey: string;
    /**
     * 地图路线
     */
    route?: Route[];
    /**
     * 地图标记
     */
    marker?: Marker[];
    /**
     * 地图区域
     */
    district?: District[];
    /**
     * 地图是否准备就绪
     */
    _isMapReady: boolean;
}

/**
 * 地图路线
 */
export interface Route {
    /**
     * 路线点
     */
    points: Array<[number, number]>;
    /**
     * 出行方式
     */
    travelType: TRAVEL_MODES;
    /**
     * 驾车方案的策略配置
     */
    drivingPolicy: DRIVING_POLICY;
    /**
     * 市内公交方案换乘策略
     */
    transitPolicy: TRANSIT_POLICY;
}

/**
 * 地图标记
 */
export interface Marker {
    /**
     * 标记纬度
     */
    lat: number;
    /**
     * 标记经度
     */
    lng: number;
    /**
     * 标记图标
     */
    icon?: string;
    /**
     * 标记文本
     */
    label?: {
        text: string;
        style: object;
    };
}

/**
 * 地图区域
 */
export interface District {
    /**
     * 行政区经度
     */
    lng: number;
    /**
     * 行政区纬度
     */
    lat: number;
    /**
     * 行政区等级
     * 0：全国
     * 1：省份
     * 2：市
     * 3：区/县
     * 4：镇/乡/街道
     */
    level: number;
    /**
     * 行政区邮编
     */
    code: number;
    /**
     * 行政区名称
     */
    name: string;
    /**
     * 行政区子区域
     */
    districts?: District[];
    /**
     * 高亮区域
     */
    highLight?: District[];
}

export interface Label {
    /**
     * 标签文本
     */
    text: string;
    /**
     * 标签样式
     */
    style: object;
}

/**
 * 出行方式
 */
export enum TRAVEL_MODES {
    /**
     * 公共交通
     */
    TRANSIT = 'transit',
    /**
     * 驾车
     */
    DRIVING = 'driving',
    /**
     * 步行
     */
    WALKING = 'walking',
    /**
     * 骑行
     */
    RIDING = 'riding'
}

/**
 * 驾车方案的策略配置
 */
export enum DRIVING_POLICY {
    /**
     * 默认策略
     */
    BMAP_DRIVING_POLICY_DEFAULT = 0,
    /**
     * 避免高速
     */
    BMAP_DRIVING_POLICY_AVOID_HIGHWAYS = 3,
    /**
     * 首选高速
     */
    BMAP_DRIVING_POLICY_FIRST_HIGHWAYS = 4,
    /**
     * 避免拥堵
     */
    BMAP_DRIVING_POLICY_AVOID_CONGESTION = 5
}

/**
 * 市内公交方案换乘策略
 */
export enum TRANSIT_POLICY {
    /**
     * 推荐方案
     */
    BMAP_TRANSIT_POLICY_RECOMMEND = 0,
    /**
     * 最少换乘
     */
    BMAP_TRANSIT_POLICY_LEAST_TRANSFER = 1,
    /**
     * 最少步行
     */
    BMAP_TRANSIT_POLICY_LEAST_WALKING = 2,
    /**
     * 不乘地铁
     */
    BMAP_TRANSIT_POLICY_AVOID_SUBWAYS = 3,
    /**
     * 最少时间
     */
    BMAP_TRANSIT_POLICY_LEAST_TIME = 4,
    /**
     * 优先地铁，地铁是公交出行的特殊情况，通过这个 policy 控制
     */
    BMAP_TRANSIT_POLICY_FIRST_SUBWAYS = 5,
}

/**
 * 行政区标签
 */
export interface DistrictLabel {
    /**
     * 标签位置
     */
    position: BMapGL.Point;
    /**
     * 标签文本
     */
    name: string;
    /**
     * 标签显示范围
     */
    displayRange: number[];
    /**
     * 标签样式
     */
    style: object;
    /**
     * 标签排名
     */
    rank: number;
    /**
     * 标签方向
     */
    direction: number;
    /**
     * 标签唯一标识
     */
    uid: number | string;
    /**
     * 标签是否开启批量清除
     */
    enableMassClear: boolean;
}

export interface MapEvents {
    /**
     * 地图加载完成
     */
    'map-ready': null;
    /**
     * 地图点击
     */
    'map-click': {
        event: Event;
    };
    /**
     * 地图点击全屏
     */
    'fullscreen': {
        event: Event;
    };
    /**
     * 地图点击放大视野
     */
    'zoom-in': {
        event: Event;
    };
    /**
     * 地图点击缩小视野
     */
    'zoom-out': {
        event: Event;
    };
}