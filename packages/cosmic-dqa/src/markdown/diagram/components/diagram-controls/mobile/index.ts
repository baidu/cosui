/**
 * 图表工具栏控件（移动端）
 */
import DiagramControlsBase, {buildActionControls, createControlsTemplate} from '../base';

export default class DiagramControls extends DiagramControlsBase {
    static template = createControlsTemplate('');

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
