# for 循环

for 用于根据列表数据重复渲染当前 Component 及其子树。  
for 与 props、children、if、events 平级，表达式不写在 `{{}}` 中。  
循环变量只在当前 Component 及其子树中有效。  

- `item in items`：只声明当前项变量 `item`。
- `item, index in items`：同时声明当前项和下标。
- `item, index in items trackBy item.id`：使用指定字段标识列表项，适合列表更新。

## 示例效果
