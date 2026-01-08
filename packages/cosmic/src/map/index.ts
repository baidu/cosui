/**
 * @file 地图组件
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import {
    District,
    DistrictLabel,
    DRIVING_POLICY,
    MapProps,
    Marker,
    Route,
    TRANSIT_POLICY,
    TRAVEL_MODES,
    MapEvents
} from './interface';
import {allSettled} from '../util/all-settled';

/**
 * 全局回调函数名，用于百度地图SDK加载完成后的回调
 */
const BMAP_SDK_CALLBACK = '__bMapSDKCallback';

/**
 * 百度地图SDK的URL
 */
const BMAP_SDK_URL = 'https://api.map.baidu.com/api?type=webgl&v=1.0';

/**
 * 标记百度地图SDK是否正在加载
 */
let isBMapSDKLoading = false;

/**
 * 存储百度地图SDK加载完成后的回调函数
 * 用于在多个 MapRoute 实例中共享加载状态
 */
let bMapInstanceCbArray: Array<{
    resolve: () => void;
    reject: (reason?: unknown) => void;
}> = [];

/**
 * 默认缩放级别
 */
const DEFAULT_ZOOM = 15;

/**
 * 默认标记图标URL
 */
const DEFAULT_MARKER_ICON = 'https://gips1.baidu.com/it/u=1257137061,2585202258&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f164_202';

/**
 * 省份城市正则表达式
 */
const PROVINCE_CITY_REGEX = /(((回|壮)族)*(维吾尔)*自治区|特别行政区|省|市)$/g;

declare global {
    interface Window {
        [BMAP_SDK_CALLBACK]?: () => void;
    }
}

