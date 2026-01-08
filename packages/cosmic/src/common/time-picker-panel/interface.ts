
import type {RollingData} from '../../util/date-time';

export interface TimePickerPanelProps {
    /**
     * 选择器数据
     */
    pickerData: {
        columns: string[];
        selectedIndex: number;
    };

    /**
     * 时间格式数组
     */
    format: string[];

    /**
     * 时间滚轮展示信息
     */
    timeInfo: RollingData;
}