import {Component} from 'san';
import {Button} from '@cosui/cosmic';
import './homepage.less';
import GenerativeUI from './assets/generative-ui.svg';
import Logo from './assets/logo.svg';
import Products from './assets/products.svg';
import Sdk from './assets/sdk.svg';
import System from './assets/system.svg';
import UIComponent from './assets/ui-components.svg';
import UIProtocol from './assets/ui-protocol.svg';
import AIChat from './assets/ai-chat.svg';

export default class HomePage extends Component {
    static template = `
    <div class="co-site-overview">
        <section class="overview-hero">
            <div class="overview-hero-container">
                <div class="overview-hero-content">
                    <div class="overview-hero-content-inner">
                        <div class="overview-hero-text">
                            <h1 class="overview-hero-title">
                                Cosui
                            </h1>
                            <p class="overview-hero-title-primary">
                                一套面向 AI 时代的前端 UI 解决方案，包含 UI 协议、解析渲染 SDK 与 UI 组件库等，可应用于生成式 UI、智能体、AI 对话等多种大模型场景。
                            </p>
                        </div>
                    </div>
                </div>
                <div class="overview-hero-actions">
                    <a href="/protocol/overview">
                        <cos-button class="overview-hero-button overview-hero-button-primary">
                            协议接入
                        </cos-button>
                    </a>
                    <a href="/components/cosmic/introduction">
                        <cos-button class="overview-hero-button overview-hero-button-secondary" appearance="secondary">
                            组件使用
                        </cos-button>
                    </a>
                </div>
            </div>
        </section>

        <section class="overview-section bg-card">
            <div class="overview-section-container">
            <div class="overview-section-header">
                <h2 class="overview-section-title">Cosui 因此而生</h2>
            </div>
            <div class="overview-grid-container">
                <div class="overview-grid">
                <Card class="overview-card">
                    <h3 class="overview-card-title">为什么需要 Cosui ？</h3>
                    <p class="overview-card-description">
                        随着 AI 对话、生成式搜索、智能体等形态成为主流，界面正在从「人为设计」转向「由模型生成」。
                    </p>
                    <p class="overview-card-description">
                        传统 UI 体系难以直接承接模型输出，UI 描述、业务数据与渲染逻辑强耦合，容易让生成结果缺乏可控性、复用性与可维护性。
                    </p>
                </Card>
                <Card class="overview-card">
                    <h3 class="overview-card-title">Cosui 的价值</h3>
                    <p class="overview-card-description">
                        Cosui 以 UI 协议为核心，将 UI 的生成、解析与渲染彻底解耦。
                    </p>
                    <p class="overview-card-description">
                        为 AI 场景提供一套稳定、可扩展的前端基础设施，解决生成式 UI 的工程化难题。
                    </p>
                </Card>
                </div>
            </div>
            </div>
        </section>

        <section class="overview-section bg-card">
            <div class="overview-section-container">
            <div class="overview-section-header">
                <h2 class="overview-section-title">UI 协议</h2>
            </div>
            <div class="overview-grid-container">
                <div class="overview-grid">
                <Card class="overview-card">
                    <h3 class="overview-card-title">Markdown 扩展协议</h3>
                    <p class="overview-card-description">
                        叙事/流式优先的协议，原生富文本并通过 Directive 提供结构化扩展。
                    </p>
                    <p class="overview-card-description">
                        适用于线性叙事流、流式生成、图文混排、标准组件快速调用。
                    </p>
                </Card>
                <Card class="overview-card">
                    <h3 class="overview-card-title">JSON 协议</h3>
                    <p class="overview-card-description">
                        结构化的组件描述协议，UI Schema + Data Model 描述视图、数据、事件与逻辑。
                    </p>
                    <p class="overview-card-description">
                        适用于高精度布局、复杂表单/多状态联动、对话式、需要显式逻辑控制的界面。
                    </p>
                </Card>
                </div>
            </div>
            </div>
        </section>

        <section class="overview-section bg-card">
            <div class="overview-section-container">
            <div class="overview-section-header">
                <h2 class="overview-section-title">核心体验</h2>
            </div>
            <div class="overview-grid-container">
                <div class="overview-grid">
                <Card class="overview-card">
                    <h3 class="overview-card-title">
                        <img src=${UIProtocol} alt="ui 协议"/>
                        UI 协议
                    </h3>
                    <p class="overview-card-description">
                        • 面向 AI 输出设计的语义化 UI 协议
                    </p>
                    <p class="overview-card-description">
                        • Markdown 扩展协议与 JSON 结构化协议
                    </p>
                    <p class="overview-card-description">
                        • 用数据描述界面，而非直接拼接 UI 代码
                    </p>
                </Card>
                <Card class="overview-card">
                    <h3 class="overview-card-title">
                        <img src=${Sdk} alt="sdk"/>
                        解析与渲染 SDK
                    </h3>
                    <p class="overview-card-description">
                        • 标准协议参考实现
                    </p>
                    <p class="overview-card-description">
                        • 支持流式渲染、复杂交互、多端适配
                    </p>
                    <p class="overview-card-description">
                        • 将协议安全地映射为真实可交互 UI
                    </p>
                </Card>
                <Card class="overview-card">
                    <h3 class="overview-card-title">
                        <img src=${UIComponent} alt="UI 组件库"/>
                        UI 组件库
                    </h3>
                    <p class="overview-card-description">
                        • 覆盖基础组件、行业组件与 AI 场景组件
                    </p>
                    <p class="overview-card-description">
                        • 同时适配 PC / Mobile 端
                    </p>
                    <p class="overview-card-description">
                        • 支持多主题、多业务线复用
                    </p>
                </Card>
                </div>
            </div>
            </div>
        </section>

        <section class="overview-section">
            <div class="overview-section-container">
            <div class="overview-section-header">
                <h2 class="overview-section-title">实践与验证</h2>
            </div>
            <div class="overview-stats-container">
                <div class="overview-stat-item">
                    <div class="overview-stat-value primary">2 套</div>
                    <div class="overview-stat-label">UI 协议及解析渲染</div>
                </div>
                <div class="overview-stat-item">
                    <div class="overview-stat-value primary">5 套</div>
                    <div class="overview-stat-label">业务线主题适配</div>
                </div>
                <div class="overview-stat-item">
                    <div class="overview-stat-value primary">80+</div>
                    <div class="overview-stat-label">UI 组件覆盖全场景</div>
                </div>
                <div class="overview-stat-item">
                    <div class="overview-stat-value primary">亿级</div>
                    <div class="overview-stat-label">流量场景稳定支撑</div>
                </div>
            </div>
            <div class="overview-use-case">
                <Card class="overview-card">
                    <h3 class="overview-card-title">
                        <img src=${GenerativeUI} alt="生成式 UI"/>
                        生成式 UI
                    </h3>
                    <p class="overview-card-description">
                        AI 动态生成界面，根据用户需求实时创建个性化 UI
                    </p>
                </Card>
                <Card class="overview-card">
                    <h3 class="overview-card-title">
                        <img src=${AIChat} alt="AI 对话"/>
                        AI 对话
                    </h3>
                    <p class="overview-card-description">
                        智能对话界面，支持富文本、卡片、表格等多种内容形式
                    </p>
                </Card>
                <Card class="overview-card">
                    <h3 class="overview-card-title">
                        <img src=${Products} alt="行业产品"/>
                        行业产品
                    </h3>
                    <p class="overview-card-description">
                        教育、医疗、金融等行业的 AI 产品界面解决方案
                    </p>
                </Card>
                <Card class="overview-card">
                    <h3 class="overview-card-title">
                        <img src=${System} alt="企业级系统" />
                        企业级系统
                    </h3>
                    <p class="overview-card-description">
                        企业内部 AI 助手、知识库、工作流等系统的 UI 支撑
                    </p>
                </Card>
            </div>
            </div>
        </section>

        <section class="overview-section">
            <div class="overview-section-container">
                <div class="overview-section-logo">
                    <img src=${Logo} alt="cosui"/>
                </div>

                <div class="overview-section-header">
                    <h2 class="overview-section-title">
                        持续演进的 AI UI 基础设施
                    </h2>
                </div>

                <p class="overview-section-description">
                    AI 时代的界面正在不断演变，Cosui 也会持续更新，未来将提供更多功能与套件，为 AI 应用提供更多稳健的基础能力，让大家能更轻松地实现 AI 产品。
                </p>
            </div>
        </section>
    </div>

    `;

    static components = {
        'cos-button': Button
    };
}
