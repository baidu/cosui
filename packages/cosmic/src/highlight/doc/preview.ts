import {Component} from 'san';
import DefaultDoc from './default.md';
import Paragraph from './paragraph.md';

export default class Doc extends Component {
    static template = `
        <template>
            <default-doc />
            <paragraph-doc />
        </template>
    `;

    static components = {
        'default-doc': DefaultDoc,
        'paragraph-doc': Paragraph
    };
}