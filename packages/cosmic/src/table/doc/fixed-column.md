```san export=preview  caption=固定列
import {Component} from 'san';
import Table from '@cosui/cosmic/table';
import Avatar from '@cosui/cosmic/avatar';

export default class FixedColumn extends Component {

    static template = `
        <div data-testid="fixed-column">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">1. 由于固定列侧阴影需要根据表格实际内容宽度与滚动容器宽度（CSR 之后通过获取 dom 获取得到）计算得出，因此阴影效果可能会存在延迟。</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">2. 当有某一列需要固定时，必须所有列都设置列宽（columns[i].width），否则可能导致滚动固定列贴边距离计算错误。</h4>
            <cos-table
                columns="{{columns}}"
                data="{{data}}"
            >
                <div slot="name" class="cos-flex cos-items-center">
                    <cos-avatar
                        src="{{row.src}}"
                        size="md"
                    />
                    <div class="cos-flex cos-flex-col cos-space-pl-xxs">
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
        'cos-avatar': Avatar
    };

    initData() {
        return {
            columns: [
                {
                    prop: "name",
                    title: "球员名称",
                    width: 150,
                    fixed: true
                },
                {
                    prop: "team",
                    title: "球队",
                    align: 'center',
                    width: 120
                },
                {
                    prop: "position",
                    title: "位置",
                    align: 'center',
                    width: 120
                },
                {
                    prop: "height",
                    title: "身高",
                    align: 'center',
                    width: 120
                },
                {
                    prop: "weight",
                    title: "体重",
                    align: 'center',
                    width: 120,
                    fixed: true
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
}
```
