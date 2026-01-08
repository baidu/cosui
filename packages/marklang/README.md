### Marklang
* 适应 language model 的内容，提供更灵活和标准的的 markdown 语法扩展机制
* CSR & SSR friendly
### 技术选型
* 基于 remark 封装
* 内置 gfm
* 支持部分标准 markdown 元素的 attribute 扩展
* 为 directive 扩展提供处理标准入口
* 内建一些 directives
    原则：不依赖san组件，没有交互
    目前:::ml-data已经被内部定义，不能用于其他作用

### 本地开发
``` shell
pnpm i
pnpm run build
```
