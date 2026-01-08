```san export=preview caption=使用插槽
import {Component} from 'san';
import Input from '@cosui/cosmic/input';
import Button from '@cosui/cosmic/button';
import Avatar from '@cosui/cosmic/avatar';
import Select from '@cosui/cosmic/select';
import Icon from '@cosui/cosmic/icon';
import './slot.less';

export default class InputDemo extends Component {
    static template = `
        <template>
            <h4 class="cos-color-text-minor cos-font-regular">带下拉框</h4>
            <cos-input
                placeholder="占位文案"
            >
                <div slot="title" class="cos-text-body" on-click="stopPropogation">
                    <cos-select
                        options="{{options}}"
                        on-change="handleChange"
                    >
                        <div slot="entry">
                            <span>{{entryText}}</span>
                            <cos-icon name="{{openPanel ? 'up' : 'down'}}" />
                        </div>
                    </cos-select>
                </div>
            </cos-input>
            <h4 class="cos-color-text-minor cos-font-regular">内部带按钮</h4>
            <cos-input
                placeholder="占位文案"
            >
                <cos-button
                    slot="button"
                    size="sm"
                    appearance="secondary"
                    class="operation-button"
                >操作按钮</cos-button>
            </cos-input>
            <h4 class="cos-color-text-minor cos-font-regular">标题和按钮</h4>
            <cos-input
                clear
                maxlength="{{10}}"
                placeholder="占位文案"
            >
                <div slot="title" class="cos-text-body">四字标题</div>
                <cos-button
                    slot="button"
                    size="sm"
                    appearance="secondary"
                    class="operation-button"
                >操作按钮</cos-button>cos-button>
            </cos-input>
            <h4 class="cos-color-text-minor cos-font-regular">前缀和输入字数限制</h4>
            <cos-input
                count
                maxlength="{{10}}"
                placeholder="占位文案"
            >
                <cos-avatar
                    slot="prefix"
                    src="{{src}}"
                    size="sm"
                />
                <cos-button
                    slot="button"
                    size="sm"
                    appearance="secondary"
                    class="operation-button"
                >操作按钮</cos-button>
            </cos-input>
            <h4 class="cos-color-text-minor cos-font-regular">清空内容</h4>
            <cos-input
                clear
                count
                maxlength="{{10}}"
                placeholder="占位文案"
            >
                <div slot="title" class="cos-text-body">四字标题</div>
                <cos-button
                    slot="button"
                    size="sm"
                    appearance="secondary"
                    class="operation-button"
                >操作按钮</cos-button>
            </cos-input>
        </template>
    `;

    static components = {
        'cos-input': Input,
        'cos-button': Button,
        'cos-avatar': Avatar,
        'cos-select': Select,
        'cos-icon': Icon
    };

    initData() {
        return {
            openPanel: false,
            entryText: '筛选项',
            options: [{
                label: '选项1',
                value: 'option1'
            }, {
                label: '选项2',
                value: 'option2',
                disabled: true
            }, {
                label: '选项3',
                value: 'option3'
            }, {
                label: '选项4',
                value: 'option4'
            }],
            src: 'https://gimg3.baidu.com/topone/src=https%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F5d6034a85edf8db1cb13ede8e869ca54564e9358deae%3Fx-bce-process%3Dimage%2Fresize%2Cm_fill%2Cw_3335%2Ch_3335%2Calign_0%2Climit_0%2Fformat%2Cf_auto&refer=http%3A%2F%2Fwww.baidu.com&app=2011&size=w931&n=0&g=0n&er=404&q=75&fmt=auto&maxorilen2heic=2000000?sec=1738861200&t=6424728b507de8804f0680551f31c6be0'
        };
    }
    handleChange(event) {
        this.data.set('entryText', event.value);
    }
    stopPropogation(event) {
        event.stopPropagation();
        this.data.set('openPanel', !this.data.get('openPanel'));
    }
}

```
