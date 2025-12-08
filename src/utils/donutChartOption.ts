import type { iBarChartData, iLegendItem } from '../types/chart.type';
import type { EChartsOption } from 'echarts';

const getDefaultColor = (index: number): string => {
    const colors = [
        '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
        '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
    ];
    return colors[index % colors.length];
};

interface CreateDonutChartOptionParams {
    data: iBarChartData[];
    legendItems: iLegendItem[];
    tooltipFormatter?: string;
}

export const createDonutChartOption = ({
    data,
    legendItems,
    tooltipFormatter = '{a} <br/>{b}: {c} ({d}%)'
}: CreateDonutChartOptionParams): EChartsOption => {
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
            trigger: 'item' as const,
            formatter: tooltipFormatter
        },
        legend: {
            show: false
        },
        series: [
            {
                name: 'Value',
                type: 'pie' as const,
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{b}: {c}\n({d}%)'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold'
                    }
                },
                data: visibleData.map((item, index) => {
                    const legendItem = legendItems.find(li => li.name === item.name);
                    return {
                        value: item.value,
                        name: item.name,
                        itemStyle: {
                            color: legendItem?.color || getDefaultColor(index)
                        }
                    };
                })
            }
        ]
    };
};

export const createInitialDonutLegendItems = (data: iBarChartData[]): iLegendItem[] => {
    return data.map((item, index) => ({
        name: item.name,
        color: getDefaultColor(index),
        visible: true
    }));
};

