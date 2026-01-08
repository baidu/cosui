```san export=preview  caption=单元格插槽
import {Component} from 'san';
import Table from '@cosui/cosmic/table';
import Avatar from '@cosui/cosmic/avatar';
import './basic.less';

export default class Basic extends Component {

    static template = `
        <div>
            <cos-table
                columns="{{columns}}"
                data="{{data}}"
            >
                <div slot="cell">
                    <!-- 如果数据包含图片，则显示图片 -->
                    <div s-if="row[column.prop] && row[column.prop].img" class="cos-flex cos-items-center">
                        <cos-avatar
                            src="{{row[column.prop].img}}"
                            size="md"
                        />
                        <span s-if="row[column.prop].name" class="cos-space-pl-xxs">{{row[column.prop].name}}</span>
                    </div>
                    <!-- 默认显示文本内容 -->
                    <span s-else>{{row[column.prop]}}</span>
                </div>
            </cos-table>
        </div>
    `;

    static components = {
        'cos-table': Table,
        'cos-avatar': Avatar
    };

    initData() {
        return {
            columns: [
                {
                    prop: "name",
                    title: "球员名称",
                    width: 150
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
                    name: {
                        name: '名字1',
                        img: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                    },
                    team: '湖人',
                    position: '前锋',
                    height: '2.06m',
                    weight: '113.4kg'
                },
                {
                    name: {
                        name: '名字2',
                        img: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                    },
                    team: '球队4',
                    position: '后卫',
                    height: '1.88m',
                    weight: '84.3kg'
                },
                {
                    // 纯文本，不显示图片
                    name: '名字3',
                    team: '太阳',
                    position: '前锋',
                    height: '2.08m',
                    weight: '109.8kg'
                },
                {
                    name: {
                        name: '名字4',
                        img: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                    },
                    team: '球队3',
                    position: '中锋',
                    height: '2.11m',
                    weight: '129.3kg'
                }
            ]
        };
    }
}
```