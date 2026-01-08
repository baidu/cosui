import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Transition from './transition.san';

// 色板排序顺序
const ColorsOrder = [
    'red',
    'orange',
    'tan',
    'amber',
    'yellow',
    'lime',
    'verdure',
    'green',
    'virid',
    'teal',
    'cyan',
    'ocean',
    'sky',
    'blue',
    'indigo',
    'dutch',
    'purple',
    'violet',
    'fuchsia',
    'cherry',
    'pink',
    'gray',
    'brand-dqa',
    'brand-preferred',
    'brand-search'
];


export default class TokenWidget extends Component {
    // eslint-disable-next-line
    static template = /*html*/`
        <div>
            <md-transition s-if="{{easing && duration}}" easingOptions="{{easing}}" durationOptions="{{duration}}" />
            <section s-else class="md-token-widget-table-wrapper">
                <div s-if="attr==='platte" class="platte-container">
                    <div s-for="rowData in list" class="color-picker-card" >
                        <div class="color-picker-card-head" style="background: {{rowData[5].value}}">
                            <div class="color-picker-card-title">{{capitalizeFirstLetter(rowData[5].color)}}</div>
                            <div class="color-picker-card-head-sample">
                                <span>{{rowData[5].key}}</span>
                                <span>{{rowData[5].value}}</span>
                            </div>
                        </div>
                        <div class="color-body">
                            <div s-for="item, index in rowData"
                                class="color-picker-card-item {{
                                index < 5? 'cos-color-text' : 'cos-color-text-inverse'}}"
                                style="background: {{item.value}}"
                                on-click="copyColorTokenName(item.key, index)"
                            >
                                <span>{{item.key}}
                                    <span s-if="index === copyStatus.index && item.key === copyStatus.rowKey">
                                        已复制</span>
                                </span>
                                <span>{{item.value}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <table s-else>
                    <!-- table header -->
                    <tr s-if="head !== 'false'" s-for="tableHeaderRow in tableHeaderList"
                        class="md-token-widget-head-column">
                        <th
                            s-for="headerName in tableHeaderRow"
                            class="{{getCustomHeaderClass(headerName)}}"
                            rowspan="{{getTableHeaderRowspan(headerName)}}"
                            colspan="{{getTableHeaderColspan(headerName)}}"
                        >
                            {{headerName}}
                        </th>
                    </tr>

                    <!-- table body -->
                    <tr s-for="rowData, index in list">
                        <template s-for="rowKey in getTableRowTypes(rowData)">
                            <!-- 渲染语义和变量的 name -->
                            <td
                                class="{{getCustomKeyClass(rowKey)}}"
                                rowspan="{{getRowspan(rowData.data[rowKey])}}"
                            >
                                <div
                                    class="md-token-widget-token-name"
                                    on-click="copyTokenName(rowData.data[rowKey], index, rowKey)"
                                >
                                    <div class="token-name
                                        {{!showDiff? '' : isShowDiff(rowData)? 'cos-color-bg-primary-light':''}}"
                                    >
                                        {{getDisplayKey(rowData.data[rowKey], rowKey, 1)}}
                                    </div>
                                    <div s-if="getDisplayKey(rowData.data[rowKey], rowKey, 1) !== '/' "
                                        class="md-token-widget-token-name-container"
                                    >
                                        <div class="md-token-widget-copy-content">
                                            <div s-if="index === copyStatus.index
                                                && rowKey === copyStatus.rowKey
                                                && !copyStatus.mode"
                                                class="md-token-widget-copy-status"
                                            >
                                                <cos-icon name="check"/>已复制
                                            </div>
                                            <div s-else class="md-token-widget-copy-icon" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <!-- 根据 mode 渲染语义和变量的 value，如日间、暗黑、pc -->
                            <td
                                s-if="rowData.data[rowKey]"
                                s-for="mode in getTableRowTypes(rowData.data[rowKey])"
                                class="{{getCustomValueClass(rowData, rowKey)}}"
                                rowspan="{{getRowspan(rowData.data[rowKey])}}"
                            >
                                <span
                                    s-if="(attr === 'color' || attr === 'platte') && rowKey === 'var'"
                                    class="md-token-widget-color-block "
                                    style="background: {{rowData.data[rowKey].data[mode].$value}}"
                                ></span>
                                <div
                                    class="{{
                                        rowKey === 'var'
                                        ? 'md-token-widget-token-name'
                                        : 'md-token-widget-token-value'}}{{
                                        attr !== 'color' && rowKey !== 'var'
                                        ? ' md-token-widget-token-value-copy' : ''}}"
                                    on-click="copyTokenName(rowData.data[rowKey], index, rowKey, mode)"
                                >
                                    {{getDisplayValue(rowData.data[rowKey], mode, rowKey)}}
                                    <div s-if="getDisplayKey(rowData.data[rowKey], rowKey, 1) !== '/'
                                        && rowKey !== 'var'"
                                        class="md-token-widget-token-name-container"
                                    >
                                        <div class="md-token-widget-copy-content">
                                            <div s-if="index === copyStatus.index
                                                && rowKey === copyStatus.rowKey
                                                && copyStatus.mode && mode === copyStatus.mode" 
                                                class="md-token-widget-copy-status" 
                                            >
                                                <cos-icon name="check"/>已复制
                                            </div>
                                            <div s-else class="md-token-widget-copy-icon" />
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <!-- 空白 var cell -->
                            <template s-if="isEmptyVarRow(rowData)">
                                <td s-for="empryData in emptyVarCols">{{empryData}}</td>
                            </template>
                        </template>
                    </tr>
                </table>
            </section>
        </div>
    `;

