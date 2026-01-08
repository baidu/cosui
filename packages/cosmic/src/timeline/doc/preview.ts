import {Component} from 'san';
import Basic from './default.md';
import Size from './size.md';
import Appearance from './item-appearance.md';
import TextClass from './text-class.md';
import FoldTimeline from './fold.md';

export default class TextareaDoc extends Component {

    static template = `
        <div>
            <cos-timeline-basic />
            <cos-timeline-size />
            <cos-timeline-appearance />
            <cos-timeline-itemclass />
            <cos-timeline-fold />
        </div>
    `;

    static components = {
        'cos-timeline-basic': Basic,
        'cos-timeline-size': Size,
        'cos-timeline-appearance': Appearance,
        'cos-timeline-itemclass': TextClass,
        'cos-timeline-fold': FoldTimeline
    };
}
