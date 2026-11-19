# cosmic-catalog

Cosmic 动态 UI 的组件协议定义。以 Zod Schema 声明每个组件的属性、事件与默认值，构建产出统一的 JSON Schema Catalog，供大模型按协议生成合法的 UI 消息，同时供渲染侧做校验兜底。

核心能力：

- **一份协议，两侧共用**：模型侧依据 Catalog 生成协议消息，渲染侧依据同一 Catalog 校验与补默认值
- **按业务裁剪**：提供全量 / base / dqa / chat 等入口，只下发业务所需组件，控制 token 体积
- **严格可校验**：strictObject + JSON Schema Draft 2020-12 导出，非法字段在消息阶段即被拦截

# 安装

```
npm i @cosui/cosmic-catalog
```

# 使用

直接使用预置 Catalog，注入渲染器即可：

```ts
import {CATALOG} from '@cosui/cosmic-catalog';
import {AppletContext} from '@cosui/cosmic-dynamic-ui';

// 组件实现由宿主按需注册
const context = new AppletContext({catalog: CATALOG, components, actions});
```

自定义 Catalog：在预置组件基础上扩展自己的组件协议，再导出为 JSON 下发给模型：

```ts
import {z} from 'zod';
import {defineCatalog, exportCatalog} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog';

const base = CATALOG.definition;

const catalog = defineCatalog({
    ...base,
    $id: 'my-app.v2',
    components: {
        ...base.components,
        // 自定义组件：用 Zod 声明属性与事件
        WeatherCard: {
            description: '天气卡片：展示城市与温度，点击刷新',
            props: z.strictObject({
                city: z.string().describe('城市名'),
                temperature: z.number().describe('温度，单位 ℃')
            }),
            events: {
                refresh: z.unknown()
            }
        }
    }
});

// 导出 JSON 下发给模型；渲染侧用同一个 catalog 对象校验
const jsonCatalog = exportCatalog(catalog);
```

按业务选择入口（全量 / 业务按需入口），将对应 JSON Catalog 下发给 Agent。

# 官网
[官网](https://cosmic.now.baidu-int.com/)

# License
Apache License 2.0
