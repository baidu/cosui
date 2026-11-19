import {Component} from 'san';
import Readme from './autofix/readme.md';
import Preview from './autofix/preview';

export default class V2Autofix extends Component {
    static template = '<div><doc-readme /><doc-preview /></div>';

    static components = {
        'doc-readme': Readme,
        'doc-preview': Preview
    };
}
