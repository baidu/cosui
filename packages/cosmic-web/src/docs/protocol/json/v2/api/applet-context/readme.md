# AppletContext

AppletContext 保存 Catalog、Component 和 Action 配置，并通过消息创建、更新或删除 Applet。

## 创建 AppletContext

|方式|说明|
|---|---|
|new AppletContext(options?: AppletContextOptions)|创建独立的 AppletContext|

### AppletContextOptions

|参数|类型|必选|说明|
|---|---|---|---|
|autofix|boolean|否|是否自动修复部分兼容格式，默认为 false|
|catalog|RuntimeCatalog|否|当前上下文使用的 Catalog|
|components|Record<string, san.DefinedComponentClass>|否|Component 名称与 San Component 实现的映射|
|actions|Record<string, ActionHandler>|否|Action 名称与处理函数的映射|
|onAppletCreated|(applet: Applet) => void|否|Applet 创建后触发|
|onAppletDeleted|(info: {appletId: string}) => void|否|Applet 删除后触发|
|onAppletUpdated|(info: {appletId: string}) => void|否|Applet 更新后触发|
|onError|(error: AppletError) => void|否|处理或渲染出错时触发|

## 方法

|方法|说明|
|---|---|
|config(options: AppletContextConfig): void|更新 autofix、Catalog、Component 或 Action 配置；存在 Applet 时不可调用|
|listen(listeners: AppletContextListeners): void|更新创建、删除、更新和错误监听函数|
|createApplet(options?: CreateAppletOptions): Applet|创建并返回 Applet|
|validateMessage(message: unknown): ValidationResult&lt;Message&gt;|校验消息但不提交修改|
|processMessage(message: Message): ProcessResult|校验并处理协议消息，返回处理结果|
|dispose(): void|销毁当前上下文管理的全部 Applet 和挂载视图|

## 示例效果
