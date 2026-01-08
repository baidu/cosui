import {Component} from 'san';
import Basic from './basic.md';
import ImageWithButton from './image-with-button.md';

export default class Preview extends Component {

    static template = `
        <div>
            <doc-basic />
            <doc-image-with-button />
        </div>
    `;

    static components = {
        'doc-basic': Basic,
        'doc-image-with-button': ImageWithButton
    };
}
