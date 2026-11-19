# autofix

autofix 用于修复 Message 中部分可识别的格式问题，例如将旧的小写内置类型 `text` 改为 `Text`。autofix 默认关闭，无法修复业务逻辑或数据错误。修复内容通过返回结果中的 fixes 获取。

## 在 validateMessages 中使用

在 options 中传入 `autofix: true`，校验前会先尝试修复 Message。具体用法见 [validateMessages](/protocol/json/v2/api/validate-messages)。

## 在 AppletContext 中使用

创建 AppletContext 时传入 `autofix: true`。之后调用 validateMessage 或 processMessage，都会先尝试修复传入的 Message。

```ts
const appletContext = new AppletContext({
    catalog,
    components,
    actions,
    autofix: true
});

const validation = appletContext.validateMessage(message);
const result = appletContext.processMessage(message);
```

validateMessage 只校验，不修改 Applet；processMessage 在修复和校验通过后处理 Message。两者都会在 fixes 中返回本次修复记录。存在 Applet 前，也可以通过 config 修改 autofix 配置。

## 示例效果
