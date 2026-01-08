import {Component} from 'san';
import DefaultDemo from './default.md';
import MultiDemo from './multi.md';
import MultiBottomDemo from './multi-bottom.md';

export default class Preview extends Component {
    static template = `
        <div>
            <default />
            <multi />
            <multi-bottom />
        </div>
    `;
    static components = {
        'default': DefaultDemo,
        'multi': MultiDemo,
        'multi-bottom': MultiBottomDemo
    };
}