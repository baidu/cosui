import {Component} from 'san';
import latex from './md/base/latex/preview.md';
import latexReadme from './md/base/latex/readme.md';

export default class LatexCom extends Component {

    static template = `
        <div>
            <latex-readme />
            <latex />
        </div>
    `;

    static components = {
        'latex-readme': latexReadme,
        'latex': latex
    };
}