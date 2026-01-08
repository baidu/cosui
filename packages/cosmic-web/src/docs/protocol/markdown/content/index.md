# Markdown 扩展协议

本协议旨在输出一套面向 **LLM（大语言模型）** 的统一 Markdown 扩展规范，标准化 UI 描述与数据传输，确保可移植、可扩展且安全。

Markdown 扩展协议 与 JSON 协议 选型参考：[协议选型](/protocol/overview)

## 1. 协议背景
* 复杂交互组件难以用纯 Markdown 表达。
* UI 与数据易耦合，缺少声明式绑定。
* LLM 多为分段/流式输出，需在不破坏语义的前提下支持增量渲染与二次加工。
* 需防范可执行内容带来的安全风险。

## 2. 设计原则
为了确保系统的健壮性与灵活性，协议设计遵循以下刚性约束：
*   **标准化扩展**：基于 GFM 标准，严禁破坏性修改（如劫持代码块用于渲染 UI），严禁破坏既有语义。
*   **声明式定义**：协议只描述**组件意图**和**数据**，不描述具体**样式**，样式由客户端组件库决定。
*   **安全隔离**：禁止传输可执行代码（如 `<script>`），所有交互通过预定义的协议映射实现。
*   **数据解耦**：复杂结构通过引用与 `ml-data` 存储解耦。

## 3. 核心理念
*   **Directive First**：凡非标准 Markdown 元素，一律使用 Directive 语法封装。
*   **Component Mapping**：协议只描述“是什么”（例如：这是一个视频），具体“长什么样”（渲染为 Video 标签还是自定义播放器）由客户端组件库决定。
*   **Attributes Extension**：为原生元素（链接、图片）提供元数据附加能力。
*   **Streaming Friendly**：指令与数据需要支持分段追加（如 SSE），解析端可增量 append 而不破坏上下文。

## 4. 协议构成
协议由三个核心层面构成：
*   **基础语法**：基于 GFM 的文本格式规范。
*   **扩展语法**：定义了内联、块级、容器三种扩展形式，用于描述 UI 组件。
*   **数据注入**：定义了如何在 Markdown 流中安全地嵌入结构化数据。


### 4.1 基础语法
*   **4.1.1 [GFM](https://github.github.com/gfm/) 支持**：在 CommonMark 的基础上主要加入几个扩展特性：
1. Tables https://github.github.com/gfm/#tables-extension-
2. Task List Items https://github.github.com/gfm/#task-list-items-extension-
3. Strikethrough https://github.github.com/gfm/#strikethrough-extension-
4. Autolinks https://github.github.com/gfm/#autolinks-extension-
5. Disallowed Raw Html https://github.github.com/gfm/#disallowed-raw-html-extension-

> 参考：https://katex.org/docs/supported.html

**4.1.2 Katex 公式支持**：Katex 主要用于数学公式表达。必须支持内联语法和块级语法。

```
// 行内
$C_L$

// 块级
$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$
```

**4.1.3 文本高亮支持**：以 == 为开始和结束的文本片段，行内元素， `==Highlighted Text==`。

```
I need to highlight these ==very important words==.

I need to highlight these ==**very important words**==.
```

> 参考：https://www.markdownguide.org/extended-syntax/#highlight

**4.1.4 自定义属性**： 支持在标准元素后通过大括号 `{}` 附加元数据。
*   **适用范围**：目前仅支持 **图片 (img)** 和 **链接 (link)** 的属性扩展。
*   **格式要求**：属性必须以 Key-Value 对形式存在（如 `{width=100}`），多个属性之间以空格区分。

```
[link](https://url){title=MyTitle target=MyTarget}
```

> 参考：https://talk.commonmark.org/t/consistent-attribute-syntax/272


### 4.2 扩展语法
*   **基准规范**：必须兼容 [Generic Directives](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) 提案语法，必须使用 Generic Directives 扩展社区未支持的特性。
*   **命名空间**：为了避免冲突，所有自定义指令名称必须以 `ml-` 作为前缀（例如 `ml-audio`, `ml-citation`）。
*   **形态支持**：协议强制解析器支持以下三种指令形态：
    *   **内联指令**：以一个冒号为起始，`:ml-name[content]{key=val}`
    *   **块级指令**：以两个冒号为起始，`::ml-name[content]{key=val}`
    *   **容器指令**： 以三个冒号为起始，`:::ml-name[inline-content]{key=val}` ；三个冒号为结束

```
see :ml-wikipedia[Foobar] here

::ml-video[title]{file=filename.mp4}

:::ml-paragraph{line-clamp=2}
此处可以是任意内容
此处可以是任意内容
:::
```

注：
* 不得扩展对解析过程需要额外实现的特殊语法
> 多个特殊语法之间容易产生冲突
> 特殊语法扩展容易对解析过程造成影响，比如不必要的回溯
> 错误例子举例：设计 [[content]] 语法表示特定含义

* 不推荐用代码块承载扩展：行内能力不足、语义为代码、需二次渲染。
> 为什么不推荐使用 Code 进行扩展？
> 1. Code 的扩展方式无法支持行内扩展
> 2. Code 的语义就是代码
> 3. Code 通常在视图上对应的是代码展示的标签。用来承载其他丰富的视图和交互形态，会导致重新进行二次渲染

* 具体的语法格式、详细示例，请查阅 [新增协议](/protocol/markdown/marklang/add-directive)


### 4.3 数据注入

保留协议 `:::ml-data{name="id"}`，用于承载结构化数据。
*   **处理逻辑**：解析器**不渲染**该协议内容，仅提取其内部 JSON 作为数据源。组件通过属性（如 `data="id"`、`ref="ref-1"`）引用数据，实现视图与数据解耦。
*   **场景**：当组件属性过于复杂（如引用列表、图表配置）时，使用 ID 引用代替内联属性。
*   **示例**:
````markdown
:ml-citation[1]{data="citation"}

:::ml-data{name="citation"}
  ```
  JSON.stringify(citationList)
  ```
:::
````

### 4.4 特殊处理
原则上，进入 Markdown 解析器的内容，不应进行任何特殊的预处理。因为，基于字符串匹配的 pre 处理程序，无法判断是否所有要处理的 pattern 都应该被处理。
但受限于用于 LLM 训练的数据集的广泛问题，以下场景可进行特殊处理。

将 <br> 替换成内容的换行


## 5. 用法示例
以下是一次完整的协议交互示例：LLM 输出一段包含引用跳转的文本，引用数据通过 `ml-data` 异步下发。

````markdown
北京是中国的首都。:ml-citation[来源 1]{ref="ref-1" data="citation-list"}

:::ml-data{name="citation-list"}
```json
{
  "ref-1": {
    "title": "北京概况",
    "url": "https://baike.baidu.com/...",
    "author": "百度百科"
  }
}
```
:::

````


## 6. 推荐实现
* 基于社区解析器封装：marked 或 unified/remark 系列。
* 推荐解析器：[Marklang](/protocol/markdown/marklang/overview)（基于 unified 的扩展与 Playground）。