    static computed = {
        displayPrefix(this: TokenWidget): string {
            const prefix = this.data.get('prefix');
            switch (prefix) {
                case 'cos-dqa':
                case 'cos-shop':
                case 'cos-education':
                case 'cos-medical': {
                    return 'cos';
                }
                default: {
                    return prefix;
                }
            }
        },

        displayAttr(this: TokenWidget): string {
            const attr = this.data.get('attr');
            switch (attr) {
                case 'platte': {
                    return '';
                }
                default: {
                    return attr;
                }
            }
        },

        tableHeaderList(this: TokenWidget): string[][] {
            const attr = this.data.get('attr');
            const list: string[][] = [];
            const nameList: string[] = [];
            const valueList: string[] = [];

            // 处理名称的表头列
            switch (attr) {
                case 'platte': {
                    nameList.push('变量名称', '变量数值');
                    break;
                }
                case 'easing':
                case 'duration': {
                    nameList.push('语义名称', '样式', '变量名称', '变量数值');
                    break;
                }
                case 'lineclamp':
                case 'flexbox': {
                    nameList.push('语义名称', '样式');
                    break;
                }
                default: {
                    nameList.push('语义名称', '样式', '变量名称', '变量数值');
                }
            }

            // 处理数值的表头列
            switch (attr) {
                case 'color': {
                    valueList.push('Mobile / 日', 'Mobile / 暗', 'PC');
                    break;
                }
                case 'text':
                case 'rounded':
                case 'space': {
                    valueList.push('Mobile', 'PC');
                    break;
                }
            }

            list.push(nameList);
            if (valueList.length > 0) {
                list.push(valueList);
            }
            return list;
        },

        emptyVarCols(this: TokenWidget) {
            const attr = this.data.get('attr');
            switch (attr) {
                case 'text': {
                    return new Array(3).fill('/');
                }
                default: {
                    return [];
                }
            }
        }
    };

    static components = {
        'cos-icon': Icon,
        'md-transition': Transition
    };
    resource: object;
    tokens: object;
    resourceFn: (e: any) => void;
    businessFn: EventListenerOrEventListenerObject;
    showDiffFn: EventListenerOrEventListenerObject;

    initData() {
        return {
            business: 'cosmic',
            mode: 'day', // 默认模式
            prefix: 'cos', // 默认前缀
            attr: 'color', // 默认属性
            include: '', // 名称过滤器 不含 prefix attr
            exclude: '', // 名称过滤器 不含 prefix attr
            order: '', // 多重排序，按照包含字符的顺序来排，支持多维度，因为是一轮一轮排 'tiny|minor|slim|inverse'
            copyStatus: {
                index: -1,
                rowKey: ''
            },
            isColorPicker: false,
            colors: [],
            diff: false, // 是否计算差异
            diffMap: new Map(), // 差异数据
            showDiff: false, // 由外层控制显示差异
            head: true // 是否显示表头
        };
    }

