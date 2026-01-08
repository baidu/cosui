import {Component} from 'san';
import Placeholder from './placeholder.md';
import DefaultValue from './default-value.md';
import Appearance from './appearance.md';
import Size from './size.md';
import Slot from './slot.md';
import Disabled from './disabled.md';
import Clear from './clear.md';
import Count from './count.md';
import Err from './err.md';
import Maxlength from './maxlength.md';

export default class Doc extends Component {

    static template = `
        <template>
            <cos-input-appearance/>
            <cos-input-placeholder/>
            <cos-input-default-value/>
            <cos-input-disabled/>
            <cos-input-clear/>
            <cos-input-count/>
            <cos-input-err/>
            <cos-input-maxlength/>
            <cos-input-size/>
            <cos-input-slot/>
        </template>
    `;

    static components = {
        'cos-input-appearance': Appearance,
        'cos-input-placeholder': Placeholder,
        'cos-input-default-value': DefaultValue,
        'cos-input-size': Size,
        'cos-input-slot': Slot,
        'cos-input-disabled': Disabled,
        'cos-input-clear': Clear,
        'cos-input-count': Count,
        'cos-input-err': Err,
        'cos-input-maxlength': Maxlength
    };
}
