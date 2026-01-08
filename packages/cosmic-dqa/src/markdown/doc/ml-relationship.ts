import {Component} from 'san';
import MlRelationship from './md/directive/ml-relationship/preview.md';
import MlRelationshipApi from './md/directive/ml-relationship/api.md';
import MlRelationshipReadme from './md/directive/ml-relationship/readme.md';

export default class MlRelationshipCom extends Component {

    static template = `
        <div>
            <ml-relationship-readme />
            <ml-relationship />
            <ml-relationship-api />
        </div>
    `;

    static components = {
        'ml-relationship-readme': MlRelationshipReadme,
        'ml-relationship': MlRelationship,
        'ml-relationship-api': MlRelationshipApi
    };
}