    async attached() {
        const mdRoot = document.getElementById('mdRoot');
        this.resourceFn = e => {
            this.tokens = (e as CustomEvent).detail;
            this.renderPage('cosmic');
        };
        mdRoot?.addEventListener('init-resource', this.resourceFn);

        this.businessFn = e => {
            const params = (e as CustomEvent).detail;
            this.tokens = params.resource;
            this.renderPage(params.business);
        };

        mdRoot?.addEventListener('business-change', this.businessFn);
        if (this.data.get('diff')) {
            this.showDiffFn = () => {
                this.data.set('showDiff', !this.data.get('showDiff'));
            };
            mdRoot?.addEventListener('show-filter', this.showDiffFn);
        }
    }

    detach(): void {
        const mdRoot = document.getElementById('mdRoot');
        mdRoot?.removeEventListener('init-resource', this.resourceFn);
        mdRoot?.removeEventListener('business-change', this.businessFn);
        this.showDiffFn && mdRoot?.removeEventListener('show-filter', this.showDiffFn);
    }

    getTransition() {
        ['easing', 'duration'].forEach(async item => {
            let tokensObj = this.tokens?.day?.cos?.[item];
            let tokens: Array<{ value: string, label: string }> = [];
            Object.keys(tokensObj).forEach(token => {
                tokens.push({
                    value: `var(--${token})`,
                    label: token
                });
            });
            this.data.set(`${item}`, tokens);
        });
    }
    getTableHeaderRowspan(headerName: string) {
        const tableHeaderList = this.data.get('tableHeaderList');
        const tableHeaderLen = tableHeaderList.length;
        if (tableHeaderLen === 2) {
            switch (headerName) {
                case '语义名称':
                case '样式':
                case '变量名称': {
                    return 2;
                }
                case '变量数值': {
                    return 1;
                }
            }
        }
        return 1;
    }

    getTableHeaderColspan(headerName: string) {
        const tableHeaderList = this.data.get('tableHeaderList');
        const tableHeaderLen = tableHeaderList.length;
        if (tableHeaderLen === 2) {
            const valueList = tableHeaderList[1];
            if (headerName === '变量数值') {
                return valueList.length;
            }
        }
        return 1;
    }

    copyColorTokenName(key: string, index: number) {
        navigator.clipboard.writeText(key);
        this.data.set('copyStatus', {index, rowKey: key});
        this.render();
        setTimeout(() => {
            this.data.set('copyStatus', {index: -1, rowKey: ''});
        }, 500);
    }

    copyTokenName(item: any, index: number, rowKey: string, mode?: string) {
        const tokenName = mode
            ? this.getDisplayValue(item, mode, rowKey)
            : this.getDisplayKey(item, rowKey, 1);
        navigator.clipboard.writeText(tokenName);
        const status = mode ? {index, rowKey, mode} : {index, rowKey};
        this.data.set('copyStatus', status);
        this.render();
        setTimeout(() => {
            this.data.set('copyStatus', {index: -1, rowKey: '', mode: ''});
        }, 500);
    }

    async renderPage(pathName: string) {
        const business = this.data.get('business');
        const attr = this.data.get('attr');
        const prefix = this.data.get('prefix');
        const diff = this.data.get('diff');

        // 处理不同业务线的表格请求
        if (business.includes(pathName)) {
            if (this.data.get('transition')) {
                return this.getTransition();
            }

            diff && this.mixDifferece(prefix, attr, this.tokens);
            this.render();
        }
    }


    mixDifferece(prefix: string, attr: string, tokens: any) {
        let diffMap = this.data.get('diffMap');
        // 只对 attr 为 color 时生效
        if (attr !== 'color' || prefix === 'cos') {
            return;
        }
        const cosColors = tokens?.day?.cos?.color;
        const curColors = tokens?.day?.[prefix]?.color;
        if (!cosColors || !curColors) {
            return;
        }
        for (const item in curColors) {
            if (!cosColors[item]) {
                // 当cosmic中不存在主题的颜色，加入
                diffMap.set(item, curColors[item]);
            }
            else {
                // 当通用中存在存在主题的颜色，替换颜色
                if (cosColors[item].$value !== curColors[item].$value) {
                    diffMap.set(item, curColors[item]);
                }
            }
        }
    }

