import {Component} from 'san';
import diagram from './md/base/diagram/preview.md';
import diagramReadme from './md/base/diagram/readme.md';

export default class DiagramCom extends Component {

    static template = `
        <div>
            <diagramReadme />
            <diagram />
        </div>
    `;

    static components = {
        'diagramReadme': diagramReadme,
        'diagram': diagram
    };
}
