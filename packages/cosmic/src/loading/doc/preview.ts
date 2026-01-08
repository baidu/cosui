import {Component} from 'san';
import Basic from './basic.md';
import Custom from './custom.md';
import Page from './page.md';
export default class Doc extends Component {

    static template = `
        <template>
            <cos-loading-basic/>
            <cos-loading-custom/>
            <cos-loading-page/>
        </template>
    `;

    static components = {
        'cos-loading-basic': Basic,
        'cos-loading-custom': Custom,
        'cos-loading-page': Page
    };
}
