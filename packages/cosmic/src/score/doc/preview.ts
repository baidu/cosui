/**
 * @file Score doc demo
 */

import {Component} from 'san';
import Default from './default.md';
import ChangeValue from './change-value.md';
import Common from './common.md';
import Size from './size.md';
import MultipleScoreShowLabels from './multiple-score-show-labels.md';


export default class Doc extends Component {
    static template = `
        <template>
            <cos-common />
            <cos-score-default />
            <cos-change-value />
            <cos-score-size />
            <cos-multiple-score-show-labels />
        </template>
    `;

    static components = {
        'cos-score-default': Default,
        'cos-change-value': ChangeValue,
        'cos-common': Common,
        'cos-score-size': Size,
        'cos-multiple-score-show-labels': MultipleScoreShowLabels
    };
}