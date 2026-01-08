import {Component} from 'san';
import development from './md/development.md';

export default class developmentCom extends Component {

    static template = `
        <div>
            <development />
        </div>
    `;

    static components = {
        'development': development
    };
}