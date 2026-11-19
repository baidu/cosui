/**
 * 从原始代码块文本中提取图表定义内容
 */
export function getDefinition(raw: string) {
    // 开头围栏信息串可能是中文别名（如 ```流程图），不能用 \w（不匹配 CJK），
    // 改为匹配整行非换行内容。
    return raw.replace(/^```[^\n]*\n/, '').replace(/```\s*$/, '');
}

/**
 * 计算图表定义文本的行数。
 */
export function getDefLength(definition: string) {
    return definition.split('\n').filter(Boolean).length;
}

/**
 * 判断原始定义文本是否已闭合（以 ``` 结尾）。
 */
export function isDefinitionClosed(raw: string | undefined): boolean {
    return !!raw && raw.endsWith('```');
}
