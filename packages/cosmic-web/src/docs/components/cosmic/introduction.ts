import {Component} from 'san';
import Content from './introduction/introduction.md';
import Markdown from './introduction/markdown.md';
import Json from './introduction/json.md';
import SanTemplate from './introduction/template.md';


export default class Doc extends Component {

    static template = `
        <div>
            <content/>
            <markdown/>
            <json/>
            <san-template/>
        </div>
        `;

    static components = {
        'content': Content,
        'markdown': Markdown,
        'json': Json,
        'san-template': SanTemplate
    };
}
