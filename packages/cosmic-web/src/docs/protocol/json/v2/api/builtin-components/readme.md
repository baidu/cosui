# Builtin Components

defineCatalog 会自动加入以下 Builtin Component。它们由 Dynamic UI 直接渲染，不需要在 AppletContext.components 中注册实现。  

除以下 Builtin Component 外，还可以使用 Catalog 中声明的 Cosmic Component。  
Cosmic Component 需要在 AppletContext.components 中注册对应实现；Builtin Component 不需要注册。

### Div

通用块级容器。

```ts
{
    id: 'container',
    type: 'Div',
    props: {
        class: 'cos-space-p-md',
        // string 或 Record<string, string | number>
        style: {width: '100%', minHeight: 120}
    },
    children: ['content']
}
```

### Divider

分割线。

```ts
{
    id: 'divider',
    type: 'Divider',
    props: {
        vertical: false, // boolean，是否垂直显示
        inverse: false,  // boolean，是否使用反色样式
        height: 1,       // string | number
        class: 'cos-space-my-sm',
        // string 或 Record<string, string | number>
        style: {width: '100%'}
    }
}
```

### Column

栅格列。

```ts
{
    id: 'column',
    type: 'Column',
    props: {
        span: 6, // 1～12 的整数，默认 1
        class: 'cos-space-p-sm',
        // string 或 Record<string, string | number>
        style: {minHeight: 80}
    },
    children: ['column-content']
}
```

### Row

栅格行。

```ts
{
    id: 'row',
    type: 'Row',
    props: {
        columns: 12, // 1～12 的整数，默认 12
        gutter: 12,  // 非负数，默认 0
        // start | center | end | stretch | baseline，默认 stretch
        align: 'center',
        // start | center | end | between | around | evenly，默认 start
        justify: 'between',
        wrap: true, // boolean，默认 true
        class: 'cos-space-p-sm',
        // string 或 Record<string, string | number>
        style: {width: '100%'}
    },
    children: ['left-column', 'right-column']
}
```

### Flex

Flex 布局容器。

```ts
{
    id: 'flex',
    type: 'Flex',
    props: {
        // row | column | row-reverse | column-reverse，默认 row
        direction: 'column',
        wrap: false, // boolean，默认 false
        // start | center | end | stretch | baseline，默认 stretch
        align: 'stretch',
        // start | center | end | between | around | evenly，默认 start
        justify: 'start',
        gap: 12, // 非负数，默认 0
        class: 'cos-space-p-md',
        // string 或 Record<string, string | number>
        style: {width: '100%'}
    },
    children: ['title', 'content']
}
```

### Text

文本节点，不支持 children。

```ts
{
    id: 'title',
    type: 'Text',
    props: {
        value: '杭州周末行程', // string | number
        name: 'trip-title',    // string | number
        size: 'lg',            // string | number
        class: 'cos-color-text',
        // string 或 Record<string, string | number>
        style: {fontWeight: 600}
    }
}
```

## 示例效果
