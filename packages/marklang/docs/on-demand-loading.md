# Marklang 按需加载使用文档

## 概述

Marklang 支持按需加载插件功能，可以根据渲染内容自动检测并动态加载所需的插件（如数学公式、代码高亮），从而减小初始包体积，提升页面加载速度。

## 特性

- **自动检测**：根据 Markdown 内容自动判断是否需要加载特定插件
- **动态加载**：使用 `import()` 实现真正的运行时按需加载
- **插件缓存**：已加载的插件会被缓存，避免重复加载
- **实例缓存**：相同插件组合的 unified 实例会被缓存复用，避免重复创建

## 安装

```bash
npm install marklang
```

## 基本用法

### 1. 注册插件

首先需要注册需要按需加载的插件：

```typescript
import marklang from 'marklang';

// 注册数学公式插件
marklang.registerPlugin({
    name: 'math',
    feature: /\$\$[\s\S]*?\$\$|\$[^$\n]+\$/,  // 匹配 $...$ 或 $$...$$
    load: () => {
        return [
            import('marklang/plugins/remark-math'),
            import('marklang/plugins/rehype-katex')
        ];
    }
});

// 注册代码高亮插件
marklang.registerPlugin({
    name: 'highlight',
    feature: /```[\s\S]*?```/,  // 匹配代码块
    load: () => {
        return [import('marklang/plugins/rehype-highlight')];
    }
});
```

### 2. 异步渲染（推荐）

使用 `renderToElementAsync` 方法，会根据内容自动按需加载插件：

```typescript
import marklang from 'marklang';

const ml = marklang();

// 普通文本 - 不加载任何额外插件
await ml.renderToElementAsync('# Hello World', document.getElementById('app'));

// 包含数学公式 - 自动检测并加载 math 插件
await ml.renderToElementAsync('爱因斯坦公式：$E=mc^2$', document.getElementById('app'));

// 包含代码块 - 自动检测并加载 highlight 插件
await ml.renderToElementAsync('```javascript\nconst a = 1;\n```', document.getElementById('app'));

// 同时包含公式和代码 - 并行加载插件
const content = `
# 示例

公式：$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

代码：
\`\`\`python
print("Hello")
\`\`\`
`;
await ml.renderToElementAsync(content, document.getElementById('app'));
```

### 3. 同步渲染

如果需要使用同步的 `renderToElement` 方法，必须先预加载插件：

```typescript
import marklang from 'marklang';

const ml = marklang();

// 预加载所需插件（传入包含目标特征的内容即可触发加载）
await marklang.preloadPlugin('$E=mc^2$');

// 现在可以同步渲染（插件已加载完成）
ml.renderToElement('$E=mc^2$', document.getElementById('app'));
```

### 4. 获取 Unified 实例

如果需要更细粒度的控制，可以直接获取 unified 实例：

```typescript
import marklang from 'marklang';

const ml = marklang();

// 异步获取实例（会自动预加载插件）
const instance = await ml.getUnifiedInstance('$E=mc^2$');
const file = await instance.process('$E=mc^2$');
const html = String(file);
```

## 插件预加载

对于已知需要使用特定功能的场景，可以提前预加载插件以减少首次渲染延迟：

```typescript
import marklang from 'marklang';

// 页面初始化时预加载（传入匹配特征的内容即可）
await marklang.preloadPlugin('$x^2 + y^2 = z^2$');

// 后续渲染时直接使用缓存的插件，无需等待
const ml = marklang();
await ml.renderToElementAsync('$x^2 + y^2 = z^2$', el);
```

## 实例缓存机制

为避免重复创建 unified 实例，marklang 会缓存实例并在插件组合不变时复用：

```typescript
const ml = marklang();

// 首次调用：创建实例并缓存
await ml.renderToElementAsync('# Title', el1);

// 二次调用：复用缓存的实例（插件组合未变）
await ml.renderToElementAsync('# Another Title', el2);

// 当新插件被加载后，会重新创建实例
await ml.renderToElementAsync('$E=mc^2$', el3);  // 触发 math 插件加载，实例重建
```

## 插件配置说明

### Plugin 接口

```typescript
interface Plugin {
    name: string;       // 插件名称，唯一标识
    feature: RegExp;    // 特征匹配正则，用于检测内容是否需要此插件
    load: () => Promise<any>[];  // 加载函数，返回 Promise 数组
}
```

### 插件命名约定

插件模块的**导出名**（`export function xxx()` 中的函数名）决定了它在处理流水线中的位置：

| 导出名称前缀 | 处理阶段 | 说明 |
|-------------|---------|------|
| `remark-*` | MDAST 阶段 | 在 `remarkRehype` 之前执行，处理 Markdown 语法树 |
| `rehype-*` | HAST 阶段 | 在 `remarkRehype` 之后执行，处理 HTML 语法树 |

示例：
```typescript
// remark-math 插件导出
export function remarkMath() { ... }  // 以 remark 开头，在 MDAST 阶段执行

// rehype-katex 插件导出
export function rehypeKatex() { ... }  // 以 rehype 开头，在 HAST 阶段执行
```

### 特征匹配规则示例

| 功能 | 正则表达式 | 匹配示例 |
|------|-----------|----------|
| 行内数学公式 | `\$[^$\n]+\$` | `$E=mc^2$` |
| 块级数学公式 | `\$\$[\s\S]*?\$\$` | `$$\sum_{i=1}^n$$` |
| 数学公式（合并） | `/\$\$[\s\S]*?\$\$|\$[^$\n]+\$/` | 上述两种 |
| 代码块 | `/``[\s\S]*?```/` | ` ```js\ncode\n``` ` |

## API 参考

### marklang(options?)

创建 marklang 实例。

**参数：**
- `options.directives` - 自定义指令
- `options.transformers` - 自定义转换器

**返回：**
- `getUnifiedInstance(source)` - 异步获取 unified 实例
- `renderToElementAsync(source, el)` - 异步渲染（推荐）
- `renderToElement(source, el)` - 同步渲染（需先预加载插件）
- `hydrate(el)` - 服务端渲染激活

### marklang.registerPlugin(plugin)

注册按需加载的插件。

**参数：**
- `plugin.name` - 插件名称（string）
- `plugin.feature` - 特征匹配正则（RegExp）
- `plugin.load` - 加载函数，返回 `Promise<any>[]`

### marklang.preloadPlugin(source)

根据内容预加载匹配的插件。

**参数：**
- `source` - Markdown 内容（string）

**返回：**
- `Promise<void[]>`

### marklang.dataToSource(key, value)

将数据转换为 Markdown 数据块源码。

### marklang.dataToAst(markdown)

将 Markdown 解析为 AST。

## 注意事项

1. **异步渲染**：`renderToElementAsync` 和 `getUnifiedInstance` 是异步方法，需要使用 `await` 或 `.then()`
2. **同步渲染限制**：`renderToElement` 不会等待插件加载，调用前必须通过 `preloadPlugin` 确保插件已加载
3. **首次加载延迟**：首次使用某个功能时会有短暂的插件加载延迟，后续使用会命中缓存
4. **SSR 场景**：服务端渲染请使用 `marklang/node` 入口，该入口包含全部功能
5. **插件注册时机**：插件注册应在创建 marklang 实例之前完成
