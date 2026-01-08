/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file 数据处理
 */

import san from 'san';
import type {ActionConfig, CompileOption, Data} from './interface';

const EXPR_DELIMITER = {
    INTERP_TMP_PREFIX: '__dy{{',
    INTERP_TMP_SUFFIX: '}}dy__',
    QUOTATION: '__quotation__',
    BEGINNING_QUOTATION: '__beginning_quotation__',
    CLOSING_QUOTATION: '__closing_quotation__',
    DATA_PREFIX: '$data.'
};

const CONCAT_REGEXP = /^concat\(\$prevData\.([\w-]+)\s*,\s*([\w-]+)\)$/;
const INTERP_REGEXP = /{{(.*?)}}/g;
const QUOTATION_ALL_REGEXP = new RegExp(`${EXPR_DELIMITER.QUOTATION}`, 'g');
const QUOTATION_PLUS_REGEXP = new RegExp(`^${EXPR_DELIMITER.QUOTATION}\+`);

const PREFIX_SUFFIX_REGEXP = new RegExp(`"${EXPR_DELIMITER.INTERP_TMP_PREFIX}|"${EXPR_DELIMITER.BEGINNING_QUOTATION
}|${EXPR_DELIMITER.INTERP_TMP_SUFFIX}"|${EXPR_DELIMITER.CLOSING_QUOTATION}"`, 'g');

const PLUS_QUOTATION_REGEXP = new RegExp(`\\+${EXPR_DELIMITER.QUOTATION}$`, 'g');

/**
 * 是否为插值表达式
 *
 * @param value
 * @returns
 */
export function isInterp(value: unknown): boolean {
    return typeof value === 'string' && /{{(.*?)}}/.test(value);
}

/**
 * 计算获取插值数据
 *
 * @param value
 * @param appData
 * @returns
 */
function getData(value: unknown, appData: san.Data) {

    // isInterp 中已判断 typeof value === 'string'
    if (!isInterp(value)) {
        return value;
    }

    if ((value as string).startsWith('{{') && (value as string).endsWith('}}')) {
        return san.evalExpr(san.parseExpr((value as string).slice(2, -2)), appData);
    }

    return (value as string).replace(INTERP_REGEXP, (interp, expr) => {
        return san.evalExpr(san.parseExpr(expr), appData);
    });
}

/**
 * 是否为 concat 表达式
 *
 * @param value
 * @returns
 */
function isConcatExpr(value: unknown): boolean {
    return typeof value === 'string' && CONCAT_REGEXP.test(value);
}

/**
 *  计算获取 concat 数据
 *
 * @param concatExpr
 * @param data
 * @param prevData
 * @returns
 */
function getConcatData(concatExpr: string, data: Data, prevData: Data) {
    const [, prevKey, key] = CONCAT_REGEXP.exec(concatExpr)!;
    if (!prevKey || !key) {
        throw new Error('concat expression error');
    }

    const prevValue = prevData[prevKey];
    const value = data[key];

    if (!prevValue || !value) {
        return prevValue || value || '';
    }

    if (Array.isArray(prevValue) && Array.isArray(value)) {
        return prevValue.concat(value);
    }

    if (typeof prevValue === 'string' && typeof value === 'string') {
        return prevValue + value;
    }

    return '';
}

/**
 * 对 option 中的插值数据 进行特殊标记
 *
 * @param value
 * @returns
 */
function getOption(value: unknown): unknown | string {
    if (typeof value !== 'string') {
        return value;
    }

    if (value.startsWith('{{') && value.endsWith('}}')) {

        return value.replace(INTERP_REGEXP, (interp, expr) => {

            // scope 下的插值需移除处理，由 {{value}} 此处标记为 __dy{{}}dy__
            // 剩余:  $event 保持原状原命名
            // $data. 等其他插值变量 移除 $data. 等前缀
            return `${EXPR_DELIMITER.INTERP_TMP_PREFIX}${
                expr.replace(EXPR_DELIMITER.DATA_PREFIX, '')
            }${EXPR_DELIMITER.INTERP_TMP_SUFFIX}`;
        });
    }

    // 场景1: prop: "xxx{{value}}yyy"
    // 1 => "xxx__quotation__+value+__quotation__yyy"
    // 2(此处) => "xxx__quotation__+value+__quotation__yyy" （与1同）
    // 3(最终) => "xxx"+value+"yyy" (见 normalizeActionArr 方法处理)

    // 场景二: prop: "xxx{{value}}"
    // 1 => "xxx__quotation__+value+xxx__quotation__"
    // 2(此处) => "xxx__quotation__+value__closing_quotation__"
    // 3(最终) => "xxx"+value (见 normalizeActionArr 方法处理)

    // 场景三: prop: "{{value}}yyy"
    // 1(此处) => "__beginning_quotation__value+__quotation__yyy"
    // 3(最终) => value+"yyy" (见 normalizeActionArr 方法处理)

    let hasSplit = false;
    let result = value.replace(INTERP_REGEXP, (interp, expr) => {
        hasSplit = true;
        return `${EXPR_DELIMITER.QUOTATION}+${
            expr.replace(EXPR_DELIMITER.DATA_PREFIX, '')
        }+${EXPR_DELIMITER.QUOTATION}`;
    });

    if (hasSplit) {
        result = result.replace(QUOTATION_PLUS_REGEXP, EXPR_DELIMITER.BEGINNING_QUOTATION)
            .replace(PLUS_QUOTATION_REGEXP, EXPR_DELIMITER.CLOSING_QUOTATION);
    }

    return result;
}

