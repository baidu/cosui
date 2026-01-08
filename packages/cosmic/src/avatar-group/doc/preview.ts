import {Component} from 'san';
import Default from './default.md';
import Animate from './animate.md';

export default class Doc extends Component {
    static template = `
        <template>
            <cos-avatar-group-default/>
            <cos-avatar-group-animate/>
        </template>
    `;

    static components = {
        'cos-avatar-group-default': Default,
        'cos-avatar-group-animate': Animate
    };
}