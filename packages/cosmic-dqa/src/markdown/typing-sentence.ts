
/**
 * @file 逐句打印相关逻辑
 * @description 负责管理文本节点的逐步渲染动画，实现 gemini 的逐句打字效果
 */

import {wrapTextNodesBySpan} from './process-text-node';

// CSS 类名常量
const CSS_CLASSES = {
    PENDING: 'sentence-pending',
    ANIMATION: 'sentence-animation',
    MARKLANG: 'marklang'
} as const;

// 动画配置常量
export const ANIMATION_CONFIG = {
    // 基础动画延迟（毫秒）
    BASE_DELAY: 5,
    // 向后延迟几段才开始渲染
    DELAY_SEGMENTS: 1,
    // 停止渲染检查间隔（毫秒）
    STOP_RENDER_INTERVAL: 50,
    // 默认动画持续时间（毫秒）
    DEFAULT_ANIMATION_DURATION: 400
} as const;

/**
 * 获取每句之间的延迟渲染间隔时间
 * @param textContent 内容
 * @param animationDuration 当前动画渐变时长
 * @returns 延迟渲染时间
 */
function getSentenceDelay(textContent: string, animationDuration: number): number {
    const textLength = textContent.length;
    const delay = ANIMATION_CONFIG.BASE_DELAY + textLength * animationDuration / 150;
    return Math.min(Math.max(delay, animationDuration / 15), animationDuration / 3);
}

export class TypingSentenceManager {
    // 渲染状态相关
    private rootChildIdx: number = 0;
    private subChildIdx: number = 0;
    private firstRender: boolean = true;
    private finishRootChildRender: boolean = true;
    private finishSubChildRender: boolean = true;
    private readonly animationDuration: number = ANIMATION_CONFIG.DEFAULT_ANIMATION_DURATION;

    private isStop: boolean = false;

    // DOM 相关
    private root: HTMLElement;
    private prevChildren: ChildNode[] = [];

    // 定时器管理
    private animationDelayTimer: ReturnType<typeof setTimeout> | null = null;

    private stopRenderTimer: ReturnType<typeof setInterval> | null = null;


    constructor(root: HTMLElement, animationDuration: number) {
        this.root = root;
        this.animationDuration = animationDuration;
    }

    /**
     * 开始渲染任务
     * @param startIdx 开始索引
     * @param endIdx 结束索引
     * @param children 子元素数组
     * @param onComplete 完成回调
     */
    startAnimationTask(startIdx: number, endIdx: number, children: Element[], onComplete?: () => void): void {
        if (this.isStop) {
            return;
        }

        const leftNodes = children.slice(startIdx, endIdx);
        wrapTextNodesBySpan(leftNodes);
        this.addPendingToNewNodes(startIdx, endIdx, children);

        this.renderNextChild(startIdx, endIdx, children, () => {
            if (this.isStop) {
                return;
            }
            onComplete?.();
        });
    }

    /**
     * 主渲染方法
     * @param rootNode 根节点
     */
    render(rootNode: HTMLElement, onComplete?: () => void): void {
        if (!rootNode?.children || !this.canStartRender() || this.isStop) {
            return;
        }

        const currChildren = Array.from(rootNode?.children || []);

        // 首次渲染处理
        if (this.firstRender) {
            this.prevChildren = currChildren;
            this.firstRender = false;
            return;
        }

        // 继续渲染已有节点
        if (this.prevChildren.length === currChildren.length) {
            this.handleContinuousRender(currChildren, onComplete);
            return;
        }

        // 处理新节点渲染
        const endIdx = currChildren.length - ANIMATION_CONFIG.DELAY_SEGMENTS;
        this.renderNextRootChild(this.rootChildIdx, endIdx, currChildren, onComplete);
        this.prevChildren = currChildren;
    }

    /**
     * 渲染下一个根节点下的节点
     * @param idx 当前索引
     * @param endIdx 结束索引
     * @param children 子元素数组
     * @param onComplete 完成回调
     */
    renderNextRootChild(idx: number, endIdx: number, children: Element[], onComplete?: () => void): void {
        if (idx >= endIdx || this.isStop) {
            return;
        }

        const newChild = children[this.rootChildIdx];
        const subChildren = this.getSubChildren(newChild);

        if (subChildren.length > 0) {
            // 递归渲染完新的 root 子节点下的所有节点
            this.startAnimationTask(this.subChildIdx, subChildren.length, subChildren, () => {
                if (this.isStop) {
                    return;
                }
                this.subChildIdx = 0;
                this.rootChildIdx++;

                // 继续渲染下一个 root 子节点
                this.renderNextRootChild(this.rootChildIdx, endIdx, children, onComplete);
            });
        }
        else {
            // 不需要递归子节点下的子节点，就直接从 rootChildIdx -> root.children.length - DELAY_SEGMENTS 遍历
            const endIdx = children.length - ANIMATION_CONFIG.DELAY_SEGMENTS;
            this.startAnimationTask(this.rootChildIdx, endIdx, children, () => {
                if (this.isStop) {
                    return;
                }
                this.subChildIdx = 0;
                this.rootChildIdx = endIdx;

                onComplete?.();
            });
        }
    }

