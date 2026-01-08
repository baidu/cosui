import {Component} from 'san';
import API from './api.md';
import Preview from './preview';
import Readme from './readme.md';

export default class AgentCard extends Component {
    static template = `
        <div>
            <readme />
            <preview />
            <api />
        </div>
    `;

    static components = {
        'readme': Readme,
        'preview': Preview,
        'api': API
    };
}