import {Component} from 'san';
import Default from './default.md';
import Overscroll from './overscroll.md';
import AutoplayAndLoop from './autoplay-loop.md';
import AutoHeight from './auto-height.md';
import IndicatorAndSpace from './indicator-and-space.md';
import Snap from './snap.md';
import ActiveIndex from './active-index.md';
import Upsell from './upsell.md';
import Multiline from './multiline.md';
import AlignType from './align-type.md';
import ControlBottom from './control-bottom.md';
import Scrollable from './scrollable.md';

export default class Doc extends Component {

    static template = `
        <template>
            <cos-swiper-default />
            <cos-swiper-autoplay-loop />
            <cos-swiper-indicator-and-space />
            <cos-swiper-active-index />
            <cos-swiper-align-type />
            <cos-swiper-auto-height />
            <cos-swiper-snap />
            <cos-swiper-overscroll />
            <cos-swiper-upsell />
            <cos-swiper-multiline />
            <cos-swiper-control-bottom />
            <cos-swiper-scrollable />
        </template>
    `;

    static components = {
        'cos-swiper-default': Default,
        'cos-swiper-autoplay-loop': AutoplayAndLoop,
        'cos-swiper-indicator-and-space': IndicatorAndSpace,
        'cos-swiper-active-index': ActiveIndex,
        'cos-swiper-auto-height': AutoHeight,
        'cos-swiper-snap': Snap,
        'cos-swiper-overscroll': Overscroll,
        'cos-swiper-upsell': Upsell,
        'cos-swiper-multiline': Multiline,
        'cos-swiper-align-type': AlignType,
        'cos-swiper-control-bottom': ControlBottom,
        'cos-swiper-scrollable': Scrollable
    };
}
