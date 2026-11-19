/**
 * diagram 占位容器 DOM dataset 属性
 */
export const DatasetKey = {
    /** 图表语言类型，对应 data-lang */
    lang: 'lang',
    /** 图表原始代码块文本，对应 data-raw */
    raw: 'raw',
    /** 图表子类型（中文名：流程图/时序图/甘特图/思维导图/实体关系图...）对应 data-type */
    type: 'type',
    /** 图表渲染状态，对应 data-render-status */
    renderStatus: 'renderstatus',
    // 视图模式：包含图表/代码
    viewMode: 'viewmode'
} as const;

/**
 * 流程图多边形节点（如菱形判定框）经圆角化处理后由 <polygon> 替换成 <path> 的标记属性。
 */
export const ROUNDED_POLYGON_ATTR = 'data-cos-rounded-polygon';
