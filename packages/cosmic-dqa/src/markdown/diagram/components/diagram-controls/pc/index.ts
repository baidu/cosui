/**
 * 图表工具栏控件（PC）：按钮带 hover tooltip。
 */
import DiagramControlsBase, {buildActionControls, createControlsTemplate} from '../base';

const TOOLTIP_TPL = `
    <p
        s-if="control.tooltipContent"
        class="cosd-diagram-control-btn-tooltip"
    >{{control.tooltipContent}}</p>
`;

export default class DiagramControls extends DiagramControlsBase {
    static template = createControlsTemplate(TOOLTIP_TPL);

    static computed = {
        ...DiagramControlsBase.computed,

        sortedActionControls(this: DiagramControls) {
            return buildActionControls(
                this.data.get('actionControls'),
                this.data.get('viewMode')
            );
        }
    };
}