export default class Map extends Component<MapProps> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cos-map">
            <template s-if="_isMapReady">
                <div class="cos-map-fullscreen" on-click="handleFullscreen($event)">
                    <cos-icon name="full-screen"/>
                </div>
                <div class="cos-map-zoom-control">
                    <div class="cos-map-zoom-in" on-click="handleZoomIn($event)">
                        <cos-icon name="plus"/>
                    </div>
                    <div class="cos-map-zoom-out" on-click="handleZoomOut($event)">
                        <cos-icon name="minus"/>
                    </div>
                </div>
            </template>
            <div s-ref="map" class="cos-map-container"></div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    mapInstance: BMapGL.Map | null;
    markerTimer: ReturnType<typeof setTimeout> | null;
    bindHandleTilesLoaded: () => void;
    bindHandleMapClick: (event: Event) => void;

    initData(): MapProps {
        return {
            apiKey: '',
            lat: 39.915,
            lng: 116.404,
            zoom: DEFAULT_ZOOM,
            route: undefined,
            marker: undefined,
            district: undefined,
            _isMapReady: false
        };
    }

    inited() {
        this.mapInstance = null;
    }

    created() {
        this.watch('route', this.startDraw);
        this.watch('marker', this.startDraw);
        this.watch('district', this.startDraw);
    }

    attached() {
        this.loadBMapSDK().then(() => {
            this.initMap();
        });
    }

    detached() {
        if (this.mapInstance) {
            this.mapInstance.clearOverlays();
            // @ts-expect-error - BMapGL类型定义不完整
            this.mapInstance.destroy();
            this.mapInstance.removeEventListener('tilesloaded', this.bindHandleTilesLoaded);
            this.mapInstance.removeEventListener('click', this.bindHandleMapClick);
        }
        this.markerTimer && clearTimeout(this.markerTimer);
        this.markerTimer = null;
    }

    loadBMapSDK() {
        return new Promise<void>((resolve, reject) => {
            if (typeof BMapGL !== 'undefined') {
                resolve();
                return;
            }

            // 如果实例化多个 Map 组件，只有第一个会真正去加载 sdk，并将 loading 标志设为 true
            // 后续组件将 cb 放到全局数组里，待 sdk 加载完成时里统一 resolve
            if (isBMapSDKLoading) {
                bMapInstanceCbArray.push({resolve, reject});
                return;
            }

            isBMapSDKLoading = true;
            window[BMAP_SDK_CALLBACK] = () => {
                isBMapSDKLoading = false;
                bMapInstanceCbArray.forEach(({resolve}: { resolve: () => void }) => resolve());
                resolve();
                delete window[BMAP_SDK_CALLBACK];
            };

            const bodyEl = document.querySelector('body');
            const script = document.createElement('script');
            const apiKey = this.data.get('apiKey');
            script.src = `${BMAP_SDK_URL}&ak=${apiKey}&callback=${BMAP_SDK_CALLBACK}`;
            script.async = true;
            script.onerror = () => {
                bMapInstanceCbArray.forEach(({reject}: { reject: (reason?: unknown) => void }) => {
                    reject(new Error('加载百度地图SDK失败'));
                });
                reject(new Error('加载百度地图SDK失败'));
                bMapInstanceCbArray = [];
                isBMapSDKLoading = false;
            };
            bodyEl?.appendChild(script);
        });
    }

    initMap() {
        const mapContainer = this.ref('map');
        if (!mapContainer) {
            return;
        }

        this.mapInstance = new BMapGL.Map(mapContainer as unknown as HTMLDivElement);
        this.bindHandleTilesLoaded = this.handleTilesLoaded.bind(this);
        this.bindHandleMapClick = this.handleMapClick.bind(this);
        this.mapInstance.addEventListener('tilesloaded', this.bindHandleTilesLoaded);
        this.mapInstance.addEventListener('click', this.bindHandleMapClick);
        this.mapInstance.enableScrollWheelZoom();

        const lat = this.data.get('lat');
        const lng = this.data.get('lng');
        const zoom = this.data.get('zoom');
        this.mapInstance.centerAndZoom(new BMapGL.Point(lng, lat), zoom);

        this.startDraw();
    }

    startDraw() {
        if (!this.mapInstance) {
            return;
        }

        this.mapInstance.clearOverlays();

        this.addRoute();
        this.addMarker();
        this.addDistrict();
    }

    addRoute() {
        if (!this.mapInstance) {
            return;
        }

        const route = this.data.get('route');
        if (!Array.isArray(route) || !route.length) {
            return;
        }


        route.forEach((item: Route) => {
            const {points: routePoints, travelType} = item;
            if (!routePoints) {
                return;
            }

            const points = routePoints.map(point => new BMapGL.Point(...point));
            // 必须至少有两个点才能绘制路线
            if (points?.length < 2) {
                return;
            }

            const start = points[0];
            const end = points[points.length - 1];
            // 使用终点重新设置中心位置
            const zoom = this.data.get('zoom') || DEFAULT_ZOOM;
            this.mapInstance?.centerAndZoom(end, zoom);

            let waypoints: BMapGL.Point[] = [];
            // 如果有途经点并且出行方式是 driving，提取途径点
            if (points.length > 2 && travelType === TRAVEL_MODES.DRIVING) {
                waypoints = points.slice(1, points.length - 1);
            }

            let planner = null;
            switch (travelType) {
                case TRAVEL_MODES.DRIVING:
                    // @ts-expect-error
                    planner = new BMapGL.DrivingRouteLine(this.mapInstance!, {
                        renderOptions: {map: this.mapInstance},
                        policy: this.data.get('drivingPolicy') || DRIVING_POLICY.BMAP_DRIVING_POLICY_DEFAULT
                    });
                    break;
                case TRAVEL_MODES.WALKING:
                    planner = new BMapGL.WalkingRoute(this.mapInstance!, {
                        renderOptions: {map: this.mapInstance!}
                    });
                    break;
                case TRAVEL_MODES.TRANSIT:
                    planner = new BMapGL.TransitRoute(this.mapInstance!, {
                        renderOptions: {map: this.mapInstance!},
                        policy: this.data.get('transitPolicy') || TRANSIT_POLICY.BMAP_TRANSIT_POLICY_RECOMMEND
                    });
                    break;
                case TRAVEL_MODES.RIDING:
                    // @ts-expect-error
                    planner = new BMapGL.RidingRoute(this.mapInstance!, {
                        renderOptions: {map: this.mapInstance!}
                    });
                    break;
                default:
                    // 默认使用公共交通路线
                    planner = new BMapGL.TransitRoute(this.mapInstance!, {
                        renderOptions: {map: this.mapInstance!},
                        policy: this.data.get('transitPolicy') || TRANSIT_POLICY.BMAP_TRANSIT_POLICY_RECOMMEND
                    });
                    break;
            }

            if (travelType === TRAVEL_MODES.DRIVING && waypoints) {
                planner.search(start, end, {
                    waypoints
                });
            }
            else {
                planner.search(start, end);
            }
            this.mapInstance?.addOverlay(planner);
        });
    }

    addMarker() {
        if (!this.mapInstance) {
            return;
        }

        const marker = this.data.get('marker');
        if (!Array.isArray(marker) || !marker.length) {
            return;
        }

        // 以第一个标记点为中心
        const firstMarker = marker[0];
        const firstPoint = new BMapGL.Point(firstMarker.lng, firstMarker.lat);
        const zoom = this.data.get('zoom') || DEFAULT_ZOOM;
        this.mapInstance.centerAndZoom(firstPoint, zoom);
        const points: BMapGL.Point[] = [];

        marker.forEach((markerItem: Marker) => {
            points.push(new BMapGL.Point(markerItem?.lng, markerItem?.lat));
            const {lat, lng, icon, label: labelData} = markerItem;
            const myIcon = new BMapGL.Icon(icon || DEFAULT_MARKER_ICON, new BMapGL.Size(22, 29));
            const marker = new BMapGL.Marker(new BMapGL.Point(lng, lat), {
                icon: myIcon
            });

            this.mapInstance?.addOverlay(marker);

            // 新增文本标记
            if (labelData) {
                const labelOptions = {
                    position: new BMapGL.Point(lng, lat),
                    offset: new BMapGL.Size(20, -15)
                };
                const label = new BMapGL.Label(labelData?.text, labelOptions);
                label.setStyle({
                    color: '#000311',
                    borderRadius: '3px',
                    border: '#fff',
                    padding: '4px',
                    fontSize: '12px'
                });
                this.mapInstance!.addOverlay(label);
            }
        });

        // 此处使用定时器的原因是因为 setViewport 在同步时序中偶现不生效
        this.markerTimer = setTimeout(() => {
            this.mapInstance?.setViewport(points);
        }, 30);

    }

    addDistrict() {
        if (!this.mapInstance) {
            return;
        }

        const district = this.data.get('district');
        if (!Array.isArray(district) || !district.length) {
            return;
        }

        this.mapInstance.setMapStyleV2(
            {
                styleJson: [{
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: {
                        visibility: 'off'
                    }
                }]
            }
        );
        const bdary = new BMapGL.Boundary();
        const tasks: Array<Promise<BMapGL.Point[][]>> = [];

        district.forEach((item: District) => {
            const labels: DistrictLabel[] = [];
            const highLightAreaList = item.highLight;
            // 区/县
            if (item.level === 3) {
                labels.push({
                    // eslint-disable-next-line no-undef
                    position: new BMapGL.Point(item.lng, item.lat),
                    name: item.name?.replace(PROVINCE_CITY_REGEX, ''),
                    displayRange: [4, 4.9999],
                    style: {
                        color: '#121825',
                        strokeColor: '#fff',
                        fontSize: 22,
                        haloSize: 1
                    },
                    rank: 49999,
                    direction: 2,
                    uid: item.code,
                    enableMassClear: false
                });
            }
            if (item.level > 2) {
                const task = new Promise<BMapGL.Point[][]>((resolve, reject) => {
                    bdary?.get(item.name, rs => {
                        // @ts-expect-error
                        const count = rs.boundaries?.length;
                        if (count === 0) {
                            reject('没有获取到对应的边界数据');
                        }
                        // @ts-expect-error
                        resolve(rs.boundaries);
                    });
                });
                tasks.push(task);

                // @ts-expect-error
                const dist = new BMapGL.DistrictLayer({
                    name: `(${item.name})`,
                    // 区级行政区只需要绘制边界，其他等级行政区需要绘制下辖行政区边界
                    kind: item.level === 5 ? 0 : 1,
                    fillOpacity: 0,
                    strokeWeight: 0.25,
                    strokeColor: '#2184E9'
                });
                // @ts-expect-error
                this.mapInstance?.addDistrictLayer(dist);

                if (item.level !== 5) {
                    item.districts?.forEach(subItem => {
                        let subItemText = subItem.name;
                        if (subItem.level <= 4) {
                            subItemText = subItem.name?.replace(PROVINCE_CITY_REGEX, '');
                        }
                        // eslint-disable-next-line no-undef,max-len
                        const position = new BMapGL.Point(subItem.lng, subItem.lat);
                        let displayRange = [7, 10];
                        let isHightLight = false;
                        highLightAreaList?.forEach(highLightItem => {
                            if (highLightItem.code === subItem.code) {
                                isHightLight = true;
                            }
                        });
                        const style = {
                            fontSize: 24,
                            haloSize: isHightLight ? 0.5 : 2,
                            color: isHightLight ? '#2c333e' : '#495468',
                            strokeColor: '#fff'
                        };
                        // 高亮的 碰撞等级更高
                        const rank = isHightLight ? 50000 : 49999;
                        if (subItem.level === 4) {
                            displayRange = [6, 7];
                            if (isHightLight) {
                                // 地级市【4.4，6】区间也需要展示高亮的文字
                                labels.push({
                                    position,
                                    name: subItemText,
                                    displayRange: [4.4, 6],
                                    style: {
                                        ...style,
                                        fontSize: 18,
                                        haloSize: isHightLight ? 0.5 : 1
                                    },
                                    rank,
                                    direction: 2,
                                    uid: `${subItem.code}-highLight`,
                                    enableMassClear: false
                                });
                            }
                        }
                        labels.push({
                            position,
                            name: subItemText,
                            displayRange,
                            style,
                            rank,
                            direction: 2,
                            uid: subItem.code,
                            enableMassClear: false
                        });
                    });
                }
            }

            // 概率出现添加失败的情况，放在下一个时序中执行
            this.nextTick(() => {
                // @ts-expect-error
                this.mapInstance?.addLabelsToMapTile(labels);
            });
        });

        allSettled(tasks).then(res => {
            let pointArray: BMapGL.Point[] = [];
            res?.forEach(item => {
                if (item?.status === 'fulfilled') {
                    item?.value?.forEach((subItem: BMapGL.Point[]) => {
                        const ply = new BMapGL.Polygon(subItem, {
                            strokeWeight: 0,
                            strokeColor: '#2184E9',
                            fillColor: '#2184E9',
                            fillOpacity: 0.1
                        });
                        this.mapInstance?.addOverlay(ply);
                        pointArray = pointArray.concat(ply?.getPath());
                    });
                }
            });

            this.mapInstance?.setViewport(pointArray, {
                zoomFactor: 0.1
            });

            const code = district?.[0]?.code;
            const mapCircleAreaListLength = district?.length;
            const lng = district?.[0]?.lng || 120.13940;
            const lat = district?.[0]?.lat || 30.25909;
            // 香港澳门地图不支持，需要特殊处理
            // 澳门
            if (code === 820000 && mapCircleAreaListLength === 1) {
                // @ts-expect-error
                this.mapInstance?.flyTo(new BMapGL.Point(lng, lat), 11);
            }
            // 香港
            else if (code === 810000 && mapCircleAreaListLength === 1) {
                // @ts-expect-error
                this.mapInstance?.flyTo(new BMapGL.Point(lng, lat), 9.5);
            }
            else {
                this.mapInstance?.setViewport(pointArray, {
                    zoomFactor: 0.1
                });
            }
        });

        this.addHighLightDistrict();
    }

    addHighLightDistrict() {
        if (!this.mapInstance) {
            return;
        }

        const district = this.data.get('district');
        if (!Array.isArray(district) || !district.length) {
            return;
        }

        district?.forEach(item => {
            const {highLight, districts} = item;
            if (!highLight) {
                return;
            }

            // 处理多点高亮，但没有二级区域的情况
            if (highLight.length > 1 && (!districts || !districts.length)) {
                const bdary: BMapGL.Boundary = new BMapGL.Boundary();
                const highLightTasks: Array<Promise<BMapGL.Point[][]>> = [];
                highLight?.forEach((item: District) => {
                    const labels: DistrictLabel[] = [];
                    const name = item.level === 3 ? item.name?.replace(PROVINCE_CITY_REGEX, '') : item.name;
                    let displayRange = [4, 5];
                    if (item.level === 4) {
                        displayRange = [4, 7];
                    }
                    if (item.level === 5) {
                        displayRange = [4, 9];
                    }

                    labels.push({
                        position: new BMapGL.Point(item.lng, item.lat),
                        name: name,
                        displayRange: displayRange,
                        style: {
                            color: '#2c333e',
                            strokeColor: '#fff',
                            fontSize: 22,
                            haloSize: 1
                        },
                        rank: 50000,
                        direction: 2,
                        uid: item.code,
                        enableMassClear: false
                    });

                    if (item.level > 2) {
                        const task = new Promise<BMapGL.Point[][]>((resolve, reject) => {
                            bdary?.get(item.name, rs => {
                                // @ts-expect-error
                                const count = rs.boundaries?.length;
                                if (count === 0) {
                                    reject('没有获取到对应的边界数据');
                                }
                                // @ts-expect-error
                                resolve(rs.boundaries);
                            });
                        });
                        highLightTasks.push(task);
                    }

                    // 概率出现添加失败的情况，放在下一个时序中执行
                    this.nextTick(() => {
                        // @ts-expect-error
                        this.mapInstance?.addLabelsToMapTile(labels);
                    });
                });

                allSettled<BMapGL.Point[][]>(highLightTasks).then(res => {
                    let pointArray: BMapGL.Point[] = [];
                    res?.forEach(item => {
                        if (item?.status === 'fulfilled') {
                            item?.value?.forEach((subItem: BMapGL.Point[]) => {
                                // eslint-disable-next-line no-undef
                                const ply = new BMapGL.Polygon(subItem, {
                                    strokeWeight: 0.1,
                                    fillOpacity: 0.9,
                                    fillColor: '#FFFA65',
                                    strokeColor: '#2184E9'
                                });
                                this.mapInstance?.addOverlay(ply);
                                pointArray = pointArray.concat(ply?.getPath());
                            });
                        }
                    });
                    this.mapInstance?.setViewport(pointArray);
                });
            }
            else {
                highLight?.forEach((item: District) => {
                    // @ts-expect-error
                    const dist = new BMapGL.DistrictLayer({
                        name: `(${item.name})`,
                        kind: 0,
                        strokeWeight: 0.01,
                        fillOpacity: 0.9,
                        fillColor: '#FFFA65',
                        strokeColor: '#FFFA65'
                    });
                    // @ts-expect-error
                    this.mapInstance?.addDistrictLayer(dist);
                });
            }
        });
    }

    handleZoomIn(event: Event) {
        this.mapInstance?.zoomIn();
        event.stopPropagation();
        this.fire<MapEvents['zoom-in']>('zoom-in', {event});
    }

    handleZoomOut(event: Event) {
        this.mapInstance?.zoomOut();
        event.stopPropagation();
        this.fire<MapEvents['zoom-out']>('zoom-out', {event});
    }

    handleFullscreen(event: Event) {
        event.stopPropagation();
        this.fire<MapEvents['fullscreen']>('fullscreen', {event});
    }

    handleTilesLoaded() {
        this.data.set('_isMapReady', true);
        this.fire<MapEvents['map-ready']>('map-ready', null);
        this.mapInstance?.removeEventListener('tilesloaded', this.handleTilesLoaded);
    }

    handleMapClick(event: Event) {
        this.fire<MapEvents['map-click']>('map-click', {event});
    }
}
