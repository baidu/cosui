```san export=preview  caption=常用样式
import {Component} from 'san';
import Tag from '@cosui/cosmic/tag';
import Icon from '@cosui/cosmic/icon';
import './default.less'

export default class TagDemo extends Component {

    static template = `
        <div data-testid="tag-default" class="tag-default-demo">
            <h4>注: 为确保 Tag 组件在安卓夜间模式下的展现效果，建议使用文档中推荐的 token 搭配方式。<br>
                除单字标签外，其余标签类型需统一遵循左右间距为 3px 的设计规范。</h4>
            <h4>一级强面标签</h4>
            <div>
                <cos-tag appearance="filled" class="cos-color-bg-primary">正版</cos-tag>
                <cos-tag appearance="filled" class="cos-color-bg-alive">风险</cos-tag>
            </div>
            <h4>二级弱面标签</h4>
            <div>
                <cos-tag appearance="filled" class="cos-color-text-on-warning-light cos-color-bg-warning-light">警示</cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-error-light cos-color-bg-error-light">风险</cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-success-light cos-color-bg-success-light">成功</cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-tiny-active cos-tag-color-bg">标签</cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-primary-light cos-color-bg-primary-light">标签</cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-alive-light cos-color-bg-alive-light">优惠信息</cos-tag>
            </div>
            <h4>三级纯文字标签</h4>
            <div>
                <cos-tag appearance="filled" class="cos-color-text-minor">标签</cos-tag>
                <cos-tag appearance="filled" style="color:var(--cos-amber-1, #D5890C)">标签</cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-error-light">标签</cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-primary-light">标签</cos-tag>
            </div>
            <h4>运营标签</h4>
            <div>
                <cos-tag appearance="filled" size="sm" class="new">新</cos-tag>
                <cos-tag appearance="filled" size="sm" class="hot">热</cos-tag>
                <cos-tag appearance="filled" size="sm" class="boil">沸</cos-tag>
                <cos-tag appearance="filled" size="sm" class="burst">爆</cos-tag>
                <cos-tag appearance="filled" size="sm" class="business">商</cos-tag>
                <cos-tag appearance="filled" size="sm" class="vip">VIP</cos-tag>
            </div>
            <h4>图片视频标签（该处示例仅作组件能力说明）</h4>
            <div class="tag-live-demo">
                <cos-tag appearance="filled" class="cos-color-bg-error tag-icon-only">
                    <div class="tag-live-demo-living">
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-first"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-second"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-third"></div>
                    </div>
                    <!-- 仅用于字体放大时示例tag only与字体上下文自适应右侧居中对齐 -->
                    <span style="font-size:0">1</span>
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-bg-error">
                    <div class="tag-live-demo-living">
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-first"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-second"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-third"></div>
                    </div>
                    直播中
                </cos-tag>
                <cos-tag appearance="filled">
                    <div class="tag-main-info cos-color-bg-error">
                        <div class="tag-live-demo-living">
                            <div class="tag-live-demo-living-line tag-live-demo-living-line-first"></div>
                            <div class="tag-live-demo-living-line tag-live-demo-living-line-second"></div>
                            <div class="tag-live-demo-living-line tag-live-demo-living-line-third"></div>
                        </div>
                    直播中
                    </div>
                    <div class="tag-detail-info cos-color-bg-inverse">21万观看</div>
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-error-light cos-color-bg-error-light">
                    <div class="tag-live-demo-living red-line">
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-first"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-second"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-third"></div>
                    </div>
                    直播中
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-error-light">
                    <div class="tag-live-demo-living red-line">
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-first"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-second"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-third"></div>
                    </div>
                    直播中
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-bg-inverse">
                    <cos-icon name="play-circle-fill"></cos-icon>
                    直播回放
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-bg-inverse">标签内容</cos-tag>
            </div>
            <div class="tag-live-demo">
                <cos-tag appearance="filled" class="cos-color-bg-primary">
                    <cos-icon name="clock"></cos-icon>
                    直播预告
                </cos-tag>
                <cos-tag appearance="filled">
                    <span class="tag-main-info cos-color-bg-primary">
                         <cos-icon name="clock"></cos-icon>
                        直播预告
                    </span>
                    <span class="tag-detail-info cos-color-bg-inverse">09-30 19:00开播</span>
                </cos-tag>
                <cos-tag appearance="filled" class="cos-tag-color-bg-overlay">
                    <div class="tag-live-demo-living">
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-first"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-second"></div>
                        <div class="tag-live-demo-living-line tag-live-demo-living-line-third"></div>
                    </div>
                    直播中
                </cos-tag>
            </div>
            <h4>榜单标签</h4>
            <div>
                <cos-tag appearance="filled" class="tag-rank">排行榜标签</cos-tag>
                <cos-tag appearance="filled" class="tag-rank-pl-none tag-rank">
                    <cos-icon name="top-list" class="tag-rank-icon tag-rank-icon-top-list"/>
                    榜单评分9.6
                </cos-tag>
                <cos-tag appearance="filled" class="tag-rank-pl-none tag-rank">
                    <cos-icon name="hot-fill" class="tag-rank-icon tag-rank-icon-hot-fill"/>
                    <a href="https://www.baidu.com" target="_blank" rel="noreferrer" class="tag-rank-link">
                        热门电视剧&nbsp;No.1
                        <cos-icon name="right"/>
                    </a>
                </cos-tag>
            </div>
        </div>
    `;

    static components = {
        'cos-tag': Tag,
        'cos-icon': Icon
    };

}

```
