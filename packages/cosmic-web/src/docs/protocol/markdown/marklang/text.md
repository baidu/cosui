# 文本

以下示例在 [GFM 语法规范](https://github.github.com/gfm/) 基础上扩展，内置额外的文本能力与展示增强。

## 段落标题
markdown 语法
```
### 段落提炼的核心观点
```

html 输出结果
```html
<h3>段落提炼的核心观点</h3>
```

## 加粗高亮（核心答案）
markdown 语法
```
==**过期的化妆品通常不建议使用**==
```

html 输出结果
```html
<mark><strong>过期的化妆品通常不建议使用</strong></mark>
```
### 其他情况
#### 不加`**`

markdown 语法
```
==使用==
```

html 输出结果：只有高亮，文字不加粗
```html
<mark>使用</mark>
```

#### 加了空格
markdown 语法
```
==** 过期的化妆品通常不建议使用 **==
```

html 输出结果
```html
<mark>** 过期的化妆品通常不建议使用 **</mark>
```

#### 加了`==`
markdown 语法
```
==**过期的==使用**==
```

html 输出结果
```html
<mark>**过期的</mark>使用**==
```
#### 加了`**`
markdown 语法
```
==**过期的**使用**==
```

html 输出结果
```html
<mark><strong>过期的</strong>使用</mark>
```

## 深度加粗高亮(短答案)
markdown 语法
```
## ==过期的化妆品通常不建议使用==
```

html 输出结果
```html
<h2><mark>过期的化妆品通常不建议使用</mark></h2>
```

## 删除(单个波浪号不属于删除，两个是删除)
markdown 语法
```
~one~ and ~~two~~
```

html 输出结果
```html
<p>~one~ and <del>two</del></p>
```

## 带图片和 icon 的链接
markdown 语法
```
[住房补贴](https://m.baidu.com){icon="video"}

[百度百科](https://m.baidu.com){icon="img" src="xxx"}
```

html 输出结果
```html
<a href="https://m.baidu.com" icon="video">住房补贴</a>
<a href="https://m.baidu.com" icon="img" src="xxx">百度百科</a>
```
