import {Component} from 'san';
import Prism from 'prismjs';
import pcStyle from '../../pc.less?inline';
import mobileStyle from '../../mobile.less?inline';
import Icon from '@cosui/cosmic/icon';
import './content.less';

export default class Content extends Component {
    static template = `
        <section class="main-container" on-highlight="highlight">
            <div id="pc-style" style="display: none;">{{pcStyle}}</div>
            <div id="mobile-style" style="display: none;">{{mobileStyle}}</div>
            <article class="{{content ? 'markdown' : ''}}">
                <div class="markdown-section">
                <!--bca-disable-next-line-->
                    {{content | raw}}
                </div>
                <div id="content"></div>
            </article>
        </section>
    `;

    static components = {
        'cos-icon': Icon
    };

    initData() {
        return {
            content: '',
            pcStyle,
            mobileStyle
        };
    }

    highlight(e: CustomEvent) {
        const node = e.detail;
        node && Prism.highlightElement(node);
    }

}