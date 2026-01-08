/**
 * @file Title doc demo
 */

import {Component} from 'san';
import Size from './size.md';
import Clamp from './clamp.md';
import DefaultSlot from './default-slot.md';
import Underline from './underline.md';
import Url from './url.md';
import Tag from './tag.md';
import Icon from './icon.md';
import CustomIcon from './custom-icon.md';
import IconAndTextSuffix from './icon-and-text-suffix.md';
import Bold from './bold.md';
import PrefixText from './prefix-text.md';
import Click from './click.md';
import ClampBeforeSuffix from './clmap-before-suffix.md';

export default class Preview extends Component {

    static template = `
        <div>
            <default-slot/>
            <size/>
            <clamp/>
            <underline/>
            <url/>
            <tag/>
            <icon/>
            <custom-icon/>
            <icon-and-text-suffix/>
            <bold/>
            <prefix-text/>
            <click/>
            <clamp-before-suffix/>
        </div>
    `;

    static components = {
        'default-slot': DefaultSlot,
        'clamp': Clamp,
        'size': Size,
        'underline': Underline,
        'url': Url,
        'tag': Tag,
        'icon': Icon,
        'custom-icon': CustomIcon,
        'icon-and-text-suffix': IconAndTextSuffix,
        'bold': Bold,
        'prefix-text': PrefixText,
        'click': Click,
        'clamp-before-suffix': ClampBeforeSuffix
    };
}
