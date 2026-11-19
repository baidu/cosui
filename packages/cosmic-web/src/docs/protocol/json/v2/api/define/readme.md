# defineCatalog

defineCatalog 用于定义 Catalog，声明可用的 Component、Action 及其参数规则。返回的 Catalog 可直接配置到 AppletContext。

|名称|说明|
|---|---|
|defineCatalog(definition: CatalogDefinition): RuntimeCatalog|创建运行时 Catalog|

## CatalogDefinition

|字段|类型|是否必选|说明|
|---|---|---|---|
|$id|string|是|Catalog 的唯一标识|
|version|'2.0'|是|对应的协议版本|
|title|string|否|Catalog 标题|
|description|string|否|Catalog 说明|
|usage|string|否|面向 Agent / LLM 的 Markdown 使用说明：协议用途、生成规则与示例|
|components|Record<string, ComponentDefinition>|是|Component 及其 Props、Children 和 Event 定义|
|actions|Record<string, ActionDefinition>|是|Action 及其参数定义|
|$defs|Record<string, ZodType>|否|可复用的数据规则|

## 返回值

返回 RuntimeCatalog，可作为 AppletContext 的 catalog 配置。

## 使用预定义的业务 Catalog

`@cosui/cosmic-catalog` 已通过 defineCatalog 定义多个入口，每个入口均导出 `CATALOG`，可直接使用。

各业务入口及其组件范围详见 [Catalog 章节](/protocol/json/v2/concept/catalog)。

```ts
import {AppletContext} from '@cosui/cosmic-dynamic-ui';
import {CATALOG} from '@cosui/cosmic-catalog/dqa';

const context = new AppletContext({catalog: CATALOG, components, actions});
```

按业务选择入口，可以减少不需要的组件定义、包体积和模型输入 token。模型侧与宿主侧应使用同一入口；
宿主仍需注册对应组件和动作的实现。全量入口的 `$id` 为 `cosui.v2`，业务入口分别为
`cosui.v2.base`、`cosui.v2.dqa`，协议版本均为 `2.0`。

自定义组件或业务能力时，继续使用 defineCatalog 定义自己的 Catalog。

## 示例效果
