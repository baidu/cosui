import {Component} from 'san';
import Slot from './slot.md';
import Row from './row.md';
import Appearance from './appearance.md';
import Clear from './clear.md';
import Count from './count.md';
import Disabled from './disabled.md';
import Err from './err.md';
import Height from './height.md';
import MaxHeight from './max-height.md';
import AutoHeightWithClear from './auto-height-with-clear.md';
import textareaWithButton from './textarea-with-button.md';

export default class TextareaDoc extends Component {

    static template = `
        <div>
            <cos-textarea-appearance/>
            <cos-textarea-disabled/>
            <cos-textarea-clear/>
            <cos-textarea-count/>
            <cos-textarea-row/>
            <cos-textarea-err/>
            <cos-textarea-height/>
            <cos-textarea-max-height/>
            <cos-textarea-auto-height-with-clear/>
            <cos-textarea-slot/>
            <cos-textarea-with-button/>
        </div>
    `;

    static components = {
        'cos-textarea-slot': Slot,
        'cos-textarea-row': Row,
        'cos-textarea-appearance': Appearance,
        'cos-textarea-clear': Clear,
        'cos-textarea-count': Count,
        'cos-textarea-disabled': Disabled,
        'cos-textarea-err': Err,
        'cos-textarea-height': Height,
        'cos-textarea-max-height': MaxHeight,
        'cos-textarea-with-button': textareaWithButton,
        'cos-textarea-auto-height-with-clear': AutoHeightWithClear
    };
}
