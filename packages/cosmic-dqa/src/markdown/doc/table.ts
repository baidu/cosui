import {Component} from 'san';
import table from './md/base/table/preview.md';
import tableReadme from './md/base/table/readme.md';

export default class TableCom extends Component {

    static template = `
        <div>
            <tableReadme />
            <table />
        </div>
    `;

    static components = {
        'tableReadme': tableReadme,
        'table': table
    };
}