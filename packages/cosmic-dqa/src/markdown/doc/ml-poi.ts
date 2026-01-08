import {Component} from 'san';
import MlPoi from './md/directive/ml-poi/preview.md';
import MlPoiApi from './md/directive/ml-poi/api.md';
import MlPoiReadme from './md/directive/ml-poi/readme.md';

export default class MlPoiCom extends Component {

    static template = `
        <div>
            <ml-poi-readme />
            <ml-poi />
            <ml-poi-api />
        </div>
    `;

    static components = {
        'ml-poi-readme': MlPoiReadme,
        'ml-poi': MlPoi,
        'ml-poi-api': MlPoiApi
    };
}