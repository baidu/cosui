# if 判断

if 控制当前 Component 及其子树是否渲染。值可以是 boolean，也可以是表达式字符串。  
表达式不写在 `{{}}` 中，求值结果为 falsy 时不显示。  
if 与 props、children、for、events 平级。  

- `!loading`：loading 为 false 时显示。
- `age >= 18`：年龄达到 18 岁时显示。
- `a && b`：a 和 b 都为真时显示。

## 示例效果
