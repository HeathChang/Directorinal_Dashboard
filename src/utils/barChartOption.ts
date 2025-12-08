import type { iBarChartData, iLegendItem } from '../types/chart.type';
import type { EChartsOption } from 'echarts';

const getDefaultColor = (index: number): string => {
    const colors = [
        '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
        '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
    ];
    return colors[index % colors.length];
};

interface CreateBarChartOptionParams {
    data: iBarChartData[];
    legendItems: iLegendItem[];
    xAxisName?: string;
    yAxisName?: string;
    tooltipFormatter?: (params: unknown) => string;
}

export const createBarChartOption = ({
    data,
    legendItems,
    xAxisName,
    yAxisName,
    tooltipFormatter
}: CreateBarChartOptionParams): EChartsOption => {
    if (!data || data.length === 0) {
        return {};
    }

    const visibleData = data.filter(item => {
        const legendItem = legendItems.find(li => li.name === item.name);
        return legendItem?.visible !== false;
    });

    if (visibleData.length === 0) {
        return {};
    }

    return {
        tooltip: {
            trigger: 'axis' as const,
            axisPointer: {
                type: 'shadow' as const
            },
            ...(tooltipFormatter && { formatter: tooltipFormatter })
        },
        legend: {
            show: false
        },
        grid: {
            left: yAxisName ? '10%' : '3%',
            right: '4%',
            bottom: xAxisName ? '12%' : '5%',
            top: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category' as const,
            data: visibleData.map(item => item.name),
            ...(xAxisName && {
                name: xAxisName,
                nameLocation: 'middle' as const,
                nameGap: 30
            }),
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value' as const,
            ...(yAxisName && {
                name: yAxisName,
                nameLocation: 'middle' as const,
                nameGap: 50,
                nameTextStyle: {
                    padding: [0, 0, 0, 0]
                }
            })
        },
        series: [
            {
                name: yAxisName || 'Value',
                type: 'bar' as const,
                data: visibleData.map((item, index) => {
                    const legendItem = legendItems.find(li => li.name === item.name);
                    return {
                        value: item.value,
                        itemStyle: {
                            color: legendItem?.color || getDefaultColor(index)
                        }
                    };
                }),
                label: {
                    show: true,
                    position: 'top' as const
                }
            }
        ]
    };
};

export const createInitialBarLegendItems = (data: iBarChartData[]): iLegendItem[] => {
    return data.map((item, index) => ({
        name: item.name,
        color: getDefaultColor(index),
        visible: true
    }));
};

