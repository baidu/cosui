import {Component} from 'san';
import MlSearchMoreReadme from './md/directive/ml-search-more/readme.md';
import MlSearchMore from './md/directive/ml-search-more/preview.md';
import MlSearchMoreApi from './md/directive/ml-search-more/api.md';

export default class MlSearchMoreCom extends Component {

    static template = `
        <div>
            <ml-search-more-readme />
            <ml-search-more />
            <ml-search-more-api />
        </div>
    `;

    static components = {
        'ml-search-more-readme': MlSearchMoreReadme,
        'ml-search-more': MlSearchMore,
        'ml-search-more-api': MlSearchMoreApi
    };
}