# Applet

Applet 是由 AppletContext 创建和管理的 UI 实例，支持挂载、更新和销毁。

## 创建 Applet

|方法|说明|
|---|---|
|appletContext.createApplet(options?: CreateAppletOptions): Applet|创建并返回 Applet；传入 root 后立即挂载|

### CreateAppletOptions

|参数|类型|必选|说明|
|---|---|---|---|
|root|HTMLElement|否|Applet 的挂载节点；未传入时可通过 setRoot 设置|
|appletId|string|否|Applet ID，默认为空字符串|

## 使用 Applet

|方法|说明|
|---|---|
|setRoot(root: HTMLElement): void|设置挂载节点并渲染|
|processMessage(message: AppletUpdate): ProcessResult|更新 Applet，并返回处理结果|
|dispose(): void|销毁 Applet|

## 示例效果
