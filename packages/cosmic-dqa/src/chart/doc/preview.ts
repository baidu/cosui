import {Component} from 'san';
import PieChartDemo from './pie-chart.md';
import LineChartDemo from './line-chart.md';
import BarChartDemo from './bar-chart.md';

export default class Preview extends Component {
    static template = `
        <div  style="display: flex; flex-direction: column; gap: 20px; position: relative;">
            <bar-chart-demo />
            <line-chart-demo />
            <pie-chart-demo />
        </div>
    `;

    static components = {
        'pie-chart-demo': PieChartDemo,
        'line-chart-demo': LineChartDemo,
        'bar-chart-demo': BarChartDemo
    };
}
