import {Component} from 'san';
import MlCopy from './md/directive/ml-copy/preview.md';
import MlCopyReadme from './md/directive/ml-copy/readme.md';

export default class MlCopyCom extends Component {

    static template = `
        <div>
            <ml-copy-readme />
            <ml-copy />
        </div>
    `;

    static components = {
        'ml-copy-readme': MlCopyReadme,
        'ml-copy': MlCopy
    };
}