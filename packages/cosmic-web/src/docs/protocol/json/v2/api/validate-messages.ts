import {Component} from 'san';
import Readme from './validate-messages/readme.md';
import Preview from './validate-messages/preview';

export default class V2ValidateMessages extends Component {
    static template = '<div><doc-readme /><doc-preview /></div>';

    static components = {
        'doc-readme': Readme,
        'doc-preview': Preview
    };
}
