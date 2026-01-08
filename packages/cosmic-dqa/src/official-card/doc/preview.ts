import {Component} from 'san';
import DefaultDemo from './default.md';
import NoLogoDemo from './no-logo.md';
import MultiDemo from './multi.md';
import NoBgDemo from './no-bg.md';
import Centered from './centered.md';

export default class Preview extends Component {
    static template = `
        <div>
            <multi-demo />
            <demo />
            <no-logo-demo />
            <no-bg-demo />
            <centered />
        </div>
    `;
    static components = {
        'multi-demo': MultiDemo,
        'demo': DefaultDemo,
        'no-logo-demo': NoLogoDemo,
        'no-bg-demo': NoBgDemo,
        'centered': Centered
    };
}