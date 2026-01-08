<md-switcher></md-switcher>

<md-tabs>

<md-tab-pane  business="cosmic" prefix="cos">


## 文本

### 字重
需要字体加粗，请使用 **.cos-font-medium()** ，不要单独使用 --cos-font-medium 变量；由于在安卓部分机型上 font-weight 加粗无效，安卓统一通过 --cos-font-medium-stroke 进行加粗，单独使用 --cos-font-medium 变量加粗不生效  
<br />
<md-token-widget business="cosmic,page-redesign" prefix="cos" attr="text"  include="font"></md-token-widget>

### 字号
.cos-text-xxx() 使用场景为多行文本场景，单行文本场景可按需使用 var(--cos-text-xxx) 、var(--cos-leading-xxx) 作为行高
<md-token-widget business="cosmic" prefix="cos" attr="text" include="text|leading" exclude="-(left|center|right|justify|start|end|0|none|loose)" head="false"></md-token-widget>

### 对齐
<md-token-widget business="cosmic" prefix="cos" attr="text" include="text" exclude="-(headline|subtitle|body|caption)" head="false"></md-token-widget>

### 其他
<md-token-widget business="cosmic" prefix="cos" attr="text"  exclude="-(text|font)" head="false"></md-token-widget>

## 截断
截断具体使用可以参考 <a href="/components/cosmic/paragraph" target="_blank">Paragraph 文字段落 - 多行截断</a>。
<md-token-widget business="cosmic" prefix="cos" attr="lineclamp" ></md-token-widget>


## 圆角
<md-token-widget business="cosmic" prefix="cos" attr="rounded" head="true" ></md-token-widget>


## 间距
<md-token-widget business="cosmic" prefix="cos" attr="space" head="true" ></md-token-widget>

## Flexbox
<md-token-widget business="cosmic" prefix="cos" attr="flexbox" head="true" ></md-token-widget>

## 动画

### 动画演示
<md-token-widget transition="true" business="cosmic"></md-token-widget>
### 曲线
<md-token-widget business="cosmic" prefix="cos" attr="easing"></md-token-widget>
### 时长
<md-token-widget business="cosmic" prefix="cos" attr="duration" ></md-token-widget>

## 颜色

颜色变量的查询预览已经包含了语义，如：
1. `cos-color-text-x` 前缀命名的变量，对应样式为 `color: var(--cos-color-text-x)`，可以直接使用语义 `.cos-color-text-x()`
2. `cos-color-bg-x` 前缀命名的变量，对应样式为 `background-color: var(--cos-color-bg-x)`，可以直接使用语义 `.cos-color-bg-x()`
3. `cos-color-border-x` 前缀命名的变量，对应样式为 `border-color: var(--cos-color-border-x)`，可以直接使用语义 `.cos-color-border-x()`

请按照规范使用 Design Token 变量，避免“混搭”使用。


### 文本与图标色

#### 默认态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="text" exclude="-(disabled|active|hover)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link" ></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="(?=.*text)(?=.*disabled)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="(?=.*text)(?=.*active)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="(?=.*text)(?=.*hover)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link"></md-token-widget>

### 背景色

#### 默认态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="bg" exclude="-(disabled|active|hover)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link|raise|dent"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="(?=.*bg)(?=.*disabled)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link|raise|dent"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="(?=.*bg)(?=.*active)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link|raise|dent"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="(?=.*bg)(?=.*hover)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link|raise|dent"></md-token-widget>

### 边框色

#### 默认态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="border" exclude="-(disabled|active|hover)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="(?=.*border)(?=.*disabled)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="(?=.*border)(?=.*active)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos" attr="color" include="(?=.*border)(?=.*hover)" order="tiny|minor|slim|inverse|on-primary|primary|on-warning|warning|on-error|error|on-success|success|on-alive|alive|em|on-em|link"></md-token-widget>

### image 组件色

<md-token-widget business="cosmic" prefix="cos-image" attr="color" order="text|bg|border"></md-token-widget>

### tag 组件色
<md-token-widget business="cosmic" prefix="cos-tag" attr="color" order="text|bg|border"></md-token-widget>


### 透明度
<md-token-widget business="cosmic" prefix="cos" attr="opacity"></md-token-widget>

## 全局色板
<md-token-widget business="cosmic" prefix="cos" attr="platte"></md-token-widget>

<br /><br />

</md-tab-pane>


<md-tab-pane business="cosmic" prefix="cos-dqa">


## 颜色
### 文本与图标色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="text" exclude="-(disabled|active|hover)" order="text-primary|text-primary-active|text-primary-hover|text-on|bg|border|light|secondary" diff="true"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="(?=.*text)(?=.*disabled)" order="tiny|minor|slim|inverse" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="(?=.*text)(?=.*active)" order="tiny|minor|slim|inverse" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="(?=.*text)(?=.*hover)" order="tiny|minor|slim|inverse" diff="true" head="false"></md-token-widget>

