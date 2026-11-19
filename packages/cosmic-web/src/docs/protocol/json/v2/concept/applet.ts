import {Component} from 'san';
import Applet from './applet.md';

export default class V2AppletConcept extends Component {
    static template = `
        <div>
            <doc-applet />
        </div>
    `;

    static components = {
        'doc-applet': Applet
    };
}
