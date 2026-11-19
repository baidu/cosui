# exportCatalog

**预定义 Catalog**：[Catalog 章节](/protocol/json/v2/concept/catalog)

exportCatalog 用于将 自定义声明的 Catalog 导出为 JSON Catalog，供 Agent 或其他系统读取。

|名称|说明|
|---|---|
|exportCatalog(catalog: RuntimeCatalog): Catalog|导出可序列化的 Catalog|

## 返回值

返回可序列化的 Catalog，包含基本信息、Component、Action 和公共 Schema 定义，可通过 JSON.stringify 转换为 JSON 字符串。

## 按业务入口导出

exportCatalog 导出所传入的 RuntimeCatalog。选择业务入口后，导出结果只包含该入口声明的组件、动作和公共定义。

```ts
import {defineCatalog, exportCatalog} from '@cosui/cosmic-dynamic-ui';

const customCatalog = defineCatalog({
    $id: 'custom.v2',
    version: '2.0',
    components: {},
    actions: {}
});

const modelInput = JSON.stringify(exportCatalog(customCatalog));
```

运行时入口及对应的构建产物详见[Catalog 章节](/protocol/json/v2/concept/catalog)。

无需运行时导出时，也可直接读取包中的预生成 JSON：

```js
const catalog = require('@cosui/cosmic-catalog/catalog.dqa.json');
```

构建产物位于 cosmic-catalog 的 `dist/` 目录。文档站点通过 `scripts/sync-catalog.ts` 自动同步
`catalog.json` 和 `catalog.<业务>.json`。应将选定入口的 Catalog 下发给模型，并在宿主中配置同一入口，
避免发送全量 Catalog 后让模型选择宿主不支持的业务组件。

## 示例效果
