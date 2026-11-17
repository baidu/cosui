import {Component} from 'san';
import Basic from './basic.md';
export default class RowLanesPreview extends Component {

    static template = `
        <template>
            <cos-row-lanes-basic />
        </template>
    `;

    static components = {
        'cos-row-lanes-basic': Basic
    };
}
