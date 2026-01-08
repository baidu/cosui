# 新增协议
Marklang 支持基础 [GFM 语法规范](https://github.github.com/gfm/)，新增协议可通过指令扩展、属性扩展实现

## 指令扩展
通过自定义指令方式支持 markdown 语法扩展；根据渲染结果的元素类型，遵循以下指令进行扩展：其中 ml- 前缀固定，若指令中依赖的数据较多，可以配合内置协议 [ml-data](/protocol/markdown/marklang/data) 使用

*   **内联指令 (Inline)**
    *   **语法**: `:ml-name[content]{key=val}`
    *   **用途**: 行内交互元素，如特殊的链接、行内按钮、Icon。
    *   **示例**: `:ml-copy[点击复制]{text="123456"}`

*   **块级指令 (Leaf Block)**
    *   **语法**: `::ml-name[content]{key=val}`
    *   **用途**: 独立的 UI 块，无子节点，如视频、分割线、简单卡片。
    *   **示例**: `::ml-video{src="demo.mp4" poster="cover.jpg"}`

*   **容器指令 (Container)**
    *   **语法**:
        ```markdown
        :::ml-name{key=val}
            Markdown Content...
        :::
        ```
    *   **用途**: 包裹复杂内容，支持嵌套，如折叠面板、多列布局、自定义样式的段落。
    *   **示例**:
    ```markdown
        :::ml-paragraph{line-clamp=2}
            此处可以是块级元素
            也可以是内联元素
        :::
    ```
   > 参考提案：https://talk.commonmark.org/t/generic-directives-plugins-syntax/444

## 属性扩展
如果渲染元素涉及到自定义元素数据，直接在对应的 markdown 语法后添加大括号，支持基础语法和扩展语法;

目前支持 img 和 link 标签添加自定义属性，在标准语法后添加大括号，大括号内以 key=value 的形式声明需要添加的自定义属性；

   ```
   [link](url){key=val}
   ![](img){width=100}
   ```

  > 参考: https://github.com/arobase-che/remark-attr
