# Cosui

## 技术栈

- 开发语言：[TypeScript](https://www.typescriptlang.org/) + [San](https://baidu.github.io/san/tutorial/start/) + [Less](https://less.bootcss.com/)
- 包管理工具：[pnpm](https://www.pnpm.cn/)
- 构建工具：[Rollup](https://www.rollupjs.org/)
- E2E 测试：[Playwright](https://playwright.dev/)
- 单元测试：[Jest](https://jestjs.io/)
- 本地预览：[Vite](https://cn.vitejs.dev/)

## 目录结构

```shell
cosui                                       # 目录结构
├── packages
│   ├── cosmic                              # 通用组件库
│   ├── cosmic-dqa                          # dqa 业务组件库
│   ├── cosmic-medical                      # 医疗 业务组件库
│   ├── cosmic-shop                         # 电商 业务组件库
│   ├── cosmic-education                    # 教育 业务组件库
│   ├── cosmic-dynamic-ui                   # UI 解析库
│   ├── cosmic-web                          # DSM 平台 web
│   ├── cosmic-...                          # 更多场景
├── scripts                                 # 构建脚本
├── ...

cosui                                      # 单包结构
├── packages
│   ├── cosmic                              # 通用组件
│   │   ├── src                             # 组件源码
│   │   │   ├── component                   # 单组件实现：包括组件源码、单测、文档
│   │   │   │   ├── doc                     # 组件文档
│   │   │   │   │   ├── readme.md           # 组件基本信息
│   │   │   │   │   ├── api.md              # API 文档
│   │   │   │   │   ├── demo.md             # 组件示例，根据组件需要可拆分为多个 demo
│   │   │   │   │   ├── index.ts            # 文档入口
│   │   │   │   │   ├── preview.ts          # 组件预览入口
│   │   │   │   ├── test                    # 组件测试
│   │   │   │   │   ├── e2e                 # 端到端测试
│   │   │   │   │   │   ├── index.spec.ts   # 若双端实现一致，使用同一入口，不一致则拆分 pc 和 mobile 文件夹
│   │   │   │   │   ├── unit                # 单元测试，若组件中定义了纯工具函数，需要新增对应的单元测试
│   │   │   │   │   │   ├── helper.spec.ts
│   │   │   │   ├── index.ts                # 若双端实现一致，使用同一入口，不一致则拆分 pc 和 mobile 文件夹
│   │   │   │   ├── index.less              # 组件样式
│   │   │   │   ├── interface.ts            # 组件接口定义
│   │   │   │   ├── helper.ts               # 组件工具函数
│   │   │   ├── token                       # 样式变量
│   │   │   │   ├── mobile                  # 移动端样式变量
│   │   │   │   │   ├── token.less
│   │   │   │   ├── pc                      # pc 端样式变量
│   │   │   │   │   ├── token.less
│   │   │   ├── index.[env].ts              # 组件分端入口
│   │   │   ├── index.[env].less            # 组件分端样式入口
│   │   ├── dist                            # 编译产物
│   │   │   ├── mobile
│   │   │   │   ├── component
│   │   │   │   │   ├── index.js
│   │   │   ├── pc
│   │   │   │   ├── component
│   │   │   │   │   ├── index.js
│   │   │   ├── index.js
│   │   │   ├── index.css
│   │   │   ├── token.css
├── ...
```

## 需求阶段

创建 ISSUES

## 开发阶段

### 安装组件依赖

``` shell
# 仓库根目录执行
pnpm install
```

### 本地预览

``` shell
# 整体预览
pnpm build
pnpm dev:site
```

预览地址：http://localhost:5173/
单组件预览地址：http://localhost:5173/components/cosmic/button
单组件单个 Demo 预览地址：http://localhost:5173/components/cosmic/button/default?platform=mobile

说明：
- `default` 代表 `button` 组件的 Demo 名字，对应 `src/button/doc/default.md`。Demo 名字由组件开发者自己决定。
- `platform` 可选。可以设置 `mobile`|`pc`。如果不设置，默认值是 `mobile`。

若新增组件需要在入口文件 `packages/cosmic-*/src/index.[env].ts` 和 `index.[env].less` 中引入新增组件，以及在 `packages/cosmic-web/src/router/*-component.ts` 中添加对应组件路由信息。

### 组件开发

组件开发通常为已有组件迭代和新增组件。组件库提供了丰富的编译 API 和 AI 能力辅助开发。

编译参数：
- `-p`: `package` 表示要编译的组件库
- `-w`: `watch` 表示监听文件变化自动触发编译
- `-c`: `component` 表示要编译的组件，支持多个组件，以逗号分隔，例如 `markdown,poi`

``` shell
# 组件开发中，监听组件更新
# 建议在具体组件 package 目录下执行，避免影响性能
cd packages/cosmic
# watch 当前 package 的所有组件
pnpm dev
# watch 某个组件
pnpm dev -c markdown

# 本地同步预览
pnpm dev:site
# 或者
cd packages/cosmic-web
pnpm dev

# 本地 SSR 预览
# SSR 预览依赖 CSR 产物，需保证 CSR 产物已经编译，建议具体组件编译，避免影响性能
# cosmic-card/cosmic-dqa/cosmic-shop 依赖 comsic SSR 产物，需先编译 comsic SSR 产物
cd packages/cosmic-web
pnpm build:cjs:cosmic # 只编译 cosmic SSR 产物
pnpm build:cjs # 编译 cosmic/cosmic-xxx SSR 产物

# 由于 vite 不监听 commonjs 产物变化，暂不支持 watch 功能，需要手动重新编译
cd packages/cosmic-web
pnpm dev:ssr
```

### 组件示例开发

```
// normal.md
// 组件doc中index用于pc端展示、preview用于mobile端展示
// pc示例不使用shadow dom
```san export=preview caption=xx组件基础使用 shadow=mobile
// wise示例不使用shadow dom
```san export=preview caption=xx组件基础使用 shadow=pc
// 两个平台的示例都不使用shadow dom
```san export=preview caption=xx组件基础使用 shadow=none
```

- export 直接 preview，代表导出形式为预览，不需要其他改动
- caption 示例的描述，会当作示例的标题输出在预览界面，描述应当简洁明了，不可以包含空格
- platform 标识输出的平台，内容只要包含 pc 或者 mobile 就会输出对应的平台的预览效果，默认不需要专门标注，会同时输出两个平台的
- shadow 标识是否使用 shadowDom 挂载示例，内容只要包含 pc 或者 mobile，则对应的平台的示例会挂载在 shadowDom 中，没有标注则默认都挂载

## E2E 测试

组件 E2E 基于 Playwright 框架，开发组件 E2E 参考：
- Getting Started：https://playwright.dev/docs/writing-tests
- Locators API：https://playwright.dev/docs/locators

### 安装浏览器环境

```shell
# 安装浏览器环境，默认会安装 Chromium、Firefox、WebKit 等浏览器
pnpm install-browser
# 若使用上述命令无法正常执行 E2E 测试（提示找不到 chromium），可尝试单独安装
pnpm install-browser:chromium
```

执行完之后检查组件根目录是否有 `browsers` 目录，里面会有 `chromium`、`firefox`、`webkit` 等浏览器

### 编写 E2E 测试用例

在自己组件下新建 `test/e2e` 目录，里面新建 `*.spec.ts` 文件编写测试用例，每一个组件 E2E 文件内部按照组件文档的 Demo 进行划分。每一个组件 Demo 是一个组件测试用例，对应一个组件测试集。如果有多个 Demo 就有多个测试代码片段与之对应。


### 执行 E2E 测试用例

```shell
# 执行所有测试用例
pnpm test:e2e
# 执行单个组件的测试用例
COMPONENT=link pnpm test:e2e
# 清除 e2e 测试产物(test:e2e自动触发)，有 metadata.json 文件更新时候需要手动执行一下，避免 e2e-cache.json 配置没有及时更新
pnpm e2e:clean
# 编译 e2e 相关文件(test:e2e自动触发)，想查看 e2e 测试代码引用路径，可以执行此命令后在对应组件文档下查看 e2e-cache.json 配置
pnpm e2e:build
```

### 代码提交

提交 PR
