import {Component} from 'san';
import MlShopAddress from './md/directive/ml-shop-address/preview.md';
import MlShopAddressReadme from './md/directive/ml-shop-address/readme.md';
import MlShopAddressApi from './md/directive/ml-shop-address/api.md';


export default class MlShopAddressCom extends Component {

    static template = `
        <div>
            <ml-shop-address-readme />
            <ml-shop-address />
            <ml-shop-address-api />
        </div>
    `;

    static components = {
        'ml-shop-address-readme': MlShopAddressReadme,
        'ml-shop-address': MlShopAddress,
        'ml-shop-address-api': MlShopAddressApi
    };
}