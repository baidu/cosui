# ml-data 数据

内置数据存储协议支持，便于与自定义协议配合使用；自定义协议中的 `data` 需要与 `ml-data` 中的 `name` 一一对应。

### 协议组合示例
以自定义协议 ml-citation 为例：

markdown 描述
```markdown
:ml-citation[1]{data="data1"}

:::ml-data{name="data1"}
```json\nJSON.stringify(citationList)\n```
:::
```

同时，在实际应用时，提供 dataToSource 方法，便于生成 ml-data 协议。

### dataToSource 方法

描述：`dataToSource(key: string, data: unknow): string`

说明：生成 `ml-data` 协议字符串。

用法：
```javascript
import marklang from 'marklang';

const citationList = {test: 1};
const citationDataSource = marklang.dataToSource('data1', citationList);

// 得到的数据是 \n:::ml-data{name=data1}\n```json\n{"test":1}\n```\n:::\n\n

marklang({
    directives: {
        'ml-citation': (info) => {

            // 可通过 node.properties.data 获取 ml-data 协议中存储的数据
            console.log(info.properties.data); // 结果应该是 citationList 的值
            return '<span>' + info.content + '</span>';
        }
    }
}).render(markdown + citationDataSource);
```

html 输出结果
```html
<span>1</span>
```

若没有添加 `ml-citation` 的处理函数，直接调用 `marklang().render(markdown)`，则 html 输出结果为
```html
<ml-citation data="citation">1</ml-citation>
```

> API 详细介绍可见 [API 说明章节](/protocol/markdown/marklang/api)。