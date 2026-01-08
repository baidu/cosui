/**
 * @file select/DropdownMenu
 * @author
 */
import {Component} from 'san';
import {
    defaultFilterFn,
    dropdownPrefixCls,
    getMapKey,
    getPropValue,
    prefixCls,
    preventDefaultEvent,
    toTitle,
    isValueArray,
    isValueArrayOrString,
    KeyCode
} from './util';
import Select from './select';
import {
    DropdownMenuState as State,
    DropdownComputed as Computed,
    BaseContext,
    RawValueType,
    TMenuItem
} from './interface';


const formatOptionInfo = (option: Component, optionsInfo: BaseContext['optionsInfo']) => {
    const value = option.data.get('value');
    const info = optionsInfo?.[getMapKey(value)];
    return {
        content: (option.el as Element).innerHTML.trim(),
        title: toTitle(info.title),
        value,
        disabled: info.disabled
    };
};

const filterOption = (
    input: string,
    child: any,
    context: BaseContext,
    defaultFilter = defaultFilterFn
) => {
    const {backfillValue, value} = context;
    const lastValue = isValueArrayOrString(value) && value[value.length  - 1];
    if (!input || (lastValue && lastValue === backfillValue)) {
        return true;
    }

    let filterFn;
    if ('filterOption' in context) {
        if (filterFn === true) {
            filterFn = defaultFilter;
        }
        else {
            filterFn = context.filterOption;
        }
    }
    else {
        filterFn = defaultFilter;
    }

    if (!filterFn) {
        return true;
    }
    else if (typeof filterFn === 'function') {
        return filterFn(input, child, context.optionFilterProp);
    }
    else if (child.data.get('disabled')) {
        return false;
    }
    else {
        return true;
    }
};

export default class DropdownMenu extends Component {
    static template = `
        <div
            s-show="visible"
            class="cos-web-header-search-dropdown"
            style="overflow: auto; transform: translateZ(0);"
            on-mousedown="preventDefaultEvent"
            on-mouseleave="handleMouseLeave"
        >
           <ul class="cos-web-header-search-dropdown-menu" on-click="handleClick">
                <template s-for="item, index in menuItems" s-key="item.value">
                    <li s-if="{{item.value !== '/practices/design-token/practices'}}" data-index="{{index}}"
                    class="cos-web-header-search-dropdown-menu-item {{item | getItemClass(activeKey)}}">
                        {{item.content | raw}}
                    </li>
                </template>
           </ul>
        </div>
    `;
    static computed: Computed = {
        menuItems(this: DropdownMenu) {
            const context = this.data.get('context');
            const {options, optionsInfo, notFoundContent} = context;
            const inputValue = this.data.get('inputValue');
            let menuItems: TMenuItem[] | undefined
                = options?.filter(option => filterOption(inputValue, option, context))
                    .map(option => formatOptionInfo(option, optionsInfo));

            if (!menuItems?.length && (notFoundContent || notFoundContent === undefined)) {
                return [{
                    content: '',
                    disabled: true,
                    empty: true,
                    value: 'NOT_FOUND'
                }];
            }
            return menuItems;
        },

        selectedKeys(this: DropdownMenu) {
            let selectedKeys: RawValueType[] = [];
            const value = this.data.get('context.value');
            if (value === null || value === undefined) {
                return [];
            }

            const options = this.data.get('context.options');
            options?.forEach(item => {
                const itemValue = item.data.get('value');
                if (isValueArray(value) && itemValue !== undefined && value.includes(itemValue)) {
                    selectedKeys.push(itemValue);
                }
            });

            return selectedKeys;
        }
    };

    static filters = {
        getItemClass(item: TMenuItem, activeKey: string) {
            let klass = `${prefixCls}-unselectable`;

            if (item.value === activeKey) {
                klass += ` ${dropdownPrefixCls}-menu-item-active`;
            }
            return klass;
        }
    };

    initData(): State {
        return {
            activeKey: '',
            context: {},
            inputValue: ''
        };
    }

    inited() {
        this.resetActiveKey();

        this.owner.watch('realOpen', open => {
            if (open) {
                this.resetActiveKey();
            }
        });

        this.owner.watch('inputValue', value => {
            this.data.set('activeKey', value);
        });
    }

    getActiveItem() {
        const activeKey = this.data.get('activeKey');
        if (!activeKey) {
            return null;
        }

        const menuItems = this.data.get('menuItems')?.filter(item => !item.disabled && item.value === activeKey);

        return menuItems?.length ? menuItems[0] : null;
    }

