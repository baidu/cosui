import {Component} from 'san';
import PieChartDemo from './pie-chart.md';
import LineChartDemo from './line-chart.md';
import BarChartDemo from './bar-chart.md';
import MapChartDemo from './map-chart.md';
import RadarChartDemo from './radar-chart.md';

export default class Preview extends Component {
    static template = `
        <div  style="display: flex; flex-direction: column; gap: 20px; position: relative;">
            <bar-chart-demo />
            <line-chart-demo />
            <pie-chart-demo />
            <map-chart-demo />
            <radar-chart-demo />
        </div>
    `;

    static components = {
        'pie-chart-demo': PieChartDemo,
        'line-chart-demo': LineChartDemo,
        'bar-chart-demo': BarChartDemo,
        'map-chart-demo': MapChartDemo,
        'radar-chart-demo': RadarChartDemo,
    };
}
