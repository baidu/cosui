# Applet

Applet 是独立的 UI 渲染单元，拥有自己的 Component、数据和生命周期，并由 AppletContext 管理。一个 AppletContext 可以同时管理多个互不影响的 Applet。

## 基本组成

|内容|说明|
|---|---|
|appletId|Applet 在当前 AppletContext 中的标识|
|components|用于描述界面的 Component 节点|
|data|Component 使用的数据|
|catalog|Component 和 Action 所遵循的 Catalog|

## 基本使用

可以创建 Applet，并将它挂载到指定节点。

```ts
const applet = appletContext.createApplet({
    appletId: 'travel',
    root: document.getElementById('travel-root')
});
```

通过 processMessage 向当前 Applet 添加 Component 或更新数据。

```ts
applet.processMessage({
    updates: [
        {
            id: 'root',
            type: 'Button'
        },
        {
            path: '',
            value: {city: '苏州'}
        }
    ]
});
```

不再需要时销毁 Applet。

```ts
applet.dispose();
```
