import {Component} from 'san';
import img from './md/base/img/preview.md';
import imgReadme from './md/base/img/readme.md';


export default class ImgCom extends Component {

    static template = `
        <div>
            <img-readme />
            <img />
        </div>
    `;

    static components = {
        'img': img,
        'img-readme': imgReadme
    };
}