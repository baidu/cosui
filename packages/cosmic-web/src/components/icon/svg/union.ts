import {Component} from 'san';
import './icon.less';

export default class UnionIcon extends Component {
    static template = `
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="icon">
            <path
                id="Union"
                d="
                    M4.16191 5.00021L0.432791 8.72933L1.27084 9.56738L4.99996 5.83826
                    L8.72909 9.56738L9.56714 8.72933L5.83802 5.00021L9.56714 1.27109
                    L8.72909 0.433034L4.99996 4.16216L1.27084 0.433034L0.432791 1.27109
                    L4.16191 5.00021Z
                "
                fill="currentColor"/>
        </svg>
    `;

    initData() {
        return {};
    }
}