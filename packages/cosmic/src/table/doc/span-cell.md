```san export=preview  caption=合并单元格
import {Component} from 'san';
import Table from '@cosui/cosmic/table';

export default class SpanCell extends Component {

    static template = `
        <div data-testid="span-cell">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">被合并的单元格需设置 rowspan 或 colspan 为 0，即此单元格不会渲染。</h4>
            <cos-table
                layout="auto"
                border="all"
                striped="{{false}}"
                columns="{{columns}}"
                data="{{data}}"
            />
        </div>
    `;

    static components = {
        'cos-table': Table
    };

    initData() {
        return {
            columns: [
                {
                    prop: 'stage',
                    title: '阶段',
                    colspan: (value, row, rowIndex) => {
                        if (rowIndex === 5) {
                            return 5;
                        }
                        return 1;
                    },
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
                        else {
                            return 1;
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
                        else {
                            return 1;
                        }
                    },
                    colspan: (value, row, rowIndex) => {
                        if (rowIndex === 5) {
                            return 0;
                        }
                        return 1;
                    }
                }
            ],
            data: [
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
}
```
