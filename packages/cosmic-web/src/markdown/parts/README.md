# 说明

在本目录下开发 mark-down 中的扩展标签，步骤如下：

* 已 token-async 为例，编写 token-async.san.ts 和 样式 token-async.less
* 在 index.less 中引入 .less 文件
* 在 index.ts 中引入 TokenWidget，并调用方法 sanToCustomElement(TokenAsync)
* 编译完成后 即可在 markdown 中使用 md-token-async 标签创建 san 组件，参数可通过 atrribute 传入。

```html
<md-token-async
  prefix='cos'
  figma-url='https://xxxx.com/xxxx'
/>

```