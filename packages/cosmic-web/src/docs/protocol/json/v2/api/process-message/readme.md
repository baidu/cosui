# processMessage 消息处理

processMessage 处理一条 Message，用于创建、更新或删除 Applet。

|方法|说明|
|---|---|
|appletContext.processMessage(message: Message): ProcessResult|处理消息并返回结果|

### 创建

```ts
{version: '2.0', applet: CreateApplet}
```

#### CreateApplet

|参数|类型|必选|说明|
|---|---|---|---|
|appletId|string|否|Applet ID，省略时使用空字符串|
|catalog|string|否|Catalog ID，省略时使用 AppletContext 配置的 Catalog|
|data|JsonObject|否|初始 Data，默认为空对象|
|components|ComponentNode[]|否|初始 Component 列表|
|extensions|JsonObject|否|Catalog 声明的扩展数据|

### 更新

```ts
{version: '2.0', appletId?: string, updates: Update[]}
```

|参数|类型|必选|说明|
|---|---|---|---|
|appletId|string|否|目标 Applet ID，省略时更新默认 Applet|
|updates|Update[]|是|按顺序处理的更新列表|

### 删除

```ts
{version: '2.0', applet: DeleteApplet}
```

#### DeleteApplet

|参数|类型|必选|说明|
|---|---|---|---|
|appletId|string|否|目标 Applet ID，省略时删除默认 Applet|
|delete|true|是|删除标记|

### ProcessResult

|结果|类型|说明|
|---|---|---|
|成功|{ok: true, appletIds: string[]}|返回本次处理的 Applet ID|
|失败|{ok: false, errors: AppletError[]}|返回错误列表，并触发 onError|

## 示例效果
