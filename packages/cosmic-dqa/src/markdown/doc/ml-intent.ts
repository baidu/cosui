import {Component} from 'san';
import MlIntentReadme from './md/directive/ml-intent/readme.md';
import MlIntent from './md/directive/ml-intent/preview.md';
import MlIntentApi from './md/directive/ml-intent/api.md';

export default class MlIntentCom extends Component {

    static template = `
        <div>
            <ml-intent-readme />
            <ml-intent />
            <ml-intent-api />
        </div>
    `;

    static components = {
        'ml-intent-readme': MlIntentReadme,
        'ml-intent': MlIntent,
        'ml-intent-api': MlIntentApi
    };
}
