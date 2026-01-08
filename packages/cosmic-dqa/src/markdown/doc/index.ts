import {Component} from 'san';
import Api from './api.md';
import Base from './md/base/base/base.md';
import Typing from './md/typing.md';
import Code from './md/base/base/code.md';
import Img from './md/base/img/preview.md';
import Latex from './md/base/latex/preview.md';
import Link from './md/base/link/preview.md';
import Table from './md/base/table/preview.md';
import MlBrief from './md/directive/ml-brief/preview.md';
import MlCopy from './md/directive/ml-copy/preview.md';
import MlSearch from './md/directive/ml-search/preview.md';
import MlSearchMore from './md/directive/ml-search-more/preview.md';
import MlTagLink from './md/directive/ml-tag-link/preview.md';
import MlText from './md/directive/ml-text/preview.md';
import MlCitation from './md/directive/ml-citation/preview.md';
import MlCitationsText from './md/directive/ml-citation-text/preview.md';
import MlAudio from './md/directive/ml-audio/preview.md';
import MlTTS from './md/directive/ml-tts/preview.md';
import MlPoi from './md/directive/ml-poi/preview.md';
import MlRelationship from './md/directive/ml-relationship/preview.md';
import MlShopAddress from './md/directive/ml-shop-address/preview.md';
import MlSiteVCard from './md/directive/ml-site-vcard/preview.md';
import Readme from './md/readme.md';

export default class ComponentDoc extends Component {

    static template = `
        <div>
            <doc-readme />
            <doc-base />
            <doc-typing />
            <doc-code />
            <doc-img />
            <doc-latex />
            <doc-link />
            <doc-table />
            <doc-ml-brief />
            <doc-ml-copy />
            <doc-ml-search />
            <doc-ml-search-more />
            <doc-ml-tag-link />
            <doc-ml-text />
            <doc-ml-citation />
            <doc-ml-citation-text />
            <doc-ml-audio />
            <doc-ml-tts />
            <doc-ml-poi />
            <doc-ml-relationship />
            <doc-ml-shop-address />
            <doc-ml-site-vcard />
            <doc-api />
        </div>
    `;

    static components = {
        'doc-api': Api,
        'doc-base': Base,
        'doc-typing': Typing,
        'doc-code': Code,
        'doc-img': Img,
        'doc-latex': Latex,
        'doc-link': Link,
        'doc-table': Table,
        'doc-ml-brief': MlBrief,
        'doc-ml-copy': MlCopy,
        'doc-ml-search': MlSearch,
        'doc-ml-search-more': MlSearchMore,
        'doc-ml-tag-link': MlTagLink,
        'doc-ml-text': MlText,
        'doc-ml-citation': MlCitation,
        'doc-ml-citation-text': MlCitationsText,
        'doc-ml-audio': MlAudio,
        'doc-ml-tts': MlTTS,
        'doc-ml-poi': MlPoi,
        'doc-ml-relationship': MlRelationship,
        'doc-ml-shop-address': MlShopAddress,
        'doc-ml-site-vcard': MlSiteVCard,
        'doc-readme': Readme
    };
}