### 背景色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="bg" exclude="-(disabled|active|hover)" order="primary|light|disabled|secondary" diff="true" ></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="(?=.*bg)(?=.*disabled)" order="tiny|minor|slim|inverse|secondary" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="(?=.*bg)(?=.*active)" order="tiny|minor|slim|inverse|secondary" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="(?=.*bg)(?=.*hover)" order="tiny|minor|slim|inverse" diff="true" head="false"></md-token-widget>

### 边框色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="border" exclude="-(disabled|active|hover)" order="border|primary|inverse|light|disabled|hover|secondary" diff="true"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="(?=.*border)(?=.*disabled)" order="tiny|minor|slim|inverse" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="(?=.*border)(?=.*active)" order="tiny|minor|slim|inverse" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-dqa" attr="color" include="(?=.*border)(?=.*hover)" order="tiny|minor|slim|inverse" diff="true" head="false"></md-token-widget>

</md-tab-pane>
 
<md-tab-pane business="cosmic" prefix="cos-shop">


## 颜色
### 文本与图标色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="text" exclude="-(disabled|active|hover)" order="primary|on-primary|light" diff="true"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="(?=.*text)(?=.*disabled)" order="primary|disabled" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="(?=.*text)(?=.*active)" order="text-active|primary" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="(?=.*text)(?=.*hover)" order="text-hover|primary" diff="true" head="false"></md-token-widget>

### 背景色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="bg" exclude="-(disabled|active|hover)" order="primary|on-primary|light" diff="true"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="(?=.*bg)(?=.*disabled)" order="primary|disabled" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="(?=.*bg)(?=.*active)" order="text-active|primary" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="(?=.*bg)(?=.*hover)" order="text-hover|primary" diff="true" head="false"></md-token-widget>

### 边框色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="border" exclude="-(disabled|active|hover)" order="primary|on-primary|light" diff="true"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="(?=.*border)(?=.*disabled)" order="primary|disabled" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="(?=.*border)(?=.*active)" order="text-active|primary" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-shop" attr="color" include="(?=.*border)(?=.*hover)" order="text-hover|primary" diff="true" head="false"></md-token-widget>

</md-tab-pane>


<md-tab-pane business="cosmic" prefix="cos-medical">


## 颜色

### 文本与图标色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="text" exclude="-(disabled|active|hover)" order="primary|on-primary|light" diff="true"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="(?=.*text)(?=.*disabled)" order="primary|disabled" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="(?=.*text)(?=.*active)" order="text-active|primary" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="(?=.*text)(?=.*hover)" order="text-hover|primary" diff="true" head="false"></md-token-widget>

### 背景色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="bg" exclude="-(disabled|active|hover)" order="primary|on-primary|light" diff="true" ></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="(?=.*bg)(?=.*disabled)" order="primary|disabled" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="(?=.*bg)(?=.*active)" order="text-active|primary" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="(?=.*bg)(?=.*hover)" order="text-hover|primary" diff="true" head="false"></md-token-widget>

### 边框色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="border" exclude="-(disabled|active|hover)" order="primary|on-primary|light|inverse" diff="true"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="(?=.*border)(?=.*disabled)" order="primary|disabled" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="(?=.*border)(?=.*active)" order="text-active|primary"  diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-medical" attr="color" include="(?=.*border)(?=.*hover)" order="text-hover|primary" diff="true" head="false"></md-token-widget>

</md-tab-pane>

<md-tab-pane business="cosmic" prefix="cos-education">


## 颜色

### 文本与图标色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="text" exclude="-(disabled|active|hover)" order="primary|on-primary|light" diff="true"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="(?=.*text)(?=.*disabled)" order="primary|disabled" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="(?=.*text)(?=.*active)" order="text-active|primary" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="(?=.*text)(?=.*hover)" order="text-hover|primary" diff="true" head="false"></md-token-widget>

### 背景色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="bg" exclude="-(disabled|active|hover)" order="primary|on-primary|light" diff="true" ></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="(?=.*bg)(?=.*disabled)" order="primary|disabled" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="(?=.*bg)(?=.*active)" order="text-active|primary" diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="(?=.*bg)(?=.*hover)" order="text-hover|primary" diff="true" head="false"></md-token-widget>

### 边框色

#### 默认态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="border" exclude="-(disabled|active|hover)" order="primary|on-primary|light|inverse" diff="true"></md-token-widget>

#### 禁用态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="(?=.*border)(?=.*disabled)" order="primary|disabled" diff="true" head="false"></md-token-widget>

#### 点击态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="(?=.*border)(?=.*active)" order="text-active|primary"  diff="true" head="false"></md-token-widget>

#### 悬浮态
<md-token-widget business="cosmic" prefix="cos-education" attr="color" include="(?=.*border)(?=.*hover)" order="text-hover|primary" diff="true" head="false"></md-token-widget>

</md-tab-pane>

</md-tabs>