    isShowDiff(row: any) {
        if (!this.data.get('diff')) {
            return false;
        }
        const diffMap = this.data.get('diffMap');
        if (diffMap.has(row.data?.var?.key)) {
            return true;
        }
        return false;
    }

    async render() {
        const attr = this.data.get('attr');
        const semanticAttr = `semantic-${attr}`;
        const varList = this.getOrderedList(attr);
        const semanticList = this.getOrderedList(semanticAttr);
        const mergedList = this.mergeList(varList, semanticList);
        if (attr === 'platte') {
            const plateList = this.handlePlatte(mergedList);
            this.data.set('list', plateList);
        }
        else {
            this.data.set('list', mergedList);
        }
    }

    /**
     * 处理plate列表，按照颜色进行分组
     *
     * @param mergedList 合并后的plate列表
     * @returns 分组后的颜色数组
     */
    handlePlatte(mergedList: any[]) {
        mergedList.sort((a: any, b: any) => {
            return a.key.localeCompare(b.key);
        });
        const res = [];
        // 从 cos-颜色--数字 或者 cos-颜色-数字; 提取出颜色
        const regExp = /(?<=cos-).*?(?=--[0-9]|-[0-9])/;
        let curColorMatch = mergedList[0]?.key.match(regExp)[0] || '';
        let curColorList: any[] = [];
        mergedList.forEach((item: any) => {
            const color = item.key.match(regExp)[0];
            if (color !== curColorMatch) {
                // 与之前颜色不匹配时，将之前寻找到的颜色数组放入结果中
                // 二次排序每个颜色从浅入深
                const regExpColor = new RegExp(`(?<=${curColorMatch}-).*`);
                curColorList.sort((a: any, b: any) => {
                    return Number(a.key.match(regExpColor)[0]) - Number(b.key.match(regExpColor)[0]);
                });
                res.push(curColorList);
                curColorList = [];
                curColorMatch = color;
            }
            // 为匹配颜色的token放入当前颜色数组
            curColorList.push({
                key: item.key,
                value: item.data.var.data.day.$value,
                color: color
            });
        });
        // 放入最后剩余颜色数组
        const regExpColor = new RegExp(`(?<=${curColorMatch}-).*`);
        curColorList.sort((a: any, b: any) => {
            return Number(a.key.match(regExpColor)[0]) - Number(b.key.match(regExpColor)[0]);
        });
        res.push(curColorList);

        res.sort((a: any, b: any) => {
            return ColorsOrder.indexOf(a[0].color) - ColorsOrder.indexOf(b[0].color);
        });
        return res;
    }

    /**
     * 将字符串的首字母转换为大写。
     *
     * @param str 待转换的字符串。
     * @returns 返回转换后的字符串。
     */
    capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    getOrderedList(attr: string) {

        const mode = this.data.get('mode');
        const prefix = this.data.get('prefix');
        const order = this.data.get('order').split('|');
        const extModes = ['dark', 'pc'];
        const include = this.data.get('include');
        const exclude = this.data.get('exclude');
        const tokens = this.tokens;
        const attrTokenData = tokens?.[mode]?.[prefix]?.[attr] || [];
        const list: any[] = [];

        Object.keys(attrTokenData).forEach((key: string) => {
            if (
                (!include || (new RegExp(include).exec(key)))
                && (!exclude || !(new RegExp(exclude).exec(key)))
            ) {
                const item: any = {key, data: {day: attrTokenData[key]}};
                list.push(item);
                for (const m of extModes) {
                    if (tokens?.[m]?.[prefix]?.[attr]?.[key]) {
                        item.data[m] = tokens[m][prefix][attr][key];
                    }
                }
            }
        });
        order.forEach((o: string) => {
            for (let i = 0, j = 0; j < list.length; i++, j++) {
                const item = list[i];
                if (item.key.indexOf(o) > -1) {
                    list.splice(i, 1);
                    list.push(item);
                    i--;
                }
            }
        });

        return list;
    }

