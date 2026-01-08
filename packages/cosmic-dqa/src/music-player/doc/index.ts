import {Component} from 'san';
import Readme from './readme.md';
import API from './api.md';
import PREVIEW from './preview';

export default class MusicPlayer extends Component {
    static template = `
        <div>
            <readme/>
            <preview/>
            <api/>
        </div>
    `;

    static components = {
        'readme': Readme,
        'api': API,
        'preview': PREVIEW
    };
}
