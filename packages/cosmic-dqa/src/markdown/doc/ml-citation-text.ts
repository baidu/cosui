import {Component} from 'san';
import MlCitationText from './md/directive/ml-citation-text/preview.md';
import MlCitationTextReadme from './md/directive/ml-citation-text/readme.md';
import MlCitationTextApi from './md/directive/ml-citation-text/api.md';


export default class MlCitationTextCom extends Component {

    static template = `
        <div>
            <ml-citation-text-readme />
            <ml-citation-text />
            <ml-citation-text-api />
        </div>
    `;

    static components = {
        'ml-citation-text-readme': MlCitationTextReadme,
        'ml-citation-text': MlCitationText,
        'ml-citation-text-api': MlCitationTextApi
    };
}