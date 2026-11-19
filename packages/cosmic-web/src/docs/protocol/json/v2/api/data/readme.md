# Data 数据

Data 存在于 Applet 中。创建 Applet 时，可以在 applet.data 中提供初始 Data；创建完成后，可以通过 updates 更新 Data，也可以在 Component 中绑定并使用 Data。

## Data 更新

### Update


|字段|类型|必选|说明|
|---|---|---|---|
|path|string|否|Data 路径，使用 JSON Pointer|
|value|JsonValue|是|要写入的值|

#### 整体替换

path 为空字符串或省略时，value 替换整个 Data。根 Data 必须是对象，替换过程不会与原 Data 合并。

```json
{
    "updates": [{
        "value": {
            "user": {"name": "小宇"},
            "items": []
        }
    }]
}
```

#### 更新对象字段

path 指向对象字段时，会新增或替换该字段。path 的父路径必须已经存在，中间路径不会自动创建。

```json
{
    "updates": [{
        "path": "/user/name",
        "value": "小宇"
    }]
}
```

对象 value 会整体替换目标值，不会和原对象递归合并。

#### 更新数组

path 可以指向已有数组项，也可以指向数组末尾：

```json
{
    "updates": [{
        "path": "/items/0",
        "value": {"id": "a", "title": "博物馆"}
    }, {
        "path": "/items/1/title",
        "value": "园林"
    }]
}
```

索引指向已有项时替换该项；索引等于数组长度时，在数组末尾追加一项。

#### 删除字段或数组项

非根路径的 value 为 null 时，删除目标对象字段或数组项：

```json
{
    "updates": [{
        "path": "/items/0",
        "value": null
    }]
}
```

删除数组项后，后续索引会前移。根 Data 不能使用 null 替换。

#### 多条更新

同一条消息中的 updates 按顺序处理。后一条更新使用前一条更新后的 Data。
任意一项失败时，整条消息失败，前面的更新不会部分写入。

```json
{
    "updates": [{
        "path": "/items/0/done",
        "value": true
    }, {
        "path": "/completed",
        "value": 1
    }]
}
```

## Data 使用

Component 的 props 可以读取 Applet Data。

### San 路径

普通字段使用点号访问，数组使用下标：

- <code>&#123;&#123;user.name&#125;&#125;</code>
- <code>&#123;&#123;user.profile.city&#125;&#125;</code>
- <code>&#123;&#123;items[0].title&#125;&#125;</code>

根变量必须是合法的 San 标识符，不能使用中文、短横线、空格或数字开头的名称。对象的后续字段包含这些字符时，使用方括号和字符串键：

- <code>&#123;&#123;users[0]['姓名']&#125;&#125;</code>
- <code>&#123;&#123;item['image-url']&#125;&#125;</code>

例如，Data 可以写为 `{"user": {"姓名": "小宇"}}`，并通过 <code>&#123;&#123;user['姓名']&#125;&#125;</code> 读取；不能使用 <code>&#123;&#123;用户['姓名']&#125;&#125;</code>。

数据绑定支持字段访问、字面量、算术、比较、逻辑和三元表达式，但不能调用函数。数组、字符串等数据原本类型自带的方法同样不能使用，例如 `items.join(',')`、`name.toString()`。

### 绑定结果

属性值完全由一个绑定组成时，保留求值结果的类型：

- <code>&#123;&#123;count&#125;&#125;</code> 保留数字类型
- <code>&#123;&#123;enabled&#125;&#125;</code> 保留布尔类型
- <code>&#123;&#123;items&#125;&#125;</code> 保留数组类型

绑定与普通文本混合时，结果为字符串：

<code>共 &#123;&#123;count&#125;&#125; 条</code>

对象和数组内部也可以使用单向绑定，但不会因此获得双向写回能力。

### 双向绑定

输入类 Component 的输入属性可以使用 <code>&#123;= expr =&#125;</code> 双向绑定：

- <code>&#123;= form.city =&#125;</code>
- <code>&#123;= users[0]['姓名'] =&#125;</code>

双向绑定必须完整占据属性值，并指向可写的 San 路径。Component 修改属性后，值会写回 Data。

<code>&#123;&#123;expr&#125;&#125;</code> 是单向绑定。

## 示例效果
