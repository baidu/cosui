
/**
 * 判断 input 的 prev 按钮是否可用
 * @param date 当前时间
 * @param year 比对的年份
 * @param month 比对的月份
 * @returns 比对结果
 */
export function prevAction(date: Date, year: number, month: number) {
    return date.getFullYear() > year
    || (date.getFullYear() === year && date.getMonth() + 1 >= month);
};

/**
 * 判断 input 的 next 按钮是否可用
 * @param date 当前时间
 * @param year 比对的年份
 * @param month 比对的月份
 * @returns 比对结果
 */
export function nextAction(date: Date, year: number, month: number) {
    return date.getFullYear() < year
        || (date.getFullYear() === year && date.getMonth() + 1 <= month);
};

/**
 * 获取指定日期前N天的日期
 *
 * @param date 指定的日期
 * @param step 要回退的天数，默认为1
 * @returns 返回指定日期前N天的日期
 */
export function getPreviousDay(date: Date, step = 1) {
    const result = new Date(date);
    result.setDate(date.getDate() - step);
    return result;
};

/**
 * 获取指定日期之后的第几天的日期
 *
 * @param date 指定日期
 * @param step 指定天数，默认为1天
 * @returns 返回指定日期之后的第几天的日期
 */
export function getNextDay(date: Date, step = 1) {
    const result = new Date(date);
    result.setDate(date.getDate() + step);
    return result;
};