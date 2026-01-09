import {Component} from 'san';
import {Link} from '../../../../utils/proxy-router';
import './card.less';
import imageGroups from './preview-images.config';

export default class Card extends Component {
    static template = `
        <co-link to="{{key}}">
            <div class="card">
                <div class="name-container">
                    <div class="eng">{{eng}}</div>
                    <div class="chin">{{chin}}</div>
                </div>
                <div class="image">
                    <img src="{{imageSrc}}" />
                </div>
            </div>
        </co-link>
    `;

    static components = {
        'co-link': Link
    };

    static computed = {
        key(this: Card): string {
            return this.data.get('key');
        },
        chin(this: Card): string {
            return this.data.get('chin');
        },
        eng(this: Card): string {
            return this.data.get('eng');
        },
        imageSrc(this: Card): string {
            const key = this.data.get('key');
            const imageGroup = imageGroups.find(item => item.name === key);
            return imageGroup ? imageGroup.src : '';
        }
    };
}