import {Component} from 'san';
import './icon.less';

export default class UpIcon extends Component {
    static template = `
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="icon">
            <g id="up">
                <path
                    id="up-icon-path"
                    d="M12.9142 11.0852L8.20945 6.38038C8.09371 6.26467 7.90613 6.26467
                    7.79039 6.38038L3.08562 11.0852L2.24756 10.2471L6.95235 5.54233C7.5309
                    4.96375 8.46894 4.96375 9.04749 5.54233L13.7523 10.2471L12.9142 11.0852Z"/>
            </g>
        </svg>
    `;

    initData() {
        return {};
    }
}
