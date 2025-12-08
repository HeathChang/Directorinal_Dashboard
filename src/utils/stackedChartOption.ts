import type { iStackedChartData, iLegendItem } from '../types/chart.type';
import type { EChartsOption } from 'echarts';
import { getDefaultColor } from './chartUtils';

interface CreateStackedBarChartOptionParams {
    data: iStackedChartData[];
    categories: string[];
    legendItems: iLegendItem[];
    xAxisName?: string;
    yAxisName?: string;
    yAxisMax?: number;
    yAxisFormatter?: string;
}

export const createStackedBarChartOption = ({
    data,
    categories,
    legendItems,
    xAxisName = 'week',
    yAxisName = 'Percentage (%)',
    yAxisMax = 100,
    yAxisFormatter = '{value}%'
}: CreateStackedBarChartOptionParams): EChartsOption => {
    if (!data || data.length === 0 || !categories || categories.length === 0) {
        return {};
    }

    const visibleCategories = categories.filter(cat => {
        const legendItem = legendItems.find(li => li.name === cat);
        return legendItem?.visible !== false;
    });

    if (visibleCategories.length === 0) {
        return {};
    }

    return {
        tooltip: {
            trigger: 'axis' as const,
            axisPointer: {
                type: 'shadow' as const
            },
            formatter: (params: unknown) => {
                if (!Array.isArray(params) || params.length === 0) return '';
                const p = params as Array<{ axisValue?: string; marker?: string; seriesName?: string; value?: number }>;
                let result = `${p[0].axisValue || ''}<br/>`;
                let total = 0;
                p.forEach((param) => {
                    if (param.value !== undefined) {
                        result += `${param.marker || ''}${param.seriesName || ''}: ${param.value}${yAxisFormatter.includes('%') ? '%' : ''}<br/>`;
                        total += param.value;
                    }
                });
                result += `Total: ${total}${yAxisFormatter.includes('%') ? '%' : ''}`;
                return result;
            }
        },
        legend: {
            show: false
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '8%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category' as const,
            name: 'week',
            nameLocation: 'middle' as const,
            nameGap: 30,
            data: data.map(item => item[xAxisName] as string),
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                rotate: 0
            }
        },
        yAxis: {
            type: 'value' as const,
            name: yAxisName,
            max: yAxisMax,
            axisLabel: {
                formatter: yAxisFormatter
            }
        },
        series: visibleCategories.map((cat, index) => {
            const legendItem = legendItems.find(li => li.name === cat);
            return {
                name: cat,
                type: 'bar' as const,
                stack: 'total',
                data: data.map(item => Number(item[cat]) || 0),
                itemStyle: {
                    color: legendItem?.color || getDefaultColor(index)
                },
                label: {
                    show: true,
                    position: 'inside' as const,
                    formatter: `{c}${yAxisFormatter.includes('%') ? '%' : ''}`,
                    fontSize: 11,
                    fontWeight: 'normal'
                }
            };
        })
    };
};

interface CreateStackedAreaChartOptionParams {
    data: iStackedChartData[];
    categories: string[];
    legendItems: iLegendItem[];
    xAxisName?: string;
    yAxisName?: string;
    yAxisMax?: number;
    yAxisFormatter?: string;
}

export const createStackedAreaChartOption = ({
    data,
    categories,
    legendItems,
    xAxisName = 'week',
    yAxisName = 'Percentage (%)',
    yAxisMax = 100,
    yAxisFormatter = '{value}%'
}: CreateStackedAreaChartOptionParams): EChartsOption => {
    if (!data || data.length === 0 || !categories || categories.length === 0) {
        return {};
    }

    const visibleCategories = categories.filter(cat => {
        const legendItem = legendItems.find(li => li.name === cat);
        return legendItem?.visible !== false;
    });

    if (visibleCategories.length === 0) {
        return {};
    }

    return {
        tooltip: {
            trigger: 'axis' as const,
            axisPointer: {
                type: 'cross' as const
            },
            formatter: (params: unknown) => {
                if (!Array.isArray(params) || params.length === 0) return '';
                const p = params as Array<{ axisValue?: string; marker?: string; seriesName?: string; value?: number }>;
                let result = `${p[0].axisValue || ''}<br/>`;
                let total = 0;
                p.forEach((param) => {
                    if (param.value !== undefined) {
                        result += `${param.marker || ''}${param.seriesName || ''}: ${param.value}${yAxisFormatter.includes('%') ? '%' : ''}<br/>`;
                        total += param.value;
                    }
                });
                result += `Total: ${total}${yAxisFormatter.includes('%') ? '%' : ''}`;
                return result;
            }
        },
        legend: {
            show: false
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '8%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category' as const,
            name: 'week',
            nameLocation: 'middle' as const,
            nameGap: 30,
            boundaryGap: false,
            data: data.map(item => item[xAxisName] as string),
            axisLabel: {
                interval: 0,
                rotate: 0
            }
        },
        yAxis: {
            type: 'value' as const,
            name: yAxisName,
            max: yAxisMax,
            axisLabel: {
                formatter: yAxisFormatter
            }
        },
        series: visibleCategories.map((cat, index) => {
            const legendItem = legendItems.find(li => li.name === cat);
            return {
                name: cat,
                type: 'line' as const,
                stack: 'total',
                areaStyle: {},
                data: data.map(item => Number(item[cat]) || 0),
                itemStyle: {
                    color: legendItem?.color || getDefaultColor(index)
                },
                label: {
                    show: true,
                    position: 'top' as const,
                    formatter: `{c}${yAxisFormatter.includes('%') ? '%' : ''}`,
                    fontSize: 11,
                    fontWeight: 'normal'
                }
            };
        })
    };
};

export const createInitialStackedLegendItems = (categories: string[]): iLegendItem[] => {
    return categories.map((cat, index) => ({
        name: cat,
        color: getDefaultColor(index),
        visible: true
    }));
};