    /**
     * 清除动画定时器
     */
    clearTimer(): void {
        this.clearAnimationTimer();

        if (this.stopRenderTimer) {
            clearInterval(this.stopRenderTimer);
            this.stopRenderTimer = null;
        }
    }

    /**
     * 立刻停止内容渲染
     */
    stop() {
        if (this.isStop) {
            return;
        }
        // 设置递归标识结束信号
        this.isStop = true;
        this.clearTimer();
    }

    /**
     * 完成所有剩余内容的渲染
     * @param resRoot 最终的根节点
     * @param onComplete 完成回调
     */
    finishRender(resRoot: HTMLElement, onComplete?: () => void): void {
        if (this.stopRenderTimer) {
            return;
        }

        const nodes = Array.from(resRoot?.children[0]?.children || []);
        if (!nodes.length) {
            return;
        }

        // 这里处理一次是为了后面查询上一次渲染结束时的最后一个节点的索引时可以准确比较。
        const leftNodes = nodes.slice(0, nodes.length);
        wrapTextNodesBySpan(leftNodes);

        this.stopRenderTimer = setInterval(() => {
            if (!this.canStartRender()) {
                return;
            }
            if (this.stopRenderTimer) {
                clearInterval(this.stopRenderTimer);
                this.stopRenderTimer = null;
            }
            resRoot.style.height = 'auto';

            const lastNode = this.root.children[this.root.children.length - 1];
            let lastRenderPos = -1;

            if (lastNode) {
                lastRenderPos = this.findLastRenderNodePos(lastNode as HTMLElement, nodes);
            }

            if (lastNode && lastRenderPos === -1) {
                // 没查到，就直接替换所有节点结果
                this.replaceRootElement(resRoot);
                onComplete?.();
                return;
            }

            // 为 lastRenderPos+1 -> nodes.length 的节点增加动效。
            this.startAnimationTask(lastRenderPos + 1, nodes.length, nodes, () => {
                if (this.stopRenderTimer) {
                    clearInterval(this.stopRenderTimer);
                    this.stopRenderTimer = null;
                }
                if (this.isStop) {
                    return;
                }

                if (resRoot.children[0].children.length === this.root.children.length) {
                    this.replaceRootElement(resRoot);
                    onComplete?.();
                    return;
                }
                // 因为 resRoot 经过动效处理后，[lastRenderPos + 1, 结尾] 的子节点被删除并转移到了 this.root 上
                // 因此，仅替换 [0, lastRenderPos] 区间
                this.replaceRootElementWithRange(resRoot, 0, lastRenderPos);
                onComplete?.();
            });

        }, ANIMATION_CONFIG.STOP_RENDER_INTERVAL);
    }


    /**
     * 替换根元素
     * @param rootNode 根节点
     */
    private replaceRootElement(rootNode: HTMLElement): void {
        const newRootElement = rootNode.children[0] as HTMLElement;
        if (newRootElement) {
            this.root.replaceWith(newRootElement);
            this.root = newRootElement;
        }
    }

    /**
     * 替换根元素（startIdx -> endIdx ）
     */
    private replaceRootElementWithRange(resRoot: HTMLElement, startIdx: number, endIdx: number): void {
        const sourceParent = resRoot.children[0] as HTMLElement;
        const targetParent = this.root;
        if (!sourceParent || !targetParent) {
            return;
        }

        const safeEndIdx = Math.max(0, Math.min(endIdx, sourceParent.children.length));
        for (let i = startIdx; i <= safeEndIdx; i++) {
            // 上一次循环的 replaceChild 会将节点从原位置删除，这里始终取 sourceParent 的第一个子节点，避免索引错位。
            const srcChild = sourceParent.children[0] as HTMLElement;
            if (!srcChild) {
                continue;
            }

            if (targetParent.children[i]) {
                targetParent.replaceChild(srcChild, targetParent.children[i]);
            }
        }
    }

    /**
     * 查找最后一个根节点在子节点数组中的索引
     * @param lastRootChild 最后一个根节点
     * @param children 子节点数组
     * @returns 节点索引，未找到返回-1
     */
    private findLastRenderNodePos(lastRenderNode: HTMLElement, nodes: Element[]): number {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i] as HTMLElement;
            if (node.innerText === lastRenderNode.innerText
                && node.tagName === lastRenderNode.tagName
                && node.children.length === lastRenderNode.children.length
            ) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 检查是否可以开始新的渲染
     */
    private canStartRender(): boolean {
        return this.finishSubChildRender && this.finishRootChildRender;
    }

