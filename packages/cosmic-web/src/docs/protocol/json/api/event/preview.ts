import {Component} from 'san';
import Event from './event.md';

export default class Preview extends Component {

    static template = `
        <div>
            <doc-event />
        </div>
    `;

    static components = {
        'doc-event': Event
    };
}
