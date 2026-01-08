import {Component} from 'san';
import MathKatex from './math-katex.md';

export default class Doc extends Component {
    static template = `
        <div>
            <math-katex />
        </div>
    `;

    static components = {
        'math-katex': MathKatex
    };
}