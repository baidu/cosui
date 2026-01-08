import {Component} from 'san';
import MlBrief from './md/directive/ml-brief/preview.md';
import MlBriefReadme from './md/directive/ml-brief/readme.md';

export default class MlBriefCom extends Component {

    static template = `
        <div>
            <ml-brief-readme />
            <ml-brief />
        </div>
    `;

    static components = {
        'ml-brief-readme': MlBriefReadme,
        'ml-brief': MlBrief
    };
}