    mergeList(varList: any[], semanticList: any[]) {
        const mergedList: any = [];

        // 处理 platte 这种只有变量，没有语义的情况
        if (semanticList.length === 0) {
            varList.forEach(varItem => {
                mergedList.push({
                    key: this.getDisplayKey(varItem, 'var', 0),
                    data: {var: varItem}
                });
            });
        }
        else {
            semanticList.forEach(semanticItem => {
                const baseKey = semanticItem.key.replace(/^\./, '').replace(/\(\)$/, '');
                const varKeys = [
                    ...semanticItem.data.day.$value.matchAll(/--(cos-[a-z0-9-]+)/g)
                ].map(match => match[1]);

                const matchedVarItems = varKeys
                    .map(varKey => varList.find(varItem => {
                        return this.getDisplayKey(varItem, 'var', 0) === varKey;
                    }))
                    .filter(item => item);

                if (matchedVarItems.length > 0) {
                    const mergedItem = {
                        key: baseKey,
                        data: {
                            semantic: {
                                rowspan: matchedVarItems.length,
                                key: semanticItem.key,
                                data: semanticItem.data
                            },
                            var: {
                                key: matchedVarItems[0].key,
                                data: matchedVarItems[0].data
                            }
                        }
                    };
                    mergedList.push(mergedItem);

                    for (let i = 1; i < matchedVarItems.length; i++) {
                        mergedList.push({
                            key: baseKey,
                            data: {
                                var: {
                                    key: matchedVarItems[i].key,
                                    data: matchedVarItems[i].data
                                }
                            }
                        });
                    }
                }
                // 没有匹配到 varList，保留 semanticItem
                else {
                    mergedList.push({
                        key: baseKey,
                        data: {
                            semantic: {
                                rowspan: 1,
                                key: semanticItem.key,
                                data: semanticItem.data
                            }
                        }
                    });
                }
            });
        }

        return mergedList;
    }

    changeState(e: Event) {
        this.data.set('state', (e.target as HTMLSelectElement)?.value);
        this.render();
    }

    changeMode(e: Event) {
        this.data.set('mode', (e.target as HTMLSelectElement)?.value);
        this.render();
    }

    // secondary 变量，虽然能够匹配到语义，但属于特殊情况，需要排除语义的展示
    isSeprateKey(item: any) {
        const attr = this.data.get('attr');

        if (attr === 'color' && item.key.includes('secondary')) {
            return true;
        }
        return false;
    }

    // stage:
    // 0: 初始化阶段调用
    // 1: 渲染阶段调用
    getDisplayKey(item: any, rowKey: string, stage: number) {
        const attr = this.data.get('attr');
        const displayPrefix = this.data.get('displayPrefix');
        const displayAttr = this.data.get('displayAttr');

        // 处理语义场景下的展示 key
        if (rowKey === 'semantic') {
            if (this.isSeprateKey(item)) {
                return '/';
            }
            switch (attr) {
                case 'text':
                case 'lineclamp':
                case 'rounded':
                case 'space':
                case 'page-space':
                case 'flexbox':
                case 'color':
                case 'duration':
                case 'easing':
                case 'opacity': {
                    return item.key + ';';
                }
            }
        }
        // 处理变量场景下的展示 key
        else {
            // 处理渲染阶段的展示 key
            if (stage === 1) {
                switch (attr) {
                    case 'text':
                    case 'duration':
                    case 'easing':
                    case 'lineclamp': {
                        return `--${item.key}`;
                    }
                    case 'platte': {
                        return `--${displayPrefix}${displayAttr}-${item.key}`;
                    }
                }
            }
            // 处理初始化阶段的展示 key
            else {
                switch (attr) {
                    case 'text':
                    case 'duration':
                    case 'easing':
                    case 'lineclamp': {
                        return item.key;
                    }
                    case 'platte': {
                        return `--${displayPrefix}${displayAttr}-${item.key}`;
                    }
                }
            }
        }

        // 处理互动新增特殊变量的展示
        if (item.key.includes('secondary')) {
            if (stage === 1) {
                return `--cosd-${displayAttr}-${item.key}`;
            }
            return `cos-${displayAttr}-${item.key}`;
        }

        if (stage === 1 && (attr === 'duration' || attr === 'easing')) {
            return `--${item.key}`;
        }

        if (stage === 1) {
            return `--${displayPrefix}-${displayAttr}-${item.key}`;
        }
        return `${displayPrefix}-${displayAttr}-${item.key}`;
    }

