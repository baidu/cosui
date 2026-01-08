
export interface DatePickerPanelProps {

    /**
     * 选择类型
     * 单选: 'single'
     * 范围多选: 'range'
     */
    type?: string;

    /**
     * 默认值
     */
    value?: Date | Date[];

    /**
     * 禁用的日期时间
     */
    disabledDate?: (date: Date) => boolean;

    /**
     * 有效的日期范围
     */
    range?: Date[];

    /**
     * 控制日历面板显示的年份月份数据
     * - 单选模式: 长度=1
     * - 范围模式: 长度=2
     */
    controlDate?: Array<{
        year: number;
        month: number;
    }>; end?: string;
}



export interface DayItem {

    /**
     * 当前日期
     */
    date: Date;

    /**
     * 单选选中
     */
    selected?: boolean;

    /**
     * 范围选择开始
     */
    start?: boolean;

    /**
     * 范围选择中间
     */
    middle?: boolean;

    /**
     * 范围选择结束
     */
    end?: boolean;

    /**
     * 禁用
     */
    disabled?: boolean;

    /**
     * 是否为本月第一天
     */
    first?: boolean;

    /**
     * 是否为本月最后一天
     */
    last?: boolean;

    /**
     * 是否在当月
     */
    currentMonth?: boolean;

    /**
     * 是否是今天
     */
    today?: boolean;

    /**
     * 在范围选择时，仅选取开始时间时，是否是开始时间到被hover日期之间的日期
     */
    hoverInRange?: boolean;

    /**
     * 在范围选择时，仅选取开始时间时，是否为hover到的日期
     */
    hoverEnd?: boolean;
}

export interface DatePickerPanelEvents {
    change: {
        value: Date | Date[] | DayItem | DayItem[] | { date: Date | Date[] };
    };
}