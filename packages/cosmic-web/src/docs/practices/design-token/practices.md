# Design Token 最佳实践

## Token 简介
Design Token 是设计语言一种表现形式，它将设计系统中的视觉设计属性（如颜色、间距、字体等）抽象成可复用、可管理的变量的方式，用键值对（Key=Value）来描述一个样式，将设计中的基础元素与具体的样式进行解耦。

## Token 适用场景

使用 Design Token 的场景通常涉及需要高一致性、灵活性和可扩展性的业务，以下是一些典型的应用场景：

* **大型产品和系统**：当你的产品或系统规模庞大，涉及多个团队、多个模块和多个平台时；Design Token 可以帮助确保视觉设计的一致性，减少沟通成本。它允许设计师和开发者在不同的部分使用相同的视觉样式和规则，从而减少冗余和不一致性
* **跨端适配**：在你的产品需要支持多端、日夜模式时；Design Token 可以定义不同设备、模式下的颜色、间距、字体等设计变量，从而使应用能够适应不同屏幕尺寸和用户需求。可以为不同的主题（如日夜模式）提供不同的样式配置，并在用户切换主题时快速切换。
* **多品牌支持**：在多品牌的应用中，可能需要针对不同品牌的视觉风格进行适配。Design Token 可以将不同品牌的设计规范抽象为不同的 Token 集，帮助在多个品牌或主题之间切换时保持一致的样式和体验
* **可维护性和版本控制**：随着时间的推移，设计可能会不断变化，尤其是在需要快速迭代和发布新版本的产品中。Design Token 可以帮助管理版本控制，让设计和开发团队以更高效的方式进行更新。

## 常见场景及解决方案

### 颜色 Token 怎么使用

**Token 颜色有两类**

* 语义化的 `颜色 Token`：颜色 Token 命名遵循 cos-color-(text | bg | border)-状态 规范，text、bg 和 border 分别代表字体色、背景色和边框色；
* 非语义化的 `色板 Token`：如 `--cos-tan-2` 、`--cos-red-0` 、 `--cos-orange-3` 等色系 Token

**使用原则**

- 应该遵循 Token 设定的语义使用，避免将颜色 Token 混合使用
- 在 `颜色 Token` 可用的情况下，尽量使用 `颜色 Token` 。如果标注稿中找不到对应的 `颜色 Token` ，经过与 UE 确认后，可以考虑使用 `色板（platte）` 中的色值作为备用。目前支持的色板 Token， 详见预览。
- 我们不允许使用硬编码的颜色，但如果色板 Token 仍无法满足需求，经 UE 最终确认后，方可使用硬编码色值，但需附上注释说明原因。

#### 易错场景：同一种颜色，如 `#4e6ef2`，有多个 Token，该怎么选择 ？

```
// #4e6ef2 存有的 Token

// 文字 primary 色
--cos-color-text-primary: #4e6ef2;

// 背景 primary 色
--cos-color-bg-primary: #4e6ef2; 

// 边框 primary 色
--cos-color-border-primary: #4e6ef2;
...

```

从示例可以看出，虽然是同颜色，但分别为不同语义场景，如颜色 Token 命名遵循 cos-color-(text | bg | border)-状态 规范，text、bg 和 border 分别代表字体色、背景色和边框色；
因此当前为哪种场景则使用哪个语义的 Token

一般来说，设计稿是合规的，直接使用标注稿中的颜色 Token 即可获得，如果标注稿没有提供 或 设计稿错误，可以向 UE 同学确认应该使用哪个 Token。

```
// good case，最推荐
.cos-color-text-primary();

// not recommended
color: var(--cos-color-text-primary);

// bad case
// 说明：把文本色用于边框色，这样做不符合 Token 的语义，且可能影响后续更新。例如 --cos-color-text-primary 后续按照字体色进行升级迭代 ，可能会意外影响到边框色。
border-color: var(--cos-color-text-primary);
```


### 行高怎么使用 Token 

