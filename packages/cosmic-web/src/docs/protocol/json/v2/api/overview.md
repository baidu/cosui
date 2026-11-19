# API 说明

## AppletContext

|名称|说明|
|---|---|
|appletContext: AppletContext|默认实例|
|new AppletContext(options?: AppletContextOptions)|创建独立实例|
|appletContext.config(options: AppletContextConfig): void|更新 autofix、Catalog、Component 和 Action|
|appletContext.listen(listeners: AppletContextListeners): void|设置监听函数|
|appletContext.createApplet(options?: CreateAppletOptions): Applet|创建 Applet|
|appletContext.validateMessage(message: unknown): ValidationResult&lt;Message&gt;|校验消息但不提交修改|
|appletContext.processMessage(message: Message): ProcessResult|处理协议消息|
|appletContext.dispose(): void|销毁管理的 Applet 和挂载视图|

### AppletContextOptions

new AppletContext() 的参数，由 AppletContextConfig 和 AppletContextListeners 组成。所有字段均为可选。

#### AppletContextConfig

运行配置，也是 config() 的参数。

|字段|说明|
|---|---|
|autofix|是否在校验或处理前修复部分兼容格式，默认为 false|
|catalog|当前上下文使用的 RuntimeCatalog|
|components|Component 名称与 San Component 实现的映射；Builtin Component 无需注册|
|actions|Action 名称与处理函数的映射|

##### autofix

autofix 用于在校验或处理 Message 前自动修复部分兼容格式，默认为 false。可在创建 AppletContext 或调用 config 时设置。  
autofix 只处理有限的格式和命名问题，不能保证不合法的 Message 一定通过校验。修复内容通过返回结果中的 fixes 获取。

|配置|类型|是否必选|说明|
|---|---|---|---|
|autofix|boolean|否|是否自动修复部分兼容格式|

#### AppletContextListeners

监听配置，也是 listen() 的参数。

|字段|说明|
|---|---|
|onAppletCreated|Applet 创建后触发，参数为新建的 Applet|
|onAppletDeleted|Applet 删除后触发，参数包含 appletId|
|onAppletUpdated|Applet 更新后触发，参数包含 appletId|
|onError|处理或渲染出错时触发，参数为 AppletError|

### CreateAppletOptions

createApplet() 的参数。方法返回创建的 Applet，传入 root 时立即挂载。

|字段|说明|
|---|---|
|root|Applet 挂载节点；省略时可稍后通过 setRoot 设置|
|appletId|Applet ID，默认为空字符串|

### ValidationResult

validateMessage() 的返回值。该方法基于当前 Catalog 和 Applet 状态的副本校验一条 Message，不提交状态，也不触发渲染。

|字段|类型|说明|
|---|---|---|
|ok|boolean|校验是否成功|
|value|Message|仅成功时返回，校验或修复后的 Message|
|errors|ValidationError[]|仅失败时返回，错误列表|
|fixes|string[]|autofix 执行的修复列表，未修复时为空数组|

### Message

processMessage() 的参数，分为创建、更新和删除三种形式。

|形式|结构|说明|
|---|---|---|
|创建|{version: '2.0', applet: CreateApplet}|创建 Applet|
|更新|{version: '2.0', appletId?: string, updates: Update[]}|更新指定 Applet|
|删除|{version: '2.0', applet: DeleteApplet}|删除 Applet|

### ProcessResult

processMessage() 的返回值，通过 ok 区分成功和失败。

|字段|类型|说明|
|---|---|---|
|ok|boolean|处理是否成功|
|appletIds|string[]|仅成功时返回，本次处理的 appletId 列表|
|errors|AppletError[]|仅失败时返回，错误列表|
|fixes|string[]|autofix 执行的修复列表，未修复时为空数组|

#### AppletError

ProcessResult.errors 的元素类型，也是 onError 的参数。

|字段|类型|说明|
|---|---|---|
|code|string|错误码|
|message|string|错误信息|
|phase|'protocol' \| 'catalog' \| 'binding' \| 'render' \| 'action'|错误阶段|
|appletId|string|相关 Applet ID|
|componentId|string|相关 Component ID|
|path|string|相关 Data 路径|


## Applet

|名称|说明|
|---|---|
|appletId: string|Applet ID，只读|
|mounted: boolean|是否已挂载，只读|
|setRoot(root: HTMLElement): void|更新挂载节点并渲染|
|processMessage(message: AppletUpdate): ProcessResult|处理 Applet 更新|
|dispose(): void|销毁 Applet|

## Catalog

|名称|说明|
|---|---|
|defineCatalog(definition: CatalogDefinition): RuntimeCatalog|定义 运行时Catalog|
|exportCatalog(catalog: RuntimeCatalog): Catalog|导出可序列化的 Catalog|
