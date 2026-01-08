import {Component} from 'san';
import DefaultDemo from './default.md';
import TwoDemo from './two.md';
import MultiDemo from './multi.md';

export default class Preview extends Component {
    static template = `
        <div>
            <demo />
            <two />
            <multi />
        </div>
    `;
    static components = {
        'demo': DefaultDemo,
        'two': TwoDemo,
        'multi': MultiDemo
    };
}