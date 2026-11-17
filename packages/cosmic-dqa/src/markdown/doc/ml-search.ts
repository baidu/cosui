import {Component} from 'san';
import MlSearchReadme from './md/directive/ml-search/readme.md';
import MlSearch from './md/directive/ml-search/preview.md';
import MlSearchConfig from './md/directive/ml-search/config.md';
import MlSearchActivation from './md/directive/ml-search/activation.md';
import MlSearchApi from './md/directive/ml-search/api.md';


export default class MlSearchCom extends Component {

    static template = `
        <div>
            <ml-search-readme />
            <ml-search />
            <ml-search-config />
            <ml-search-activation />
            <ml-search-api />
        </div>
    `;

    static components = {
        'ml-search-readme': MlSearchReadme,
        'ml-search': MlSearch,
        'ml-search-config': MlSearchConfig,
        'ml-search-activation': MlSearchActivation,
        'ml-search-api': MlSearchApi
    };
}
