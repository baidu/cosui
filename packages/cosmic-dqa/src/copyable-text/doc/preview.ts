import {Component} from 'san';
import DefaultDemo from './default.md';
import PhraseDemo from './phrase.md';

export default class Preview extends Component {
    static template = `
        <template>
            <default />
            <phrase />
        </template>
    `;
    static components = {
        'default': DefaultDemo,
        'phrase': PhraseDemo
    };
}
