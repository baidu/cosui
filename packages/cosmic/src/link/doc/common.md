```san export=preview caption=普通场景a标签跳转
import {Component} from 'san';


export default class Demo extends Component {
    static template = `
        <div>
            <div>
                <p>a标签示例</p>
                <a class="cos-link" href="{{jumpUrl}}">示例链接</a>
            </div>
            <div>
                <p>a标签button样式示例</p>
                <a class="cos-link-button" href="{{jumpUrl}}">button样式链接</a>
            </div>
            <div>
                <p>href为空导致点击页面刷新</p>
                <a class="cos-link" href="">点击页面刷新</a>
            </div>
            <div>
                <p>最佳示例，兼容href为空导致点击页面刷新</p>
                <div
                    s-is="{{jumpUrl ? 'a' : 'div'}}"
                    class="cos-link cos-block"
                    href="{{jumpUrl}}">
                    最佳示例
                </div>
            </div>
            <div>
                <p>a 标签内渲染block内容需要设置成block</p>
                <div
                    s-is="{{jumpUrl ? 'a' : 'div'}}"
                    class="cos-link cos-block"
                    href="{{jumpUrl}}">
                        <div class="cos-link cos-block cos-color-bg-dent">block1</div>
                        <div class="cos-link cos-block cos-color-bg-primary">block2</div>
                        <div class="cos-link cos-block cos-color-bg-warning">block3</div>
                </div>
            </div>
        </div>
    `;

    initData() {
        return {
            jumpUrl: 'https://baidu.com',
        }
    };
}

```