```san export=preview  caption=E2E测试用例
import {Component} from 'san';
import Table from '@cosui/cosmic/table';
import Button from '@cosui/cosmic/button';

export default class E2ETest extends Component {

    static template = `
        <div data-testid="test-case">
            <h3>动态销毁表格组件</h3>
            <div class="remove-table">
                <cos-table
                    s-if="isRemoved"
                    columns="{{columns}}"
                    data="{{data}}"
                />
                <cos-button
                    appearance="secondary"
                    on-click="removeTable"
                >
                    销毁表格组件
                </cos-button>
            </div>

            <br />
            <h3>缺失 column.prop 属性</h3>
            <div class="reset-prop">
                <cos-table
                    columns="{{resetColumns}}"
                    data="{{data}}"
                />
                <cos-button
                    appearance="secondary"
                    on-click="changeColumnProps"
                >
                    修改 column.prop 属性
                </cos-button>
            </div>

            <br />
            <h3>非合法 column</h3>
            <div class="illegality-prop">
                <cos-table
                    columns="123"
                    data="456"
                />
            </div>

            <br />
            <h3>固定列但整表宽度未超出容器宽度</h3>
            <div class="unwidth">
                <cos-table
                    columns="{{fixedColumns}}"
                    data="{{data}}"
                />
            </div>

            <br />
            <h3>非 function 类型的 rowspan/colspan </h3>
            <div class="not-func-span">
                <cos-table
                    striped="{{false}}"
                    border="all"
                    columns="{{spanColumns}}"
                    data="{{spanData}}"
                />
            </div>
        </div>
    `;

    static components = {
        'cos-table': Table,
        'cos-button': Button
    };

    initData() {
        return {
            isRemoved: true,
            columns: [
                {
                    prop: "table1",
                    title: "表头1",
                    width: 150
                },
                {
                    prop: "table2",
                    title: "表头2",
                    width: 100
                },
                {
                    prop: "table3",
                    title: "表头3",
                    width: 100
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
                    }
                },
                {
                    prop: "table5",
                    title: "表头5",
                    width: 150
                }
            ],
            resetColumns: [
                {
                    prop: "table1",
                    title: "表头1",
                    width: 150
                },
                {
                    prop: "table2",
                    title: "表头2",
                    width: 100
                },
                {
                    prop: "table3",
                    title: "表头3",
                    width: 100
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
                    }
                },
                {
                    prop: "table5",
                    title: "表头5",
                    width: 150
                }
            ],
            fixedColumns: [
                {
                    prop: "table1",
                    title: "表头1",
                    width: '1rem',
                    fixed: true
                },
                {
                    prop: "table2",
                    title: "表头2",
                    fixed: true
                }
            ],
            spanColumns: [
                {
                    prop: 'stage',
                    title: '阶段',
                    rowspan: 1,
                    colspan: 1
                },
                {
                    prop: 'time',
                    title: '时间',
                    rowspan: (value, row, rowIndex) => {
                        // 第一行和第二行合并
                        if (rowIndex === 0) {
                            return 2;
                        }
                        // 第二行隐藏
                        else if (rowIndex === 1) {
                            return 0;
                        }
                    },
                    colspan: (value, row, rowIndex) => {
                        if (rowIndex === 5) {
                            return 0;
                        }
                        return 1;
                    }
                },
                {
                    prop: 'position',
                    title: '地点',
                    rowspan: (value, row, rowIndex) => {
                        // 第一行和第二行合并
                        if (rowIndex === 0) {
                            return 2;
                        }
                        // 第二行隐藏
                        else if (rowIndex === 1) {
                            return 0;
                        }
                        // 第三、四、五行合并
                        else if (rowIndex === 2) {
                            return 3;
                        }
                        // 第四、五行隐藏
                        else if (rowIndex === 3 || rowIndex === 4) {
                            return 0;
                        }
                    },
                    colspan: (value, row, rowIndex) => {
                        if (rowIndex === 5) {
                            return 0;
                        }
                    }
                }
            ],
            data: [
                {
                    table1: '内容',
                    table2: '标题',
                    table3: '摘要摘要',
                    table4: 1721222703033,
                    table5: '详细信息内容描述'
                },
                {
                    table1: '内容',
                    table2: '标题',
                    table3: '摘要摘要',
                    table4: 1725235200000,
                    table5: '详细信息内容描述'
                },
                {
                    table1: '内容',
                    table2: '标题',
                    table3: '摘要摘要',
                    table4: 1706832000000,
                    table5: '详细信息内容描述'
                },
                {
                    table1: '内容',
                    table2: '标题',
                    table3: '摘要摘要',
                    table4: 1712016000000,
                    table5: '详细信息内容描述'
                }
            ],
            spanData: [
                {
                    stage: '瑞士轮',
                    time: '2023年10月10日-15日',
                    position: '体育馆1'
                },
                {
                    stage: '入围赛',
                    time: '2023年10月10日-15日',
                    position: '体育馆1'
                },
                {
                    stage: '四分之一决赛',
                    time: '2023年10月19日-23日',
                    position: '体育馆2'
                },
                {
                    stage: '半决赛',
                    time: '2023年10月26日-29日',
                    position: '体育馆2'
                },
                {
                    stage: '决赛',
                    time: '2023年11月2日-5日',
                    position: '体育馆2'
                },
                {
                    stage: '赛事回顾'
                }
            ]
        };
    }

    removeTable() {
        this.data.set('isRemoved', false);
    }

    changeColumnProps() {
        this.data.set('resetColumns[0].prop', '');
    }
}
```