    resetActiveKey() {
        let activeKey = '';
        const {menuItems, selectedKeys} = this.data.get();

        if (selectedKeys?.length) {
            activeKey = selectedKeys[0] as string;
        }
        else if (this.owner.data.get('defaultActiveFirstOption')) {
            const tmpArr = menuItems?.filter(item => !item.disabled);

            if (tmpArr?.length) {
                activeKey = tmpArr[0].value as string;
            }
        }

        this.data.set('activeKey', activeKey);
    }

    // direction: -1 UP, 1 DOWN
    updateActiveKey(activeItem: TMenuItem | null = null, direction = 0) {
        let activeKey = '';
        const menuItems = this.data.get('menuItems')?.filter(item => !item.disabled);

        if (menuItems?.length) {
            if (!activeItem) {
                activeKey = menuItems[0].value as string;
            }
            else if (direction) {
                let max = menuItems.length - 1;
                let index = menuItems.findIndex(item => item.value === activeItem.value);

                if (index >= 0) {
                    index += direction;

                    if (index < 0) {
                        index = max;
                    }
                    else if (index > max) {
                        index = 0;
                    }

                    activeKey = menuItems[index].value as string;
                }
            }

            this.data.set('activeKey', activeKey);
        }
    }

    handleMenuDeselect({item}: {item: any}) {
        const value = item.value || item.data.get('value');
        const owner = this.owner as Select;

        owner.removeSelected(value);

        const autoClearSearchValue = this.data.get('context.autoClearSearchValue');
        if (autoClearSearchValue) {
            owner.setInputValue('');
        }
    }

    handleKeyDown(e: KeyboardEvent, callback: (item: TMenuItem | null) => void) {
        const keyCode = e.keyCode;
        let activeItem = this.getActiveItem();

        if (keyCode === KeyCode.ENTER) {
            if (activeItem) {
                const modeConfig = this.data.get('context.modeConfig');
                if (modeConfig?.single) {
                    this.handleMenuSelect({item: activeItem});
                }
                else if (modeConfig?.tags || modeConfig?.multiple) {
                    const selectedKeys = this.data.get('selectedKeys');

                    if (activeItem.value && selectedKeys.indexOf(activeItem.value) >= 0) {
                        this.handleMenuDeselect({item: activeItem});
                    }
                    else {
                        this.handleMenuSelect({item: activeItem});
                    }
                }
            }
            return;
        }

        if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
            this.updateActiveKey(activeItem, keyCode === KeyCode.UP ? -1 : 1);
            e.preventDefault();

            if (typeof callback === 'function') {
                callback(this.getActiveItem());
            }
        }
    }

    handleMenuSelect({item}: {item: any}) {
        if (!item) {
            return;
        }

        const context = this.data.get('context');
        let skipTrigger = false;
        let {
            autoClearSearchValue,
            backfillValue,
            modeConfig,
            value
        } = context;

        const selectedValue: string = item.value || item.data.get('value') || item.data.get('key');
        const lastValue = isValueArrayOrString(value) && value[value.length - 1];
        const owner = this.owner as Select;
        const optionLabelProp = owner.getOptionLabelProp(context);

        if (
            !modeConfig?.combobox
            && lastValue !== undefined
            && lastValue === selectedValue
            && selectedValue !== backfillValue
        ) {
            skipTrigger = true;
        }
        else {
            value = [selectedValue];
        }

        owner.setOpenState(false, {
            needFocus: true,
            fireSearch: false
        });

        if (!skipTrigger) {
            owner.fireChange(value);
        }
        owner.fireSelect(selectedValue);

        if (!skipTrigger) {
            const inputValue = modeConfig?.combobox ? getPropValue(item, optionLabelProp) : '';

            if (autoClearSearchValue) {
                owner.setInputValue(inputValue, false);
            }
            else {
                owner.setInputValue(selectedValue, true);
            }
        }
    }

    handleClick(e) {
        e.stopPropagation();
        const index = (e.target as HTMLElement).closest('li').dataset.index;
        if (!index) {
            return;
        }
        const menuItems = this.data.get('menuItems');
        const item = menuItems?.[+index];
        if (!item) {
            return;
        }
        this.handleMenuSelect({item});
    }
    preventDefaultEvent = preventDefaultEvent;
};
