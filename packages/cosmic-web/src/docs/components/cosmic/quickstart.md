# 快速接入

组件基于 [san](https://baidu.github.io/san/) 实现，由两类构成，

- 一类是基础组件：@cosui/cosmic
- 一类是业务组件：@cosui/cosmic-x 等

业务可以根据自己的需求选择性接入。

## npm 接入方式

1、按需 `npm` 引入组件库

```
// 按需引入 cosmic
npm i @cosui/cosmic

// 引入 字体库
npm i @cosui/icon

```

引入后

```
// package.json
{
    ...
    "dependencies": {
        ...
        "@cosui/cosmic": "^1.0.0",
        "@cosui/icon": "^1.0.0",
    }
    ...
}
```

2、按需配置别名

``` typescript
// webpack.config.js
{
   // ...
    resolve: {
        alias: {
            '@cosui/cosmic/dist/mobile/index.css': path.join(
                path.dirname(require.resolve('@cosui/cosmic').replace('/dist/mobile', '')),
                `dist/\${platform === 'pc' ? 'pc' : 'mobile'}/index.css`
            ),
            '@cosui/cosmic/dist/mobile/tokens.css': path.join(
                path.dirname(require.resolve('@cosui/cosmic').replace('/dist/mobile', '')),
                `dist/\${platform === 'pc' ? 'pc' : 'mobile'}/tokens.css`
            ),
            '@cosui/cosmic': path.join(
                path.dirname(require.resolve('@cosui/cosmic').replace('/dist/mobile', '')),
                `dist/\${platform === 'pc' ? 'pc' : 'mobile'}`
            )
        }
    }
}
```

3、使用组件

入口引入样式

``` typescript
// index.ts

import '@cosui/icon/dist/cos-icon.css';
import '@cosui/cosmic/dist/mobile/tokens.css';
import '@cosui/cosmic/dist/mobile/index.css';
```

各业务中使用组件

``` typescript
// demo.ts

import {Component} from 'san';

// 按需引入组件
import Avatar from '@cosui/cosmic/avatar';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {
    // ...

    static components = {
        // ...
        'cos-avatar': Avatar
    };

    initData() {
        return {
            src: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        }
    }
}
```

## 样式适配

### 适配选择器

| 类型 | 基础                                         |
|----|--------------------------------------------|
| 终端 | - PC 端：`.cos-pc` <br> - 移动端：`.cos-wise`     |
| 系统 | - Android： `.cos-android` |
| 暗黑 | `.cos-dark`   |

cosmic 会根据 class 选择器来实现不同端样式适配，建议业务环境中在 `<body>` 上加上此类 class 适配。

```
<body class="cos-wise cos-android cos-dark">
...
</body>
```

## 依赖说明

组件库的依赖模块分为编译期依赖和运行时依赖。运行时依赖的模块在编译期并不会对它进行编译打包。运行时依赖的模块分2种情况：

1. 通过 npm 安装的第三方库，例如 `san` 框架
2. 通过 apm 安装的浏览器端执行的第三方库，这些库通常会在搜索页面框架层提供

针对运行时依赖模块，组件库通过 `package.json` 中的 `peerDependencies` 标记提示组件使用者。依赖项列表如下：

### 依赖项

|名称|依赖它的组件|平台|说明|
|---|---|---|---|
|san|all| PC/Mobile |san 框架|
|@cosui/iconfont|Icon| PC/Mobile |图标库 iconfont|
|marklang|Markdown|PC/Mobile| Markdown 扩展 SDK|