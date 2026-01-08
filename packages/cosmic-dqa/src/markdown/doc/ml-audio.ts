import {Component} from 'san';
import MlAudio from './md/directive/ml-audio/preview.md';
import MlAudioApi from './md/directive/ml-audio/api.md';
import MlAudioReadme from './md/directive/ml-audio/readme.md';


export default class MlAudioCom extends Component {

    static template = `
        <div>
            <ml-audio-readme />
            <ml-audio />
            <ml-audio-api />
        </div>
    `;

    static components = {
        'ml-audio-readme': MlAudioReadme,
        'ml-audio': MlAudio,
        'ml-audio-api': MlAudioApi

    };
}