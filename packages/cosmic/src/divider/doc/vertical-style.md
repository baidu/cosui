```san export=preview caption=垂直divider
import {Component} from 'san';

export default class Demo extends Component {
    static template = `
        <div style="height: 50px">
            <span>{{content}}</span>
            <div class="cos-divider-vertical" style="height: 30px"/>
            <span>{{content}}</span>
            <div class="cos-divider-vertical"/>
            <span>{{content}}</span>
        </div>
    `;
  
    initData() {
        return {
            content: '简单可依赖'
        }
    }
}
```