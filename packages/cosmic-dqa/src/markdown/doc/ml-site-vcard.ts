import {Component} from 'san';
import MlSiteVcard from './md/directive/ml-site-vcard/preview.md';
import MlSiteVcardApi from './md/directive/ml-site-vcard/api.md';
import MlSiteVcardReadme from './md/directive/ml-site-vcard/readme.md';


export default class MlSearchCom extends Component {

    static template = `
        <div>
            <ml-site-vcard-readme />
            <ml-site-vcard />
            <ml-site-vcard-api />
        </div>
    `;

    static components = {
        'ml-site-vcard-readme': MlSiteVcardReadme,
        'ml-site-vcard': MlSiteVcard,
        'ml-site-vcard-api': MlSiteVcardApi
    };
}