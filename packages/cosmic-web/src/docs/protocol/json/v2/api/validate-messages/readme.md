# validateMessages

validateMessages 从空状态开始，按顺序校验一组 Message，不创建、更新或渲染 Applet，也不要求注册 Component 和 Action 实现。

|方法|说明|
|---|---|
|validateMessages(messages: readonly unknown[], catalog: RuntimeCatalog, options?: ValidateOptions): ValidationResult&lt;Message[]&gt;|校验一组完整的 Message|

## 参数

|参数|必选|说明|
|---|---|---|
|messages|是|按顺序校验的 Message 数组|
|catalog|是|校验使用的运行时 Catalog|
|options|否|校验选项；可通过 autofix 控制是否先修复部分兼容格式，默认为 false|

## 返回结果

校验成功时，value 返回校验或修复后的 Message 数组；fixes 返回 autofix 的修复记录：

```ts
{
    ok: true, // 校验成功
    value: [/* Message */], // 校验或修复后的 Message 数组
    fixes: [ // autofix 的修复记录；未修复时为空数组
        'messages[0] root: normalized type to "Text"'
    ]
}
```

校验失败时，errors 返回错误列表；messageIndex 表示出错 Message 在数组中的下标：

```ts
{
    ok: false, // 校验失败
    errors: [{
        code: 'PROTOCOL_ERROR', // 错误码
        message: 'Unknown Applet: validation-error', // 错误信息
        // 错误阶段：protocol | catalog | binding | render | action
        phase: 'protocol',
        appletId: 'validation-error', // 相关 Applet ID，无法确定时省略
        componentId: 'root', // 相关 Component ID，无法确定时省略
        path: '/title', // 相关 Data 路径，无法确定时省略
        messageIndex: 1 // 出错 Message 在数组中的下标
    }],
    fixes: [] // 失败前已执行的 autofix 记录
}
```

## 示例效果
