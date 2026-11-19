import {Component} from 'san';
import Readme from './online/readme.md';
import Preview from './online/preview';

export default class V2Online extends Component {
    static template = '<div><doc-readme /><doc-preview /></div>';

    static components = {
        'doc-readme': Readme,
        'doc-preview': Preview
    };
}
