``` san export=preview caption=RowLanes
import {Component} from 'san';
import RowLanes from '@cosui/cosmic/row-lanes';
import Input from '@cosui/cosmic/input';
import Select from '@cosui/cosmic/select';
import './basic.less';

export default class Default extends Component {

    static template = `
        <div class="row-lanes">
            <div class="demo-controller">
                <div class="cos-flex cos-items-center cos-space-mb-sm cos-justify-between">
                    <label>容器宽度 containerWidth（px）:</label>
                    <cos-input s-if="isPc" value="{=pcContainerWidth=}" size="md"/>
                    <cos-input s-else value="{=mobileContainerWidth=}" size="md"/>
                </div>
                <div class="cos-flex cos-items-center cos-space-mb-sm cos-justify-between">
                    <label>基准行高 rowHeight: </label>
                    <cos-select
                        options="{{rowHeightOptions}}"
                        value="{{rowHeight | stringFormat}}"
                        on-change="handleRowHeightChange"
                    >
                    </cos-select>
                </div>
                <div class="cos-flex cos-items-center cos-space-mb-sm cos-justify-between">
                    <label>最小列数 minCols: </label>
                    <cos-select
                        options="{{minColOptions}}"
                        value="{{rowMinCols | stringFormat}}"
                        on-change="handleMinColChange"
                    >
                    </cos-select>
                </div>
                <div class="cos-flex cos-items-center cos-space-mb-sm cos-justify-between">
                    <label>最大列数 maxCols: </label>
                    <cos-select
                        options="{{maxColOptions}}"
                        value="{{rowMaxCols | stringFormat}}"
                        on-change="handleMaxColChange"
                    >
                    </cos-select>
                </div>
                <div class="cos-flex cos-items-center cos-space-mb-sm cos-justify-between">
                    <label>间距 gutter: </label>
                    <cos-select
                        options="{{gutterOptions}}"
                        value="{{gutter | stringFormat}}"
                        on-change="handleGutterChange"
                    >
                    </cos-select>
                </div>
                <div class="cos-flex cos-items-center cos-space-mb-sm cos-justify-between">
                    <label>最后一行对齐方式 lastRowAlign: </label>
                    <cos-select
                        options="{{lastRowAlignOptions}}"
                        value="{{lastRowAlign}}"
                        on-change="handleLastRowAlignChange"
                    >
                    </cos-select>
                </div>
            </div>
            <cos-row-lanes
                items="{{items}}"
                container-width="{{containerWidth}}"
                gutter="{{gutter}}"
                row-height="{{rowHeight}}"
                min-cols="{{rowMinCols}}"
                max-cols="{{rowMaxCols}}"
                last-row-align="{{lastRowAlign}}"
            >
                <div
                    data-test-id="row-lanes-item"
                    class="card-item"
                >
                    <div
                        class="card-media"
                        style="height: {{rowHeight}}px; background-color: {{item.color}};"
                    >
                        <span class="card-index">{{item.index}}</span>
                    </div>
                    <div class="card-meta">
                        <div class="card-title">{{item.title}}</div>
                        <div class="card-desc">{{item.desc}}</div>
                    </div>
                </div>
            </cos-row-lanes>
        </div>
    `;

    static components = {
        'cos-row-lanes': RowLanes,
        'cos-input': Input,
        'cos-select': Select
    };

    static filters = {
        stringFormat(val) {
            return String(val);
        }
    }

    static computed = {
        containerWidth() {
            return this.data.get('isPc') ? this.data.get('pcContainerWidth') : this.data.get('mobileContainerWidth');
        }
    }

    initData() {
        return {
            items: [
                {
                    height: 300,
                    width: 400,
                    color: "#ff6b6b",
                    index: 1,
                    title: '风景图片',
                    desc: '美丽的自然风光'
                },
                {
                    height: 200,
                    width: 300,
                    color: "#4ecdc4",
                    index: 2,
                    title: '城市夜景',
                    desc: '繁华都市夜景'
                },
                {
                    height: 350,
                    width: 500,
                    color: "#45b7d1",
                    index: 3,
                    title: '海边日落',
                    desc: '浪漫的日落时分'
                },
                {
                    height: 180,
                    width: 280,
                    color: "#96ceb4",
                    index: 4,
                    title: '森林小径',
                    desc: '幽静的林间道路'
                },
                {
                    height: 240,
                    width: 320,
                    color: "#ffeaa7",
                    index: 5,
                    title: '山间云海',
                    desc: '壮观的云海景观'
                },
                {
                    height: 300,
                    width: 450,
                    color: "#dfe6e9",
                    index: 6,
                    title: '古镇风貌',
                    desc: '古朴的小镇街道'
                },
                {
                    height: 280,
                    width: 380,
                    color: "#fd79a8",
                    index: 7,
                    title: '花海盛开',
                    desc: '绚丽的花朵'
                },
                {
                    height: 320,
                    width: 420,
                    color: "#a29bfe",
                    index: 8,
                    title: '星空银河',
                    desc: '璀璨的星空'
                },
                {
                    height: 200,
                    width: 300,
                    color: "#00b894",
                    index: 9,
                    title: '溪流瀑布',
                    desc: '清澈的山泉'
                },
                {
                    height: 260,
                    width: 360,
                    color: "#e17055",
                    index: 10,
                    title: '沙漠风光',
                    desc: '金色的沙丘'
                },
                {
                    height: 400,
                    width: 600,
                    color: "#74b9ff",
                    index: 11,
                    title: '雪山美景',
                    desc: '白雪皑皑的山峰'
                },
                {
                    height: 220,
                    width: 300,
                    color: "#fdcb6e",
                    index: 12,
                    title: '田园风光',
                    desc: '宁静的乡村'
                },
            ],
            rowHeight: 180,
            rowMinCols: 2,
            rowMaxCols: 6,
            gutter: 4,
            pcContainerWidth: 800,
            mobileContainerWidth: 380,
            lastRowAlign: 'start',
            rowHeightOptions: [
                {
                    value: '120',
                    label: '120'
                },
                {
                    value: '150',
                    label: '150'
                },
                {
                    value: '180',
                    label: '180'
                },
                {
                    value: '200',
                    label: '200'
                },
            ],
            minColOptions: [
                {
                    value: '2',
                    label: '2'
                },
                {
                    value: '3',
                    label: '3'
                },
                {
                    value: '4',
                    label: '4'
                },
            ],
            maxColOptions: [
                {
                    value: '4',
                    label: '4'
                },
                {
                    value: '6',
                    label: '6'
                },
                {
                    value: '8',
                    label: '8'
                },
            ],
            gutterOptions: [
                {
                    value: '0',
                    label: '0'
                },
                {
                    value: '4',
                    label: '4'
                },
                {
                    value: '8',
                    label: '8'
                },
                {
                    value: '12',
                    label: '12'
                },
            ],
            lastRowAlignOptions: [
                {
                    value: 'start',
                    label: 'start'
                },
                {
                    value: 'justify',
                    label: 'justify'
                },
            ]
        };
    }

    handleRowHeightChange(val) {
        this.data.set('rowHeight', Number(val.value));
    }

    handleMinColChange(val) {
        this.data.set('rowMinCols', Number(val.value));
    }

    handleMaxColChange(val) {
        this.data.set('rowMaxCols', Number(val.value));
    }

    handleGutterChange(val) {
        this.data.set('gutter', Number(val.value));
    }

    handleLastRowAlignChange(val) {
        this.data.set('lastRowAlign', val.value);
    }

}

```