**Token 行高有两类**
* 具体数值行高：如 `var(--cos-text-caption)` 、`var(--cos-leading-caption)` 等有具体 px 的行高
* 响应式行高：如 `.cos-leading-none()` 等没有具体数值，是与字体大小相关的响应式行高

    ```
    // 行高为 0
    .cos-leading-0 {
        line-height: 0
    }

    // 行高与字体大小相等
    .cos-leading-none {
        line-height: 1
    }

    // 行高为字体大小的 2 倍
    .cos-leading-loose {
        line-height: 2
    }
    ```

**使用原则**
* 单行文本，按需使用响应式行高、 var(--cos-text-xxx) 或者 var(--cos-leading-xxx) 来设置行高即可
* 多行文本，最好使用已定义的 mixin 来处理行高、字体大小

```
<template>
    <div class="custom">{{text}}</div>
</template>

<style lang="less">
@import (reference) "Tokens.less";

// 单行文本场景；按需使用行高 Token
.custom {

    // good case
    line-height: var(--cos-text-body);

    // good case
    line-height: var(--cos-leading-body);

    // good case 响应式行高
    .cos-leading-none();
}

// 多行文本场景使用 mixin
.custom {
    .cos-text-body();
}
</style>
```

### 间距怎么使用 Token
目前间距的 Token 定义是从 0 开始，三倍递增，共有 10 档可供使用。也就是说 0 以及 3 的倍数的间距都是可以使用 Token 的。可以通过 mixin 直接使用对应间距 Token，也可以自己按照具体场景混搭。
```
<template>
  <div class="custom">{{text}}</div>
</template>

<style lang="less">
@import (reference) "Tokens.less";

.custom {
    // good case
   .cos-space-m-3xl();

   // good case
   margin: var(--cos-space-3xl) var(--cos-space-none);

   // bad case
   margin: 27px 0;
}

</style>
```
#### 典型场景：文本怎么抹除顶底行间距

