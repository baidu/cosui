import {Component} from 'san';
import Default from './default.md';
import Header from './header.md';
import Content from './content.md';
import Footer from './footer.md';
import List from './list.md';


export default class Doc extends Component {
    static template = `
        <template>
            <default/>
            <header-demo/>
            <content/>
            <footer-demo/>
            <list/>
        </template>
    `;

    static components = {
        'default': Default,
        'header-demo': Header,
        'content': Content,
        'footer-demo': Footer,
        'list': List
    };
}