import {Component} from 'san';
import MlCitation from './md/directive/ml-citation/preview.md';
import MlCitationApi from './md/directive/ml-citation/api.md';
import MlCitationReadme from './md/directive/ml-citation/readme.md';

export default class MlCitationCom extends Component {

    static template = `
        <div>
            <ml-citation-readme />
            <ml-citation />
            <ml-citation-api />
        </div>
    `;

    static components = {
        'ml-citation-readme': MlCitationReadme,
        'ml-citation': MlCitation,
        'ml-citation-api': MlCitationApi
    };
}