import {Component} from 'san';
import Basic from './basic.md';
import Gutter from './gutter.md';
import UseColumnsAndSpan from './use-columns-and-span.md';
import Justify from './justify.md';
import Align from './align.md';

export default class GridDoc extends Component {

    static template = `
        <div>
            <doc-basic/>
            <doc-gutter/>
            <doc-use-columns-and-span/>
            <doc-justify/>
            <doc-align/>
        </div>
    `;

    static components = {
        'doc-basic': Basic,
        'doc-use-columns-and-span': UseColumnsAndSpan,
        'doc-gutter': Gutter,
        'doc-justify': Justify,
        'doc-align': Align
    };
}
