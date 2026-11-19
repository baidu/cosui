export const commonThemeVariables = {
    darkMode: false, // 是否启用暗色模式；会影响派生颜色的计算方式
    background: '#f4f4f4', // 图表背景色；用于推导与背景相关或需要和背景形成对比的颜色
    fontSize: '16px', // 图表文本基础字号，锁定以防止容器字体变化影响
    primaryColor: '#EBF3FF', // 主要背景色，常用于节点/主体元素；其他颜色会基于它派生
    primaryTextColor: '#000311', // 使用 primaryColor 作为背景时的文本颜色；默认根据 darkMode 推导
    primaryBorderColor: '#3366FF', // 使用 primaryColor 作为背景时的边框颜色；默认由 primaryColor 推导
    lineColor: '#B7B9C1' // 通用线条颜色；默认由 background 推导
};

export const customThemeVariables = {
    lineColor: '#B7B9C1',
    edgeLabelBackground: '#F7E8FF',
    borderRadius: '12px'
};
