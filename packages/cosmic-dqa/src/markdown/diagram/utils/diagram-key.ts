/**
 * 图表标识key生成函数
 */
export function getDiagramKey(raw: string): string {
    const text = (raw || '').trim();
    // djb2 哈希，足够区分不同图表内容
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) + hash) ^ text.charCodeAt(i);
    }
    // 转无符号 36 进制，附带长度降低碰撞概率
    return `${(hash >>> 0).toString(36)}-${text.length}`;
}
