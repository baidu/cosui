/**
 * @file select/utils
 * @author
 */
import {DefaultValueType, RawValueType} from './interface';

export const prefixCls = 'cos-web-header-search-select';
export const emptyPrefixCls = 'cos-web-header-search-empty';
export const dropdownPrefixCls = `${prefixCls}-dropdown`;

export function toTitle(title?: string) {
    if (typeof title === 'string') {
        return title;
    }
    return '';
}

export function toArray<T>(value: T | T[] | undefined): T[] {
    let ret = value === undefined ? [] : value;

    if (!Array.isArray(ret)) {
        ret = [ret];
    }
    return ret;
}

export const KeyCode = {
    ZERO: 48,
    NINE: 57,

    NUMPAD_ZERO: 96,
    NUMPAD_NINE: 105,

    BACKSPACE: 8,
    DELETE: 46,
    ENTER: 13,

    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    TAB: 9,
    ESC: 27,
    SPACE: 32
};

export function getPropValue(child, prop?: string) {
    if (prop === 'children') {
        return (child.el as HTMLElement)?.innerText;
    }
    if (prop === undefined) {
        return;
    }
    return child.data.get(prop);
}

export function getMapKey(value: string | number) {
    return `${typeof value}-${value}`;
}


export function preventDefaultEvent(e: Event) {
    e.preventDefault();
}

export function includesSeparators(str: string, separators: string[]) {
    for (const item of separators) {
        if (str.lastIndexOf(item) > 0) {
            return true;
        }
    }
    return false;
}

export function splitBySeparators(str: string, separators: string[]) {
    const reg = new RegExp(`[${separators.join()}]`);
    return str.split(reg).filter(token => token);
}

export function generateUUID(): string {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
    });
    return uuid;
}

export function defaultFilterFn(input: string, child: any, optionFilterProp?: string) {
    if (child.data.get('disabled')) {
        return false;
    }
    const value = getPropValue(child, optionFilterProp);
    return value.toLowerCase().indexOf(input.toLowerCase()) > -1;
}

export function isValueArray(value: DefaultValueType | undefined): value is RawValueType[] {
    return Array.isArray(value);
}
export function isValueString(value: DefaultValueType | undefined): value is string {
    return !isValueArray(value) && typeof value === 'string';
}
export function isValueArrayOrString(value: DefaultValueType | undefined): value is RawValueType[] | string {
    return isValueArray(value) || isValueString(value);
}
