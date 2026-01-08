import {Component} from 'san';
import Table from './table.md';

export default class Doc extends Component {
    static template = `
        <div>
            <table />
        </div>
    `;

    static components = {
        'table': Table
    };
}