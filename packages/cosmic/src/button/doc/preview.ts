import {Component} from 'san';
import Default from './default.md';
import Disabled from './disabled.md';
import Size from './size.md';
import Loading from './loading.md';

export default class Doc extends Component {

    static template = `
        <template>
            <cos-button-default/>
            <cos-button-size/>
            <cos-button-disabled/>
            <cos-loading/>
        </template>
    `;

    static components = {
        'cos-button-default': Default,
        'cos-button-disabled': Disabled,
        'cos-button-size': Size,
        'cos-loading': Loading
    };
}
