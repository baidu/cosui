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
 *
 * @file utils
 */

import type {Option} from './interface';

/**
 * 构建选择路径和 label
 * @returns paths 路径数组，每个子数组代表一条完整的从根到叶的选择路径
 * @returns label 选中的标签，基于 value 唯一
 */
function findPathAndLabels(
    options: Option[],
    value: string | string[],
    path: Option[],
): {paths: Option[][], label: string[]} {
    let paths: Option[][] = [];
    const labelSet = new Set<string>();

    for (let i = 0, len = options.length; i < len; i++) {
        const option = options[i];
        const newPath = [...path, {...option, index: i}];

        if (Array.isArray(value)) {
            if (value.includes(option.value)) {
                paths.push(newPath);
                labelSet.add(option.label || option.value);
            }
            if (option.options) {
                // label 从 option 中读取，不需要在路径中记录，因此不需要作为递归的参数。
                const {paths: findPaths, label: findLabels} = findPathAndLabels(option.options, value, newPath);
                paths = paths.concat(findPaths);

                findLabels.forEach(label => labelSet.add(label));
            }
        }
        else {
            if (option.value === value) {
                return {
                    paths: [newPath],
                    label: [option?.label || value]
                };
            }
            if (option.options) {
                const {paths: findPaths, label: findLabels} = findPathAndLabels(option.options, value, newPath);
                if (findPaths.length) {
                    return {
                        paths: findPaths,
                        label: findLabels
                    };
                }
            }
        }
    }

    const uniqueLabels = Array.from(labelSet);
    return {paths, label: uniqueLabels};
}

/**
 * 确保在同一层级中不会有重复的选项
 * 生产 selectedPath 数组，以三层结构而言：
 * selectedPath[0]：包含所有选中的第一层选项
 * selectedPath[1]：包含所有选中的第二层选项
 * selectedPath[2]：包含所有选中的第三层选项
 */
function addItemToLayer(layer: Option[], item: Option) {
    let found = layer.find(el => el.value === item.value);
    if (found) {
        // 如果当前项有子节点，需要处理子节点的合并
        if (!item.options || item.options.length === 0) {
            return;
        }
        found.options = [...new Set([...(found.options || []), ...(item.options || [])])];
    }
    else {
        layer.push({...item});
    }
}

function getSelectedPath(multiple: boolean, paths: Option[][]) {
    // 如果没有路径，返回空数组
    if (paths.length === 0) {
        return {selectedPath: multiple ? [[], [], []] : []};
    }

    if (multiple) {
        // 多选模式：返回二维数组，每层包含该层的所有选项
        // cascader 组件最多支持三层级联，所以这里初始化三层数组
        const selectedPath: Option[][] = [[], [], []];

        // 遍历所有路径，将每个路径中的节点按层级添加到相应的数组中
        paths.forEach(subArray => {
            subArray.forEach((item, index) => {
                // 确保不超出数组范围
                if (index < selectedPath.length) {
                    // 将当前项添加到相应层级，自动去重
                    addItemToLayer(selectedPath[index], item);

                    // 如果这是路径中的最后一项，但它有子节点，则需要继续处理
                    if (index === subArray.length - 1 && item.options && item.options.length > 0) {
                        // 如果还有下一层，将子节点添加到下一层
                        if (index + 1 < selectedPath.length) {
                            item.options.forEach((childOption, childIndex) => {
                                // 创建子节点的副本，并设置索引
                                const childWithIndex = {...childOption, index: childIndex};
                                addItemToLayer(selectedPath[index + 1], childWithIndex);
                            });
                        }
                    }
                }
            });
        });
        return {selectedPath};
    }
    // 单选模式：直接返回第一个完整路径
    return {selectedPath: paths[0]};
}

/**
 * 基于选择路径，构建特定结构的 selectedPath 数组
 */
export function getSelectedOptions(
    multiple: boolean,
    options: Option[],
    value: string | string[],
    path: Option[]
) {
    const {paths, label} = findPathAndLabels(options, value, path);

    // 单选时，结果路径只有一个; 若未找到值，也返回 []
    const {selectedPath} = getSelectedPath(multiple, paths);
    return {
        selectedPath,
        selectedLabels: label
    };
}

/**
 * 查找当前值在目标路径的索引位置
 * @param value 当前值
 * @param findPath 目标路径
 * @returns 当前值在目标路径的索引位置，未找到则返回-1
 */
export function findIndex(value: string, findPath: Option[]): number {
    if (!findPath || !Array.isArray(findPath)) {
        return -1;
    }

    for (let i = 0; i < findPath.length; i++) {
        if (findPath[i].value === value) {
            return i;
        }
    }
    return -1;
}

/**
 * 获取当前层中，选中路径中对应的选项
 * @param layer 层数
 * @param value 当前值
 * @param selectedPath 选中路径
 * @returns 当前层中，选中路径中对应的选项
 */
export function findOption(layer: number, value: string, selectedPath: Option[][]) {
    const currentPath = selectedPath[layer];
    if (!Array.isArray(currentPath)) {
        return null;
    }
    /* eslint-disable-next-line */
    for (let i = 0; i < currentPath.length; i++) {
        if (currentPath[i].value === value) {
            return currentPath[i];
        }
    }
    return null;
}

/**
 * 判断选项是否被选中
 * @param option 选项
 * @returns 是否选中
 */
export function isChecked(option: Option): boolean {
    // 非叶子节点，是否选中，取决于子节点是否全选
    if (option.options && option.options.length) {
        return option.allChecked || false;
    }
    return option.checked || false;
}

// 递归提取叶子节点
export function getLeafOptions(nodes: Option[] = []) {
    let result: Option[] = [];
    if (!Array.isArray(nodes)) {
        return result;
    }

    nodes.forEach(node => {
        if (!node) {
            return;
        }
        // 确保 options 是数组（若不是，视为叶子节点）
        const hasValidOptions = Array.isArray(node.options) && node.options.length > 0;
        if (!hasValidOptions) {
            result.push(node);
        }
        else {
            result = result.concat(getLeafOptions(node.options));
        }
    });
    return result;
}