```san export=preview  caption=表头插槽
import {Component} from 'san';
import Table from '@cosui/cosmic/table';
import Tooltip from '@cosui/cosmic/tooltip';
import Icon from '@cosui/cosmic/icon';
import './basic.less';

export default class Basic extends Component {

    static template = `
        <div>
            <cos-table
                columns="{{columns}}"
                data="{{data}}"
                on-row-click="handleRowClick"
                on-cell-click="handleCellClick"
            >
                <div slot="header">
                    <span>{{column.title}}</span>
                    <cos-tooltip
                        s-if="column.tip"
                        content="{{column.tip}}"
                    >
                        <cos-icon name="question-circle" />
                    </cos-tooltip>
                </div>
                <div slot="name" class="cos-flex cos-items-center">
                    <div class="cos-flex cos-flex-col cos-space-pl-xxs cos-line-clamp-1">
                        <div>{{row.name}}</div>
                        <div class="cos-space-pt-xxs cos-color-text-slim">
                            {{row.nickname}}
                        </div>
                    </div>
                </div>
            </cos-table>
        </div>
    `;

    static components = {
        'cos-table': Table,
        'cos-tooltip': Tooltip,
        'cos-icon': Icon
    };

    initData() {
        return {
            columns: [
                {
                    prop: "name",
                    title: "球员名称",
                    width: 100
                },
                {
                    prop: "team",
                    title: "球队",
                    align: 'center',
                    width: '0.9rem'
                },
                {
                    prop: "position",
                    title: "位置",
                    align: 'center',
                    width: 80,
                    tip: '足球位置，如前锋、中场、后卫等'
                },
                {
                    prop: "height",
                    title: "身高",
                    align: 'center',
                    width: 70
                },
                {
                    prop: "weight",
                    title: "体重",
                    align: 'center',
                    width: 70
                }
            ],
            data: [
                {
                    name: '名字·名字',
                    nickname: 'Ty Tom',
                    src: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    team: '球队1',
                    position: '前锋',
                    height: 2.06,
                    weight: 95.3
                },
                {
                    name: '名字·名字',
                    nickname: 'Ty Tom',
                    src: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    team: '球队2',
                    position: '后卫',
                    height: 1.88,
                    weight: 94.3
                },
                {
                    name: '名字·名字',
                    nickname: 'Ty Tom',
                    src: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    team: '球队3',
                    position: '后卫',
                    height: 1.96,
                    weight: 109.8
                },
                {
                    name: '名字·名字',
                    nickname: 'Ty Tom',
                    src: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    team: '球队4',
                    position: '中锋',
                    height: 1.9,
                    weight: 113.4
                }
            ]
        };
    }

    handleRowClick(e) {
        console.log('row[' + e.index + '] be click!');
    }

    handleCellClick(e) {
        console.log('cell[' + e.rowIndex + '][' + e.columnIndex + '] be click!');
    }
}
```
