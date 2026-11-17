import {Component} from 'san';
import Basic from './basic.md';
import Source from './source.md';
import ThumbnailRatio from './thumbnail-ratio.md';
import HighResolution from './high-resolution.md';
import LongList from './long-list.md';

export default class Preview extends Component {
    static template = `
        <template>
            <basic />
            <source-demo />
            <thumbnail-ratio />
            <high-resolution />
            <long-list />
        </template>
    `;

    static components = {
        'basic': Basic,
        'source-demo': Source,
        'thumbnail-ratio': ThumbnailRatio,
        'high-resolution': HighResolution,
        'long-list': LongList
    };
}
