import {Component} from 'san';
import filled from './filled.md';
import size from './size.md';
import icon from './icon.md';
import image from './image.md';
import Default from './default.md';


export default class Doc extends Component {
    static template = `
        <template>
            <default/>
            <icon/>
            <size/>
            <image/>
        </template>
    `;

    static components = {
        'default': Default,
        'filled': filled,
        'icon': icon,
        'size': size,
        'image': image
    };
}
