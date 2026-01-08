import {Component} from 'san';
import Basic from './basic.md';
import Multiple from './multiple.md';
import HeaderCustom from './header-custom.md';
import Operation from './operation.md';
export default class Doc extends Component {
    static template = `
        <template>
            <cos-accordion-basic/>
            <cos-accordion-multiple />
            <cos-accordion-header-custom />
            <cos-accordion-operation />
        </template>
    `;

    static components = {
        'cos-accordion-basic': Basic,
        'cos-accordion-multiple': Multiple,
        'cos-accordion-header-custom': HeaderCustom,
        'cos-accordion-operation': Operation
    };
}