``` san export=preview caption=Masonry
import {Component} from 'san';
import Masonry from '@cosui/cosmic/masonry';
import Input from '@cosui/cosmic/input';
import Select from '@cosui/cosmic/select';
import './basic.less';

export default class Default extends Component {

    static template = `
        <div class="masonry"> 
            <div class="demo-controller">
                <div class="cos-flex cos-items-center cos-space-mb-sm cos-justify-between">
                    <label>容器宽度 containerWidth（px）:</label>
                    <cos-input s-if="isPc" value="{=pcContainerWidth=}" size="md"/>
                    <cos-input s-else value="{=mobileContainerWidth=}" size="md"/>
                </div>
                <div class="cos-flex cos-items-center cos-space-mb-sm cos-justify-between">
                    <label>瀑布流列数 columnCount: </label>
                    <cos-select
                        options="{{columnCountOptions}}"
                        value="{{columnCount | stringFormat}}"
                        on-change="handleColumnCountChange"
                    >
                    </cos-select>
                </div>
                <div class="cos-flex cos-items-center cos-space-mb-sm cos-justify-between">
                    <label>瀑布流元素间距 columnCount: </label>
                    <cos-select
                        options="{{gutterOptions}}"
                        value="{{gutter | stringFormat}}"
                        on-change="handleGutterChange"
                    >
                    </cos-select>
                </div>
            </div>
            <cos-masonry
                items="{{items}}"
                column-count="{{columnCount}}"
                gutter="{{gutter}}"
                container-width="{{containerWidth}}"
            >
                <div
                    data-test-id="masonry-item"
                    class="cos-flex cos-items-center cos-justify-center"
                    style="height: 100%; background-color: {{item.color}};"
                >
                   {{item.content}}
                </div>
            </cos-masonry>
        </div>
    `;

    static components = {
        'cos-masonry': Masonry,
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
                    height: 889,
                    width: 500,
                    color: "#8A73FF",
                    content: '第一项'
                },
                {
                    height: 1200,
                    width: 800,
                    color: "#00B5F2",
                    content: '第二项'
                },
                 {
                    height: 500,
                    width: 500,
                    color: "#3FC746",
                    content: '第三项'
                },
                {
                    height: 700,
                    width: 500,
                    color: "#91D543",
                    content: '第四项'
                },
                {
                    height: 734,
                    width: 500,
                    color: "#FFCB00",
                    content: '第五项'
                },
                {
                    height: 1406,
                    width: 800,
                    color: "#FF8200",
                    content: '第六项'
                },
                {
                    height: 300,
                    width: 300,
                    color: "#FF471A",
                    content: '第七项'
                },
                {
                    height: 1069,
                    width: 800,
                    color: "#00B5F2",
                    content: '第八项'
                },
                {
                    height: 621,
                    width: 500,
                    color: "#3FC746",
                    content: '第九项'
                },
                {
                    height: 300,
                    width: 300,
                    color: "#FF471A",
                    content: '第十项'
                },
                {
                    height: 1202,
                    width: 800,
                    color: "#91D543",
                    content: '第十一项'
                },
                {
                    height: 690,
                    width: 500,
                    color: "#FFCB00",
                    content: '第十二项'
                },
            ],
            columnCount: 2,
            gutter: 5,
            pcContainerWidth: 490,
            mobileContainerWidth: 380,
            columnCountOptions: [
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
            gutterOptions: [
                {
                    value: '3',
                    label: '3'
                },
                {
                    value: '5',
                    label: '5'
                },
                {
                    value: '7',
                    label: '7'
                },
            ]
        };
    }
     handleColumnCountChange(val) {
        this.data.set('columnCount', Number(val.value));
    }

    handleGutterChange(val) {
        this.data.set('gutter', Number(val.value));
    }

}

```
