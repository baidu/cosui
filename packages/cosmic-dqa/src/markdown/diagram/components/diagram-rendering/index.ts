import {Component} from 'san';
import Loading from '@cosui/cosmic/loading';

export default class DiagramRendering extends Component {
    static template = `
        <div class="cosd-diagram-rendering">
            <cos-loading text="图表加载中，请稍后"/>
        </div>
    `;

    static components = {
        'cos-loading': Loading
    };
}
