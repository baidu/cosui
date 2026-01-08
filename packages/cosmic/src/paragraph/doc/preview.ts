/**
 * @file Paragraph doc demo
 */

import {Component} from 'san';
import Basic from './basic.md';
import Clamp from './clamp.md';
import HighlightRed from './highlight-red.md';
import Details from './details.md';
import PrefixAndSuffix from './prefix-and-suffix.md';
import SpacingNone from './spacing-none.md';
import SpacingParagraphs from './spacing-paragraphs.md';
import SpacingNext2Div from './spacing-next2div.md';
import SpacingNested from './spacing-nested.md';

export default class Preview extends Component {

    static template = `
        <div>
            <basic/>
            <clamp/>
            <highlight-red/>
            <details/>
            <prefix-and-suffix/>
            <spacing-none/>
            <spacing-paragraphs/>
            <spacing-next2div/>
            <spacing-nested/>
        </div>
    `;

    static components = {
        'basic': Basic,
        'clamp': Clamp,
        'highlight-red': HighlightRed,
        'details': Details,
        'prefix-and-suffix': PrefixAndSuffix,
        'spacing-none': SpacingNone,
        'spacing-paragraphs': SpacingParagraphs,
        'spacing-next2div': SpacingNext2Div,
        'spacing-nested': SpacingNested
    };
}