    /**
     * 标准化多行文本，去掉行间多余空格，并且加上冒号
     */
    normalizeCssText(input: string) {
        return input
            .split('\n')
            .map(line => line.trim()) // 去掉缩进
            .filter(Boolean) // 去掉空行
            .map(line => (line.endsWith(';') ? line : line + ';'))
            .join('\n') + '\n';
    }

    /**
     * 判断字符串是否可以转成数字
     */
    isNumeric(str: string) {
        if (typeof str !== 'string') {
            return false;
        }
        if (str.trim() === '') {
            return false;
        }
        return !Number.isNaN(Number(str));
    }
    getDisplayValue(item: any, m: string, rowKey: string) {
        const value = item.data[m].$value;
        const attr = this.data.get('attr');

        // cos-dqa 特殊变量的语义展示
        if (rowKey === 'semantic' && item.key.includes('secondary')) {
            return '/';
        }

        if (['color', 'platte'].includes(attr) && rowKey === 'var') {
            return this.formatColor(value);
        }

        if (attr === 'text') {
            if (value === '/' || this.isNumeric(value)) {
                return value;
            }
            return this.normalizeCssText(value);
        }
        if (['rounded', 'space'].includes(attr) && rowKey === 'var') {
            return `${value}px`;
        }
        if (typeof value === 'string') {
            return this.normalizeCssText(value.toLowerCase());
        }
        return this.isNumeric(value) ? value : this.normalizeCssText(value);
    }

    formatColor(color: string): string {
        const hexColor = color.substring(0, 7);
        const alphaHex = color.substring(7);
        const alphaDecimal = parseInt(alphaHex, 16);
        const opacity = Math.round((alphaDecimal / 255) * 100);
        return `${hexColor.toLowerCase()},${opacity}`;
    }

    getTableRowTypes(item: any) {
        const tableHeaderList = this.data.get('tableHeaderList');
        if (item.data && (item.data.day || item.data.dark || item.data.light || item.data.pc)) {
            const order = ['day', 'dark', 'pc'];
            const list = order.filter(key => key in item.data);
            return tableHeaderList?.[1]?.length ? list.slice(0, tableHeaderList[1].length) : list;
        }
        return Object.keys(item.data);
    }

    isEmptyVarRow(item: any) {
        const rowKeys = this.getTableRowTypes(item);
        return rowKeys.includes('semantic') && !rowKeys.includes('var');
    }

    getRowspan(item: any) {
        if (item.rowspan) {
            return item.rowspan;
        }
        return 1;
    }

    getCustomHeaderClass(headerName: string) {
        const attr = this.data.get('attr');
        if (headerName === '变量数值'
            && attr !== 'platte'
            && attr !== 'opacity'
        ) {
            return 'md-token-widget-header-var';
        }
        return '';
    }

    getCustomKeyClass(rowKey: string) {
        const attr = this.data.get('attr');

        // 第一列统一增加左间距，但需要处理语义和变量不同类型作为头部 td 的情况
        let classStr = '';
        if (attr === 'platte' || rowKey === 'semantic') {
            classStr += 'md-token-widget-1st-td';
        }

        // 颜色语义名称，固定宽度
        if (attr === 'color') {
            if (rowKey === 'semantic') {
                classStr += ' md-token-widget-color-semantic-name';
            }
            if (rowKey === 'var') {
                classStr += ' md-token-widget-color-var-name';
            }
        }

        return classStr;
    }

    getCustomValueClass(rowData: any, rowKey: string) {
        const attr = this.data.get('attr');
        const data = rowData.data[rowKey];

        // 处理第二列不同类型的样式情况
        let classStr = '';
        if (attr === 'color' && rowKey === 'semantic') {
            // 颜色变量名称，固定宽度
            if (data.key) {
                classStr += 'md-token-widget-color-style';
            }
        }

        return classStr;
    }
}
