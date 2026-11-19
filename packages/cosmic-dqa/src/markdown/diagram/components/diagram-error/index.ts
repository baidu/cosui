import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';

export default class DiagramError extends Component {
    static template = `
        <div class="cosd-diagram-error">
            <cos-icon name="aiimage-edit" />
            <h5 class="cosd-diagram-error-title">生成失败，请稍后重试～</h5>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };
}