    /**
     * 处理 root 下节点的连续渲染（同一节点内容更新）
     * @param currChildren 新的节点数组
     */
    private handleContinuousRender(currChildren: Element[], onComplete?: () => void): void {
        if (this.isStop) {
            return;
        }

        // 获取节点的最新渲染结果
        const currChild = currChildren[this.prevChildren.length - 1];

        const subChildren = this.getSubChildren(currChild);

        // 延迟渲染，保证当前上屏的都是已渲染完成的节点。
        const endIdx = Math.max(0, subChildren.length - ANIMATION_CONFIG.DELAY_SEGMENTS);

        this.startAnimationTask(this.subChildIdx, endIdx, subChildren, () => {
            if (this.isStop) {
                return;
            }
            this.subChildIdx = endIdx;
            onComplete?.();
        });
        this.prevChildren = currChildren;
    }

    /**
     * 获取子元素，有 marklang 类包裹的会认为是新节点
     * @param element 父元素
     * @returns 子元素数组
     */
    private getSubChildren(element: Element): Element[] {
        if (!element) {
            return [];
        }

        // 检查是否有marklang包装的子元素
        if (element.children[0]?.classList.contains(CSS_CLASSES.MARKLANG)) {
            return Array.from(element.children[0].children || []);
        }

        // 检查元素本身是否是 marklang
        if (element.classList.contains(CSS_CLASSES.MARKLANG)) {
            return Array.from(element.children || []);
        }

        return [];
    }

    /**
     * 为新节点添加pending状态
     * @param startIdx 开始索引
     * @param endIdx 结束索引
     * @param children 子元素数组
     */
    private addPendingToNewNodes(startIdx: number, endIdx: number, children: Element[]): void {
        for (let i = startIdx; i < endIdx; i++) {
            const child = children[i] as HTMLElement;
            child.classList.add(CSS_CLASSES.PENDING);

            // 为所有span子元素添加 pending 类
            const spanElements = child.querySelectorAll('span');
            spanElements.forEach(span => {
                span?.classList?.add(CSS_CLASSES.PENDING);
            });

            // 为 ul 和 li 子元素添加 pending 类
            const listElements = child.querySelectorAll('ul, li');
            listElements.forEach(listElement => {
                listElement?.classList?.add(CSS_CLASSES.PENDING);
            });
        }
    }

    /**
     * 渲染下一个子元素
     * @param currentIdx 当前索引
     * @param endIdx 结束索引
     * @param children 子元素数组
     * @param onComplete 完成回调
     */
    private renderNextChild(
        currentIdx: number,
        endIdx: number,
        children: ChildNode[],
        onComplete?: () => void
    ): void {
        this.finishSubChildRender = false;

        if (this.isStop) {
            return;
        }

        if (currentIdx >= endIdx) {
            this.finishSubChildRender = true;
            onComplete?.();
            return;
        }

        const child = children[currentIdx] as HTMLElement;
        const pendingElements = Array.from(child.querySelectorAll(`.${CSS_CLASSES.PENDING}`));

        // 处理节点动画
        this.processChildAnimation(child);

        // 渲染子节点后继续下一个
        this.renderNextNode(pendingElements, 0, () => {
            if (this.isStop) {
                return;
            }
            this.renderNextChild(currentIdx + 1, endIdx, children, onComplete);
        });
    }

    /**
     * 处理子元素动画
     * @param child 子元素
     */
    private processChildAnimation(child: HTMLElement): void {
        child.classList.remove(CSS_CLASSES.PENDING);
        child.classList.add(CSS_CLASSES.ANIMATION);

        this.root.appendChild(child);
    }

    /**
     * 渲染下一个文本节点
     * @param pendingElements 待渲染元素数组
     * @param idx 当前索引
     * @param onComplete 完成回调
     */
    private renderNextNode(pendingElements: Element[], idx: number, onComplete?: () => void): void {
        this.clearAnimationTimer();
        this.finishRootChildRender = false;

        if (this.isStop) {
            return;
        }

        if (idx >= pendingElements.length) {
            // 递归出口
            this.finishRootChildRender = true;
            this.clearAnimationTimer();
            onComplete?.();
            return;
        }

        const element = pendingElements[idx] as HTMLElement;
        const textContent = element.textContent || '';
        const delay = getSentenceDelay(textContent, this.animationDuration);

        if (this.animationDelayTimer) {
            clearTimeout(this.animationDelayTimer);
            this.animationDelayTimer = null;
        }
        element.classList.remove(CSS_CLASSES.PENDING);
        element.classList.add(CSS_CLASSES.ANIMATION);
        this.animationDelayTimer = setTimeout(() => {
            if (this.isStop) {
                return;
            }
            this.renderNextNode(pendingElements, idx + 1, onComplete);
        }, delay);
    }

    /**
     * 清除动画定时器
     */
    private clearAnimationTimer(): void {
        if (this.animationDelayTimer) {
            clearTimeout(this.animationDelayTimer);
            this.animationDelayTimer = null;
        }
    }
}