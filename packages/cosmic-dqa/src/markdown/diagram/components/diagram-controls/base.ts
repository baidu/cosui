/**
 * 图表工具栏控件双端共享部分：控件配置、渲染项构建、模板骨架与事件 / 命令式方法。
 */
import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import {DiagramViewMode} from '../../utils/const';
import type {DiagramOptions} from '../../types';
import type {DiagramControlsData} from './types';

export enum TableName {
    viewMode = 'viewMode',
    fullscreen = 'fullscreen',
    copy = 'copy',
    download = 'download',
    toggleLandscape = 'toggleLandscape'
}

enum ViewportControlName {
    zoomIn = 'zoom-in',
    zoomOut = 'zoom-out',
    reset = 'reset'
}

const TableEventName = {
    [TableName.viewMode]: 'view-mode',
    [TableName.fullscreen]: 'fullscreen',
    [TableName.copy]: 'copy',
    [TableName.download]: 'download',
    [TableName.toggleLandscape]: 'toggle-landscape'
};

function getTableNameConfig(name: string, viewMode: DiagramOptions['viewMode']) {
    return {
        [TableName.viewMode]: {
            icon: viewMode === DiagramViewMode.code ? 'ai-chart' : 'ai-code',
            tooltipContent: viewMode === DiagramViewMode.code ? '查看图表' : '查看代码'
        },
        [TableName.fullscreen]: {
            icon: 'full-screen',
            tooltipContent: '全屏查看'
        },
        [TableName.copy]: {
            icon: 'copy',
            tooltipContent: '复制'
        },
        [TableName.download]: {
            icon: 'download',
            tooltipContent: '下载'
        },
        [TableName.toggleLandscape]: {
            icon: 'toggle-landscape',
            tooltipContent: '切换方向'
        },
        [ViewportControlName.zoomIn]: {
            icon: 'plus',
            tooltipContent: '放大'
        },
        [ViewportControlName.zoomOut]: {
            icon: 'minus',
            tooltipContent: '缩小'
        },
        [ViewportControlName.reset]: {
            icon: 'refresh',
            tooltipContent: '复位'
        }
    }[name] ?? {icon: '', tooltipContent: ''};
}

/**
 * 动作控件分组 → 渲染项。
 */
export function buildActionControls(
    actionControls: DiagramControlsData['actionControls'],
    viewMode: DiagramOptions['viewMode']
) {
    const actionControlGroups = Array.isArray(actionControls) && actionControls.length ? actionControls : [];
    const controlNames = Object.values(TableName);
    return actionControlGroups
        .map(group => group
            .filter(item => controlNames.includes(item.name as TableName))
            .map(item => {
                const name = item.name as TableName;
                const {icon, tooltipContent} = getTableNameConfig(name, viewMode);
                return {name, icon, tooltipContent};
            })
        )
        .filter(group => (group.length > 0));
}

/**
 * 端差异模板片段插槽：按钮内的附加节点（pc 传 tooltip，mobile 传空串）。
 * 在类定义时拼成各端静态模板，运行时无平台分支。
 */
export function createControlsTemplate(btnExtraTpl: string): string {
    return `
        <div class="cosd-diagram-controls">
            <div class="cosd-diagram-action-controls">
                <div
                    s-for="group in sortedActionControls"
                    class="cosd-diagram-action-control-group"
                >
                    <div
                        s-for="control in group"
                        class="cosd-diagram-control-btn"
                        action="{{control.name}}"
                        on-click="handleActionControl(control)"
                    >
                        <cos-icon name="{{control.icon}}" />${btnExtraTpl}
                    </div>
                </div>
            </div>
            <div
                s-if="showViewportControls"
                class="cosd-diagram-viewport-controls"
            >
                <div
                    s-for="group in sortedViewportControls"
                    class="cosd-diagram-viewport-control-group"
                >
                    <div
                        s-for="control in group"
                        action="{{control.name}}"
                        class="cosd-diagram-control-btn {{
                            viewMode === DiagramViewMode.code ? 'cosd-diagram-control-btn-disabled' : ''
                        }}"
                        on-click="handleViewportControl(control)"
                    >
                        <cos-icon name="{{control.icon}}" />${btnExtraTpl}
                    </div>
                </div>
            </div>
        </div>
    `;
}

export default class DiagramControlsBase extends Component<DiagramControlsData> {
    static components = {
        'cos-icon': Icon
    };

    static computed = {
        sortedViewportControls(this: DiagramControlsBase) {
            const viewportControls = this.data.get('viewportControls') ?? [];
            const viewMode = this.data.get('viewMode');
            const controlNames = Object.values(ViewportControlName);

            return viewportControls
                .map(group => group
                    .filter(item => controlNames.includes(item.name as ViewportControlName))
                    .map(item => {
                        const name = item.name as ViewportControlName;
                        const {icon, tooltipContent} = getTableNameConfig(name, viewMode);
                        return {name, icon, tooltipContent};
                    })
                ).filter(group => (group.length > 0));
        },

        showViewportControls(this: DiagramControlsBase) {
            return this.data.get('viewMode') !== DiagramViewMode.code
                && this.data.get('sortedViewportControls').some((group: unknown[]) => (group.length > 0));
        }
    };

    initData() {
        return {
            viewMode: DiagramViewMode.diagram,
            renderStatus: undefined,
            actionControls: [],
            viewportControls: [],
            DiagramViewMode,
            landscape: true
        };
    }

    handleViewportControl(control: {name: string}): void {
        if (this.data.get('viewMode') === DiagramViewMode.code) {
            return;
        }
        this.fire(control.name);
    }

    handleActionControl(control: {name: TableName}): void {
        const {name} = control;
        let data = {};
        const viewMode = this.data.get('viewMode') === DiagramViewMode.code
            ? DiagramViewMode.diagram
            : DiagramViewMode.code;
        if (name === TableName.viewMode) {
            this.data.set('viewMode', viewMode);
            this.fire('view-mode-changed', viewMode);
            return;
        }
        if (name === TableName.toggleLandscape) {
            data = {
                landscape: !this.data.get('landscape')
            };
        }
        if (name === TableName.fullscreen) {
            data = {
                landscape: !this.data.get('landscape')
            };
        }
        this.fire(TableEventName[name], data);
    }

    updateLandscape(landscape: boolean) {
        this.data.set('landscape', landscape);
    }

    updateRenderStatus(renderStatus: DiagramOptions['renderStatus']) {
        this.data.set('renderStatus', renderStatus);
    }

    /**
     * 命令式切换图/源码视图（供业务自绘控件驱动）。不传 target 时在两种视图间切换。
     */
    switchViewMode(target?: DiagramOptions['viewMode']) {
        const current = this.data.get('viewMode');
        const next = target ?? (current === DiagramViewMode.code ? DiagramViewMode.diagram : DiagramViewMode.code);
        if (next === current) {
            return;
        }
        this.data.set('viewMode', next);
        this.fire('view-mode-changed', next);
    }

    /**
     * 命令式切换横竖屏（供业务自绘控件驱动）。不传 target 时在横 / 竖屏间切换。
     * 复用既有 toggle-landscape 链路（updateLandscape + onToggleLandscape）；端旋转与 body class 由业务在收到 landscape 事件后处理。
     */
    toggleLandscape(target?: boolean) {
        const current = this.data.get('landscape');
        const next = target ?? !current;
        if (next === current) {
            return;
        }
        this.fire('toggle-landscape', {landscape: next});
    }
}

/** 各端控件类的构造签名，供端入口注入给渲染层 */
export type DiagramControlsCtor = new (option: {data: Partial<DiagramControlsData>}) => DiagramControlsBase;
