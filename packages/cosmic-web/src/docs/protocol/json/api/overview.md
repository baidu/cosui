
# API 说明

## API 接口

|方法|说明|
|---|---|
|compile({ui, components, events, dataExtends, actions, nodes, onRendered}: CompileOption): AppComponent|编译|
|app.attach(el: HTMLElement)|渲染至节点|
|app.appendData(data: Data, options?: san.DataChangeOption)|数据分段追加|
|compileUI(ui, {components, events}): string |编译 UI|
|compileDataExtends(dataExtends): DataTransformer| 扩展数据转换器|
|dataTransformer(data, prevData): Data|转换扩展数据|

## 参数说明
|参数|类型|是否必选|默认值|说明|
|---|---|---|---|---|
|ui|UI|是|-|ui 配置项，同 `UI语法` 部分|
|components|{[key: string]: san.Component}|是|-|自定义组件，定义 UI 协议的 节点类型 能力|
|dataExtends|Data|否|-|自定义数据，扩展 UI 协议的所需数据|
|actions|{[key: string]: (e) => void}|否|-|自定义行为，定义 UI 协议的 action 能力|
|events|EventOption|否|-|自定义事件，对应处理组件自定义事件|
|nodes|{[key: string]: (node: UI) => UI}|否|-|自定义节点，用于节点信息二次变更|
|onRendered|() => void|否|-|渲染完成事件，首次二次数据更新时，节点数据渲染完成事件|

## 类型说明

```
interface CompileOption {
    ui: UI;
    components: {
        [key: string]: san.Component;
    };

    dataExtends?: Data;
    actions?: {
        [key: string]: ActionListener;
    };
    events?: EventOption;

    nodes?: {
        [key: string]: NodeTransformer
    };

    onRendered?: () => void;
};

interface EventOption {
    [key: string]: {
        [key: string]: EventListener | EventListenerOption | undefined;
    };
};

interface EventListenerOption {
    dom?: boolean;
    listener: EventListener;
}

interface Args {
    node: string;
    args: Record<string, unknown>;
};

type ActionListener = (args: Args) => void;
type EventListener = (event: unknown) => void;
type Data = Record<string, unknown>;
type NodeTransformer = (node: UI) => UI;
```