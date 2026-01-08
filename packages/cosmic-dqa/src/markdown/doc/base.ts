import {Component} from 'san';
import Readme from './md/base/base/readme.md';
import Base from './md/base/base/base.md';
import Code from './md/base/base/code.md';

export default class BaseCom extends Component {

    static template = `
        <div>
            <readme />
            <base />
            <code />
        </div>
    `;

    static components = {
        'readme': Readme,
        'base': Base,
        'code': Code

    };
}