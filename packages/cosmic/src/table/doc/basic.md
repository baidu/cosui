```san export=preview  caption=基本使用
import {Component} from 'san';
import Table from '@cosui/cosmic/table';
import Avatar from '@cosui/cosmic/avatar';
import './basic.less';

export default class Basic extends Component {

    static template = `
        <div data-testid="basic-table">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">自定义布局</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">表格会自适应内容撑开，建议对内容做好宽度限制和溢出隐藏。</h4>
            <cos-table
                layout="auto"
                columns="{{columns}}"
                data="{{data}}"
                on-row-click="handleRowClick"
                on-cell-click="handleCellClick"
            >
                <div slot="name" class="cos-flex cos-items-center">
                    <cos-avatar
                        src="{{row.src}}"
                        size="md"
                    />
                    <div class="cos-flex cos-flex-col cos-space-pl-xxs cos-line-clamp-1">
                        <div>{{row.name}}</div>
                        <div class="cos-space-pt-xxs cos-color-text-slim">
                            {{row.nickname}}
                        </div>
                    </div>
                </div>
            </cos-table>

            <br />
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">无边框 + 固定列宽</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">列宽固定，建议对内容做好宽度限制和溢出隐藏。</h4>
            <cos-table
                class="custom-border"
                columns="{{contentColumns}}"
                data="{{contentData}}"
                striped="{{false}}"
            />

            <br />
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">表头行边框</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">可根据场景，通过暴露的 Parts 自定义隐藏表头行边框。</h4>
            <cos-table
                class="custom-border custom-border-head"
                columns="{{contentColumns}}"
                data="{{contentData}}"
                border="row"
                striped="{{false}}"
            />

            <br />
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">表内容行边框</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">可根据场景，通过暴露的 Parts 自定义隐藏表内容行边框。</h4>
            <cos-table
                class="custom-border custom-border-body"
                columns="{{contentColumns}}"
                data="{{contentData}}"
                border="row"
                striped="{{false}}"
            />
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
                    width: 100,
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
                    width: 80
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
            contentColumns: [
                {
                    prop: "table1",
                    title: "表头1",
                    width: 150
                },
                {
                    prop: "table2",
                    title: "表头2",
                    width: 100,
                    align: 'center'
                },
                {
                    prop: "table3",
                    title: "表头3",
                    width: 100,
                    align: 'center'
                },
                {
                    prop: "table4",
                    title: "表头4",
                    width: 60,
                    content: value => {
                        if (!value) {
                            return '';
                        }

                        const date = new Date(value);
                        return date.getMonth() + 1 + '月';
                    },
                    align: 'center'
                },
                {
                    prop: "table5",
                    title: "表头5",
                    width: 150
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
            ],
            contentData: [
                {
                    table1: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    table2: '标题',
                    table3: '摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要',
                    table4: 1721222703033,
                    table5: '详细信息内容描述详细信息内容描述'
                },
                {
                    table1: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    table2: '标题',
                    table3: '摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要',
                    table4: 1725235200000,
                    table5: '详细信息内容描述详细信息内容描述'
                },
                {
                    table1: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    table2: '标题',
                    table3: '摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要',
                    table4: 1706832000000,
                    table5: '详细信息内容描述详细信息内容描述'
                },
                {
                    table1: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    table2: '标题',
                    table3: '摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要',
                    table4: 1712016000000,
                    table5: '详细信息内容描述详细信息内容描述'
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