* **自动抹除掉文本的顶底行间距**：当间距 Token 和 文本 Token 在模版上组合使用时，会自动抹除文本的行间距，更多详情可参考 [paragraph 使用示例](/components/cosmic/paragraph)

    ```
    <template>
    // 抹除顶底行间距，元素无上下间距
    <div class="custom cos-text-body cos-space-m-none">{{text}}</div>

    // 抹除顶底行间距，保留元素的上下间距 lg
    <div class="custom cos-text-body cos-space-m-lg">{{text}}</div>

    // 抹除顶部行间距，保留元素顶部的间距 xxs
    <div class="custom cos-text-body cos-space-mt-xxs">{{text}}</div>
    </template>
    ```
    如下图所示，这样使用抹除了文本的顶部行间距，让字体到其他元素的距离直接为 cos-space-mt-xxs 距离

    ![抹除顶部行间距示例](https://psstatic.cdn.bcebos.com/basics/cosmic/doc-space-use_1739271203000.png)

* **保留行间距**，当间距 Token 和 文本 Token 在组合使用，但不希望自动抹除行间距时，需要把 Token 写在 mixin 上

    ```
    <template>
    <div class="custom">{{text}}</div>
    </template>

    <style lang="less">
    @import (reference) "Tokens.less";

    .custom {
        .cos-text-body();
        .cos-space-mt-xxs();
    }

    </style>
    ```
  如下图所示，这样保留了文本的行间距，并且元素间距为 xxs
  
  ![保留行间距示例](https://psstatic.cdn.bcebos.com/basics/cosmic/doc-space-use-1_1739271178000.png)

### 怎么局部换肤
一般来说使用 Token 换肤有两种情况，分别是

* 通用场景：使用通用的 cosmic Token，包含通用 pc、日夜颜色变换
* 主题换肤：定义主题变量，在 cosmic 内部增量覆盖通用 Token，形成定制化的主题

#### 通用场景
在项目已经接入 cosmic Token 的情况下，直接使用 Token 即可完成 pc、日夜颜色变换
```
<template>
    <div class="default-card"></div>
</template>

<style lang="less">

.default-card {
    // good case，使用 mixin
    .cos-color-text-primary();

    // not recommended，使用 cos 变量
    color: var(--cos-color-text-primary);
}
<style>
```
##### 错误用法：直接使用业务 Token 变量
这里特别注意**不能直接使用主题的 Token 变量**，如 `--cosd-color-text-primary`，出于减少冗余代码的需要，cosmic 后续会把这种**存在 mixin、cos 变量可以用**的主题 Token 变量下线处理。
```
<template>
    <div class="default-card"></div>
</template>

<style lang="less">

.default-card {
    // error case，不在业务主题内直接使用业务变量
    color: var(--cosd-color-text-primary);
}
<style>
```
主题换肤的正确用法请看**主题换肤**一节
#### 主题换肤场景
业务需要在某个卡片或者组件内的区域使用主题 class，应用自有业务主题换肤。下面以 `cos-dqa` 主题 class（已在 cosmic 定义了主题）为例讲述应该如何使用：

```
<template>
<div class="default-card"></div>
<div class="custom-card cos-dqa"></div>
</template>

<style lang="less">

// 在 .cos-dqa 主题内使用 Token，应用的是 cos-dqa 定义的 Token 变量色
.custom {

    // good case，使用 mixin
    .cos-color-text-primary();

    // not recommended，使用 cos 变量
    color: var(--cos-color-text-primary);

    // bad case，在可以使用 mixin 、cos 变量的情况下使用 cosd 变量，
    color: var(--cosd-color-text-primary);
}
<style>
```
使用主题换肤的好处是，在 Token 变量层面直接收敛了特定业务（如本例的 dqa 场景）所使用的变量，并且依然使用通用 Token 变量的命名：--cos-color-text-primary。
从而修改的变量只会重新作用于 .custom-card 节点内部，而不会影响到 .default-card。

#### 自定义主题变量场景
Cosmic 提供了一套通用主题和多套业务主题。如果已有主题无法满足业务需求，业务可以向 Cosmic 提需，定制业务专属主题。以通用主题为准，增量覆盖通用 Token，形成定制化的主题 Token。以 `cos-dqa` 为例：

```
import (reference) 'Tokens.less';

// 通用 Token 定义
.cos-wise, :root {
    --cos-color-text-primary: #4e6ef2ff;
}
@media (prefers-color-scheme: dark) {
    .c-darkmode, .darkmode, .cos-dark {
        --cos-color-text-primary: #4e6ef2ff;
    }
}

// cos-dqa 业务主题 Token 变量定义
.cos-wise, :root {
    .cos-dqa {
       --cos-color-text-primary: #6e4bfa;
    }
}
@media (prefers-color-scheme: dark) {
    .c-darkmode, .darkmode, .cos-dark {
        .cos-dqa {
           --cos-color-text-primary: #6e4bfa;
        }
    }
}
```
在本例中，`cos-dqa` 主题内增量覆盖了 `--cos-color-text-primary` 的颜色，业务就可以通过 `cos-dqa` 主题 class，直接使用`cos-dqa` 的主题 Token 变量了

### 定制夜间色场景
日夜模式定制最推荐的方式是直接使用颜色 Token，存在需要对暗黑场景进行业务自定义变量定制场景时，可参考下面示例:

```
<template>
    <div class="custom-card"></div>
</template>

<style lang="less">
import (reference) 'Tokens.less';
.custom-card {
    .cos-color-bg-dent();
}

@media (prefers-color-scheme: dark) {

    // 改变 ios 夜间色
    .cos-ios .custom-card {
        background: xxx;
    }

    // 改变 android 夜间色
    .cos-android .custom-card {

        // 关闭安卓暗黑颜色映射
        color-scheme: dark;
        background: xxx;
    }

    // 修改 ios、android 夜间色
    .custom-card {
        background: xxx;
    }
}
```
