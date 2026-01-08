import {Component} from 'san';
import link from './md/base/link/preview.md';
import linkReadme from './md/base/link/readme.md';

export default class LinkCom extends Component {

    static template = `
        <div>
            <link-readme />
            <link />
        </div>
    `;

    static components = {
        'link-readme': linkReadme,
        'link': link
    };
}