/**
 * 计算 option 数据，得到标记之后的数据
 *
 * @param option
 * @returns
 */
function computeOption(option: unknown): unknown {
    if (!option) {
        return option;
    }

    if (Array.isArray(option)) {
        return option.map((item: unknown) => computeOption(item));
    }

    if (typeof option === 'object') {
        if (!option) {
            return option;
        }

        const newOption: Data = {};
        Object.keys(option).forEach((key: string) => {
            newOption[key] = computeOption((option as Data)[key]);
        });
        return newOption;
    }

    return getOption(option);
}

/**
 * 序列化 props 含插值的数据，得到字符串格式
 *
 * @param actionsArr
 * @returns
 */
export function normalizeInterpPropValue(value: unknown): unknown | string {
    if (!value) {
        return value;
    }

    return JSON.stringify(computeOption(value))
        .replace(PREFIX_SUFFIX_REGEXP, '')
        .replace(QUOTATION_ALL_REGEXP, '"');
}

/**
 * 序列化 actions 数据，得到字符串格式
 *
 * @param actionsArr
 * @returns
 */
export function normalizeActionArr(actionsArr: ActionConfig[]): string {
    if (!actionsArr || !actionsArr.length) {
        return '[]';
    }

    let finalActionsArr: ActionConfig[] = [];
    actionsArr.forEach((item, index) => {
        finalActionsArr[index] = {
            action: item.action,
            option: computeOption(item.option) as ActionConfig['option']
        };
    });

    // 场景1: prop: "xxx{{value}}yyy"
    // 1 => "xxx__quotation__+value+__quotation__yyy"
    // 2(中间) => "xxx__quotation__+value+__quotation__yyy"  (见 getOption 方法处理)
    // 3(最终) => "xxx"+value+"yyy"

    // 场景二: prop: "xxx{{value}}"
    // 1 => "xxx__quotation__+value+xxx__quotation__"
    // 2(中间) => "xxx__quotation__+value__closing_quotation__"  (见 getOption 方法处理)
    // 3(最终) => "xxx"+value

    // 场景三: prop: "{{value}}yyy"
    // 1(中间) => "__beginning_quotation__value+__quotation__yyy"  (见 getOption 方法处理)
    // 3(最终) => value+"yyy"
    return JSON.stringify(finalActionsArr)
        .replace(PREFIX_SUFFIX_REGEXP, '')
        .replace(QUOTATION_ALL_REGEXP, '"');
}

/**
 * 获取 dataExtends 数据
 *
 * @param dataExtends
 * @param data
 * @param prevData
 * @param sanData
 * @returns
 */
export function getDataExtends(
    dataExtends: CompileOption['dataExtends'],
    data: Data,
    prevData: Data,
    sanData?: san.Data
): Data {

    if (!dataExtends) {
        return {};
    }

    const appData = sanData || new san.Data(data);

    function computeData(exprData: unknown): unknown {
        if (Array.isArray(exprData)) {
            return exprData.map((item: unknown) => computeData(item));
        }

        if (typeof exprData === 'object') {
            if (!exprData) {
                return exprData;
            }

            const newData: Data = {};
            Object.keys(exprData).forEach((key: string) => {
                newData[key] = computeData((exprData as Data)[key]);
            });
            return newData;
        }

        // 兼容 concat($prevData.key, key) 表达式
        if (isConcatExpr(exprData)) {
            return getConcatData(exprData as string, data, prevData);
        }

        return getData(exprData, appData);
    }

    return computeData(dataExtends) as Data;
}
