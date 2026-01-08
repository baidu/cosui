# Paragraph 文字段落

<div style="color: #FF0000">注意：后续不再支持 Paragraph 组件，业务可直接使用 p 标签，通过 token 解决样式问题。使用方式参见代码演示。</div>

## 如何使用

### 1. 多行截断

在 p 标签上直接使用多行截断 token（见[截断章节](/design-token/cosmic)）即可实现。具体使用方式可参照代码演示。

### 2. 不同字体大小

在 p 标签上直接使用文本 token（见[文本章节](/design-token/cosmic) ）即可实现。具体使用方式可参照代码演示。

### 3. 段落间距

只有使用了文本 token，我们才认为这个节点是段落节点，此时使用外间距 token（见[间距章节](/design-token/cosmic)），段落的最上侧和最下侧的行间距空白也会被计算在设置的间距里，举例来说，如果使用的外间距 token 对应上间距为 15px，那么段落文字到到其上方内容的距离就是 15px。具体使用方式可参照代码演示。

**特别注意：**如果想要自动抹除掉段落的行间距，请将文本 token 和间距 token 直接写在 class 上，使用 mixin 的方式行间距将不会被抹除。

* **自动抹除掉文本的顶底行间距**：当间距 Token 和 文本 Token 在模版上组合使用时，会自动抹除文本的行间距

```
// 抹除顶部行间距，保留元素顶部的间距 xxs
<div class="custom cos-text-body cos-space-mt-xxs">{{text}}</div>
```

![抹除顶部行间距示例](https://psstatic.cdn.bcebos.com/basics/cosmic/doc-space-use_1739271203000.png)

* **保留行间距**，当间距 Token 和 文本 Token 在组合使用，但不希望自动抹除行间距时，需要把 Token 写在 mixin 上

```
// template
<div class="custom">{{text}}</div>

// css mixin 写法 保留行间距
.custom {
    .cos-text-body();
    .cos-space-mt-xxs();
}
```

![保留行间距示例](https://psstatic.cdn.bcebos.com/basics/cosmic/doc-space-use-1_1739271178000.png)

## 代码演示
