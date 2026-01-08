import {Component} from 'san';
import Mltts from './md/directive/ml-tts/preview.md';
import MlttsApi from './md/directive/ml-tts/api.md';
import MlttsReadme from './md/directive/ml-tts/readme.md';


export default class MlttsCom extends Component {

    static template = `
        <div>
            <ml-tts-readme />
            <ml-tts />
            <ml-tts-api />
        </div>
    `;

    static components = {
        'ml-tts-readme': MlttsReadme,
        'ml-tts': Mltts,
        'ml-tts-api': MlttsApi
    };
}