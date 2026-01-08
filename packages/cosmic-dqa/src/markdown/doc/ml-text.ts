import {Component} from 'san';
import MlTextReadme from './md/directive/ml-text/readme.md';
import MlText from './md/directive/ml-text/preview.md';
import MlTextApi from './md/directive/ml-text/api.md';


export default class MlTextCom extends Component {

    static template = `
        <div>
            <ml-text-readme />
            <ml-text />
            <ml-text-api />
        </div>
    `;

    static components = {
        'ml-text-readme': MlTextReadme,
        'ml-text': MlText,
        'ml-text-api': MlTextApi
    };
}