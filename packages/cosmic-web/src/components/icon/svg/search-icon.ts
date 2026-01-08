import {Component} from 'san';
import './icon.less';

export default class SearchIcon extends Component {
    static template = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10.5522 3.95267C8.72976 2.13022 5.775 2.13022 3.95255 3.95267C2.1301 5.77512 2.1301
            8.72989 3.95255 10.5523C5.775 12.3748 8.72976 12.3748 10.5522 10.5523C12.3747 8.72989
            12.3747 5.77512 10.5522 3.95267ZM3.00974 3.00986C5.35289 0.666716 9.15188 0.666716 11.495
            3.00986C13.6788 5.19367 13.8273 8.64205 11.9405 10.9978L14.3234 13.3808L13.3806 14.3236L10.9977
            11.9407C8.64193 13.8275 5.19355 13.679 3.00974 11.4951C0.666594 9.152 0.666594 5.35301 3.00974 3.00986Z"
            fill="currentColor"/>
        </svg>
    `;

    initData() {
        return {};
    }
}