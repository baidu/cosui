import {Component} from 'san';
import MlTagLinkReadme from './md/directive/ml-tag-link/readme.md';
import MlTagLink from './md/directive/ml-tag-link/preview.md';
import MlTagLinkApi from './md/directive/ml-tag-link/api.md';


export default class MlTagLinkCom extends Component {

    static template = `
        <div>
            <ml-tag-link-readme />
            <ml-tag-link />
            <ml-tag-link-api />
        </div>
    `;

    static components = {
        'ml-tag-link-readme': MlTagLinkReadme,
        'ml-tag-link': MlTagLink,
        'ml-tag-link-api': MlTagLinkApi
    };
}