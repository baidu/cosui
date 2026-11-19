# Children 子节点

children 用于设置子节点。

|形式|说明|
|---|---|
|children: Array<string \| ComponentNode>|字符串引用组件 ID；ComponentNode 直接定义子组件，需提供 id 和 type；两种形式可以混用|

**推荐优先使用组件 `id` 引用子节点，组件结构更清晰，也便于复用和单独更新。**

## 示例效果
