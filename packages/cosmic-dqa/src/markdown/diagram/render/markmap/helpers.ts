
import {COLORS} from '../../utils/colors';
import {asyncImport} from '../../utils/module-loader';
import type {MarkmapViewModule, MarkmapOptions} from './types';

const ROOT_PATH = '1';
const ROOT_COLOR_INDEX = 0;

function getColor(colorIndex: number) {
    return COLORS[colorIndex % COLORS.length] || COLORS[0];
}

function getBranchPath(path?: string | null) {
    const pathParts = path?.split('.').filter(Boolean) || [];
    if (pathParts.length <= 1) {
        return pathParts[0] || '';
    }

    return pathParts.slice(0, 2).join('.');
}

const branchIndexes = new Map<string, number>();

/**
 * 获取分支路径对应的颜色索引
 *
 * 对于根路径（空路径或等于 ROOT_PATH），返回固定的根颜色索引；
 * 对于其他路径，若已分配过索引则直接返回，否则分配一个新的索引并缓存。
 *
 * @param branchPath - 分支路径字符串
 * @returns 分支对应的颜色索引
 */
export function getBranchIndex(branchPath: string) {
    if (!branchPath || branchPath === ROOT_PATH) {
        return ROOT_COLOR_INDEX;
    }

    const branchIndex = branchIndexes.get(branchPath);
    if (branchIndex !== undefined) {
        return branchIndex + 1;
    }

    const nextBranchIndex = branchIndexes.size;
    branchIndexes.set(branchPath, nextBranchIndex);
    return nextBranchIndex;
}

export function resetBranchColors() {
    branchIndexes.clear();
}

export async function createMarkmap(svg: SVGSVGElement, options?: Partial<MarkmapOptions>) {
    const module = (await asyncImport(() => import('markmap-view'))) as MarkmapViewModule;
    return module.Markmap.create(svg, options);
}

export function getBranchConfig(path: string | null | undefined) {
    const branchPath = getBranchPath(path);
    let branchIndex = getBranchIndex(branchPath);

    if (!branchPath || branchPath === ROOT_PATH) {
        branchIndex = ROOT_COLOR_INDEX;
    }
    const lineColor = getColor(branchIndex);
    return {
        lineColor,
        textColor: lineColor
    };
}
