export const DIRECTIVE_NAME_DIAGRAM = 'el-markdown-diagram';
/** 图表根节点（指令标签）上的样式类，样式统一走 class，不依赖标签选择器 */
export const CLASS_NAME_DIAGRAM = 'cosd-diagram';

export const TAG_NAME_DIAGRAM_WRAPPER = 'selection';
export const CLASS_NAME_DIAGRAM_WRAPPER = 'cosd-diagram-wrapper';

export const TAG_NAME_DIAGRAM_HEADER = 'header';
export const CLASS_NAME_DIAGRAM_HEADER = 'cosd-diagram-header';

export const TAG_NAME_DIAGRAM_BODY = 'main';
export const CLASS_NAME_DIAGRAM_BODY = 'cosd-diagram-body';

export const TAG_NAME_DIAGRAM_MAIN = 'div';
export const CLASS_NAME_DIAGRAM_MAIN = 'cosd-diagram-main';

export const TAG_NAME_DIAGRAM_VIEW = 'section';
export const CLASS_NAME_DIAGRAM_VIEW = 'cosd-diagram-diagram-view';

export const TAG_NAME_DIAGRAM_CODE_VIEW = 'section';
export const CLASS_NAME_DIAGRAM_CODE_VIEW = 'cosd-diagram-code-view';

export const SELECTOR_DIAGRAM_HOST
    = `${DIRECTIVE_NAME_DIAGRAM} > ${TAG_NAME_DIAGRAM_WRAPPER} > .${CLASS_NAME_DIAGRAM_VIEW}`
    + ` > ${TAG_NAME_DIAGRAM_BODY} > ${TAG_NAME_DIAGRAM_MAIN}`;

export const DiagramViewMode = {
    diagram: 'diagram',
    code: 'code'
};

export const DiagramRenderStatus = {
    success: 'success',
    fail: 'fail',
    complete: 'complete'
};

export const DiagramLang = {
    mermaid: 'mermaid',
    markmap: 'markmap',
    mindmap: 'mindmap'
};

/**
 * 中文图表语言别名 → 实际渲染器语言。
 * 产品数据产出会用中文标注代码块语言（如 ```流程图），需映射到对应渲染器：
 * 流程图 / 时序图 / 甘特图 均为 mermaid 语法，走 mermaid；思维导图走 markmap。
 */
export const DiagramLangAlias = {
    流程图: DiagramLang.mermaid,
    时序图: DiagramLang.mermaid,
    甘特图: DiagramLang.mermaid,
    思维导图: DiagramLang.markmap
} as const;
