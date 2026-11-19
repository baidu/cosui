import {
    DIRECTIVE_NAME_DIAGRAM,
    TAG_NAME_DIAGRAM_BODY,
    TAG_NAME_DIAGRAM_CODE_VIEW,
    TAG_NAME_DIAGRAM_HEADER,
    TAG_NAME_DIAGRAM_MAIN,
    TAG_NAME_DIAGRAM_VIEW,
    TAG_NAME_DIAGRAM_WRAPPER
} from './const';
import {DatasetKey} from './dataset-keys';
import {createDiagramLoadingHast} from './loading-hast';

export interface DiagramHastNode {
    type: string;
    tagName?: string;
    value?: string;
    properties?: Record<string, unknown>;
    children?: DiagramHastNode[];
}

/** class 列表允许含 undefined（自定义主题类缺省时），构建时统一过滤 */
type ClassNames = Array<string | undefined>;

export interface BuildDiagramHastOptions {
    /** 根节点（指令标签）class：cosd-diagram 根类 + 自定义主题类（端差异由各端 CSS 承担，不挂平台类） */
    rootClassName: ClassNames;
    wrapperClassName: ClassNames;
    viewClassName: ClassNames;
    headerClassName: ClassNames;
    bodyClassName: ClassNames;
    mainClassName: ClassNames;
    codeViewClassName: ClassNames;
    /** 头部展示的语言文本（可为中文别名） */
    headerText: string;
    /** data-lang：渲染器派发用的 canonical 语言 */
    lang: string;
    /** data-type：图表子类型中文名（流程图/时序图...），供业务直接读取；缺省则不写 */
    type?: string;
    /** data-viewmode：初始视图 */
    viewMode: string;
    /** data-raw：SSR 占位不写（代码已存在隐藏的代码视图里，重渲染会重新生成） */
    raw?: string;
    /** 图表视图是否隐藏（源码视图为初始视图时） */
    diagramViewHidden?: boolean;
    /** 代码视图是否隐藏 */
    codeViewHidden?: boolean;
    /** 隐藏的代码视图里原始的 pre 节点 */
    codeNode: DiagramHastNode;
}

function element(
    tagName: string,
    className: ClassNames,
    children: DiagramHastNode[],
    properties: Record<string, unknown> = {},
): DiagramHastNode {
    return {
        type: 'element',
        tagName,
        properties: {className: className.filter(Boolean) as string[], ...properties},
        children
    };
}

export function buildDiagramHast(options: BuildDiagramHastOptions): DiagramHastNode {
    const {
        rootClassName, wrapperClassName, viewClassName, headerClassName,
        bodyClassName, mainClassName, codeViewClassName,
        headerText, lang, type, viewMode, raw, diagramViewHidden, codeViewHidden, codeNode
    } = options;

    const mainProperties: Record<string, unknown> = {
        ['data-' + DatasetKey.lang]: lang
    };
    if (raw !== undefined) {
        mainProperties['data-' + DatasetKey.raw] = raw;
    }
    if (type) {
        mainProperties['data-' + DatasetKey.type] = type;
    }
    mainProperties['data-' + DatasetKey.viewMode] = viewMode;

    // 预置静态加载态，占位期即显示「加载中」而非空白盒子，
    // 真实渲染时由 attachDiagramRendering / innerHTML 原样替换
    const loadingNode = createDiagramLoadingHast() as DiagramHastNode;
    const main = element(TAG_NAME_DIAGRAM_MAIN, mainClassName, [loadingNode], mainProperties);
    const body = element(TAG_NAME_DIAGRAM_BODY, bodyClassName, [main]);
    const header = element(TAG_NAME_DIAGRAM_HEADER, headerClassName, [{type: 'text', value: headerText}]);
    const diagramView = element(
        TAG_NAME_DIAGRAM_VIEW,
        viewClassName,
        [header, body],
        diagramViewHidden ? {style: 'display:none;'} : {}
    );
    const codeView = element(
        TAG_NAME_DIAGRAM_CODE_VIEW,
        codeViewClassName,
        [codeNode],
        codeViewHidden ? {style: 'display:none;'} : {}
    );
    const wrapper = element(TAG_NAME_DIAGRAM_WRAPPER, wrapperClassName, [diagramView, codeView]);

    return element(DIRECTIVE_NAME_DIAGRAM, rootClassName, [wrapper]);
}
