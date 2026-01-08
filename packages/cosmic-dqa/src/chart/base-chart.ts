/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component} from 'san';
import type {ECharts, EChartsOption, TooltipComponentOption} from 'echarts';
import Loading from '@cosui/cosmic/loading';
import {isAndroid} from '@cosui/cosmic/util';
import {colors, customColors} from './constant';
import {ChartProps, ChartData, Theme} from './interface';
import {deepMerge} from './utils';

/**
 * 所有图表的基类
 * 提供通用的图表配置和方法
 * 子类可以继承并重写特定方法来实现不同类型的图表
 */
export default class BaseChart extends Component<ChartProps & ChartData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-chart">
            <cos-loading s-if="_loading" />
            <div class="cosd-chart-container" s-ref="chartContainer" />
        </div>
    `;

    static components = {
        'cos-loading': Loading
    };

    // ECharts实例
    chartInstance: ECharts | null;
    // 根元素样式表
    styleDeclaration: CSSStyleDeclaration | null;
    // 主题模式变化监听器清理函数
    themeObserverCleanup: (() => void) | null;

    initData() {
        return {
            option: {},
            _loading: true
        };
    }

    inited() {
        this.chartInstance = null;
        this.styleDeclaration = null;
        this.themeObserverCleanup = null;
    }

    attached() {
        this.styleDeclaration = getComputedStyle(this.el!);
        const chartContainer = this.ref('chartContainer') as unknown as HTMLDivElement;

        import('echarts').then(echarts => {
            const mainChart = echarts.init(chartContainer);

            this.initChart(mainChart);
        }).catch(error => {
            throw new Error(`ECharts initialization failed: ${error.message}`);
        }).finally(() => {
            this.data.set('_loading', false);
        });
    }

    updated() {
        if (this.chartInstance && this.data.get('option')) {
            this.updateChart();
        }
    }

    disposed() {
        this.chartInstance?.dispose();
        this.themeObserverCleanup?.();
        window.removeEventListener('resize', this.handleResize);
    }

    // 初始化图表
    initChart(chartInstance: ECharts) {
        this.chartInstance = chartInstance;
        this.handleResize = this.handleResize.bind(this);

        // 监听窗口大小变化
        window.addEventListener('resize', this.handleResize);
        // 监听图表渲染完成事件
        this.chartInstance.on('finished', this.handleChartRendered.bind(this));
        // 监听主题模式变化
        this.themeObserverCleanup = this.onColorSchemeChange(() => {
            this.chartInstance?.setOption(this.getDarkModeStyle());
        });
        this.updateChart();
    }

    // 更新图表
    updateChart() {
        if (!this.chartInstance) {
            return;
        }

        const option = this.mergeOption();

        this.chartInstance.setOption(option, true);
    }

    // 处理窗口大小变化
    handleResize() {
        this.chartInstance?.resize();
    }

    // 获取所有类型图表的默认配置，子类可重写来添加特有样式
    getDefaultOption(): EChartsOption {
        const textColor = this.getDesignToken('--cos-color-text');
        const textSize = this.getDesignToken('--cos-text-caption');
        const axisLineColor = this.getDesignToken('--cos-color-border-minor');

        return {
            title: {
                left: 'center',
                textStyle: {
                    fontSize: this.getDesignToken('--cos-text-body'),
                    color: textColor
                },
                top: 1
            },
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    color: textColor
                },
                borderWidth: 0,
                backgroundColor: this.getDesignToken('--cos-color-bg-raised'),
                shadowColor: customColors.chartShadowColor,
                shadowBlur: 4,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderColor: customColors.chartBg,
                borderRadius: 6,
                confine: true
            },
            legend: {
                type: 'scroll',
                orient: 'horizontal',
                icon: 'circle',
                itemHeight: 8,
                itemWidth: 8,
                itemStyle: {
                    borderWidth: 0
                },
                padding: 0,
                top: 23,
                pageTextStyle: {
                    color: textColor
                },
                textStyle: {
                    color: textColor
                },
                pageIconColor: textColor
            },
            xAxis: {
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: axisLineColor
                    }
                },
                axisLabel: {
                    color: textColor,
                    fontSize: textSize
                },
                nameLocation: 'middle',
                nameGap: 35,
                nameTextStyle: {
                    color: textColor
                }
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: textColor,
                    fontSize: textSize
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: axisLineColor
                    }
                }
            },
            grid: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 55,
                containLabel: true
            },
            animation: true,
            animationDuration: 1000,
            color: colors,
            backgroundColor: 'transparent'
        };
    }

    // 获取暗黑模式样式
    getDarkModeStyle(): EChartsOption {
        this.styleDeclaration = getComputedStyle(this.el!);
        const textColor = this.getDesignToken('--cos-color-text');

        return {
            textStyle: {
                color: textColor
            },
            legend: {
                textStyle: {
                    color: textColor
                },
                pageTextStyle: {
                    color: textColor
                },
                pageIconColor: textColor
            },
            title: {
                textStyle: {
                    color: textColor
                }
            },
            tooltip: {
                textStyle: {
                    color: textColor
                },
                backgroundColor: this.getDesignToken('--cos-color-bg-raised')
            },
            xAxis: {
                axisLabel: {
                    color: textColor
                },
                nameTextStyle: {
                    color: textColor
                }
            },
            yAxis: {
                axisLabel: {
                    color: textColor
                }
            },
            backgroundColor: 'transparent'
        };
    }

    // 合并用户配置和默认配置
    mergeOption(): EChartsOption {
        const baseOption = this.getDefaultOption();
        const userOption = this.data.get('option') || {};
        const mergedOption = deepMerge(baseOption, userOption);

        // 允许子类对合并后的配置进行后处理
        return this.postProcessOption(mergedOption);
    }

    // 后处理配置的钩子方法，子类可重写
    postProcessOption(option: EChartsOption): EChartsOption {
        const tooltipFormatter = this.getTooltipFormatter();
        if (tooltipFormatter) {
            const tooltip = option.tooltip;
            if (tooltip === undefined) {
                option.tooltip = {formatter: tooltipFormatter};
            }
            else {
                if (tooltip && !Array.isArray(tooltip) && !tooltip.formatter) {
                    tooltip.formatter = tooltipFormatter;
                }
            }
        }
        return option;
    }
    // 子类可覆盖默认的 tooltip formatter
    getTooltipFormatter(): TooltipComponentOption['formatter'] | undefined {
        return undefined;
    }

    // 获取设计token，echarts组件颜色不可使用css的方式变换颜色模式，需要使用js的方式
    getDesignToken(tokenName: string) {
        // 获取 CSS 变量的值
        return this.styleDeclaration?.getPropertyValue(tokenName);
    }

    /**
     * 处理图表渲染完成事件
     * @see https://echarts.apache.org/zh/api.html#events.finished
     * echarts没有提供直接的事件监听方法来处理图表渲染完成
     * finished事件会在每次图表渲染完成后触发
     * 可以通过只监听一次finished事件来实现类似inited的效果
     */
    handleChartRendered() {
        this.chartInstance?.off('finished');
        this.fire('chart-rendered');
    }

    // 获取当前主题模式
    getCurrThemeMode(bodyDOM: HTMLElement): Theme {
        return (bodyDOM?.classList?.contains('darkmode')
            || bodyDOM?.classList?.contains('cos-dark')) ? Theme.DARK : Theme.LIGHT;
    }

    /**
     * 检查是否处于暗黑模式并设置监听
     * ECharts不支持css token的方式来变换颜色模式，只能通过js的方式重新设置颜色相关属性
     */
    onColorSchemeChange(setColorScheme: (colorScheme: Theme) => void) {
        // 获取body dom，agent中是.entry-container类上加cos-dark
        const bodyDOM = document.querySelector('.entry-container') as HTMLElement
            || document.querySelector('body') as HTMLElement;
        let colorScheme = this.getCurrThemeMode(bodyDOM);
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

        if (!bodyDOM) {
            return () => { };
        }

        // 设置监听body class变化
        const classListener = new MutationObserver(() => {
            const newColorScheme = this.getCurrThemeMode(bodyDOM);

            if (newColorScheme !== colorScheme) {
                colorScheme = newColorScheme;

                // 调用回调函数更新颜色模式
                setColorScheme(newColorScheme);
            }
        });
        const mediaListener = (e: MediaQueryListEvent) => {
            const newColorScheme = e.matches ? Theme.DARK : Theme.LIGHT;

            if (newColorScheme !== colorScheme) {
                colorScheme = newColorScheme;

                setColorScheme(newColorScheme);
            }
        };

        if (isAndroid) {
            colorScheme = matchMedia.matches ? Theme.DARK : Theme.LIGHT;

            matchMedia.addEventListener('change', mediaListener);
        }
        else {
            classListener.observe(bodyDOM, {attributes: true, attributeFilter: ['class']});
        }

        return () => {
            classListener.disconnect();
            matchMedia.removeEventListener('change', mediaListener);
        };
    }
}
