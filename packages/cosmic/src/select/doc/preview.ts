import {Component} from 'san';
import Basic from './basic.md';
import Multi from './multi.md';
import Group from './group.md';
import Value from './value.md';
import Entry from './entry.md';
import Search from './search.md';

export default class Doc extends Component {
    static template = `
        <template>
            <basic-demo />
            <multi-demo />
            <group-demo />
            <value-demo />
            <entry-demo />
            <search-demo />
        </template>
    `;

    static components = {
        'basic-demo': Basic,
        'multi-demo': Multi,
        'group-demo': Group,
        'value-demo': Value,
        'entry-demo': Entry,
        'search-demo': Search
    };
}
