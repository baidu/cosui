import {Component} from 'san';
import Catalog from './catalog.md';

export default class V2CatalogConcept extends Component {
    static template = `
        <div>
            <doc-catalog />
        </div>
    `;

    static components = {
        'doc-catalog': Catalog
    };
}
