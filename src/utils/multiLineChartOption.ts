import type { iMultiLineChartData, iLegendItem } from '../types/chart.type';
import type { EChartsOption } from 'echarts';

const getTeamColor = (index: number): string => {
    const colors = [
        '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
        '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
    ];
    return colors[index % colors.length];
};

interface CreateMultiLineChartOptionParams {
    data: iMultiLineChartData[];
    legendItems: iLegendItem[];
    xAxisName: string;
    leftYAxisFields: ('bugs' | 'meetingsMissed')[];
    rightYAxisFields: ('productivity' | 'morale')[];
    leftYAxisName: string;
    rightYAxisName: string;
}

export const createMultiLineChartOption = ({
    data,
    legendItems,
    xAxisName,
    leftYAxisFields,
    rightYAxisFields,
    leftYAxisName,
    rightYAxisName
}: CreateMultiLineChartOptionParams): EChartsOption => {
    if (!data || data.length === 0) {
        return {};
    }

    // 팀/이름 목록 추출 (team 또는 name 필드 사용)
    const nameSet = new Set(
        data.map(item => item.team || item.name).filter((name): name is string => !!name)
    );
    const names = Array.from(nameSet);

    if (names.length === 0) {
        return {};
    }

    // 데이터를 이름별로 그룹화
    const nameData: { [name: string]: iMultiLineChartData[] } = {};
    names.forEach(name => {
        nameData[name] = data.filter(item => (item.team || item.name) === name).sort((a, b) => a.x - b.x);
    });

    // 보이는 이름 필터링
    const visibleNames = names.filter(name => {
        const legendItem = legendItems.find(li => li.name === name);
        return legendItem?.visible !== false;
    });

    if (visibleNames.length === 0) {
        return {};
    }

    const series: Array<{
        name: string;
        type: string;
        yAxisIndex: number;
        data: Array<{ value: [number, number | undefined]; name: string }>;
        lineStyle: { type: string; color: string };
        symbol: string;
        symbolSize: number;
        itemStyle: { color: string };
    }> = [];

    visibleNames.forEach(name => {
        const legendItem = legendItems.find(li => li.name === name);
        const color = legendItem?.color || getTeamColor(names.indexOf(name));
        const nameDataPoints = nameData[name];

        // 왼쪽 Y축 필드들 (실선, 원형 마커)
        leftYAxisFields.forEach(field => {
            if (nameDataPoints.some(item => item[field] !== undefined)) {
                const fieldLabels: Record<string, string> = {
                    bugs: 'Bugs',
                    meetingsMissed: 'Meeting Missed'
                };
                series.push({
                    name: `${name} - ${fieldLabels[field]}`,
                    type: 'line',
                    yAxisIndex: 0,
                    data: nameDataPoints.map(item => ({
                        value: [item.x, item[field]],
                        name: name
                    })),
                    lineStyle: {
                        type: 'solid',
                        color: color
                    },
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        color: color
                    }
                });
            }
        });

        // 오른쪽 Y축 필드들 (점선, 사각형 마커)
        rightYAxisFields.forEach(field => {
            if (nameDataPoints.some(item => item[field] !== undefined)) {
                const fieldLabels: Record<string, string> = {
                    productivity: 'Productivity',
                    morale: 'Morale'
                };
                series.push({
                    name: `${name} - ${fieldLabels[field]}`,
                    type: 'line',
                    yAxisIndex: 1,
                    data: nameDataPoints.map(item => ({
                        value: [item.x, item[field]],
                        name: name
                    })),
                    lineStyle: {
                        type: 'dashed',
                        color: color
                    },
                    symbol: 'rect',
                    symbolSize: 8,
                    itemStyle: {
                        color: color
                    }
                });
            }
        });
    });

    return {
        tooltip: {
            trigger: 'item',
            formatter: (params: unknown) => {
                if (!params || typeof params !== 'object') return '';
                const p = params as { value?: [number, number | undefined]; seriesName?: string };
                if (!p.value || !p.seriesName) return '';

                // 호버된 포인트의 X값
                const xValue = p.value[0];

                // 호버된 시리즈의 이름 추출
                const itemName = p.seriesName.split(' - ')[0];

                // 해당 이름의 모든 데이터 포인트 찾기
                const itemDataPoints = nameData[itemName] || [];
                const pointData = itemDataPoints.find(item => item.x === xValue);

                if (!pointData) return '';

                let result = `${xAxisName}: ${xValue}<br/>`;
                result += `${itemName}<br/>`;

                // 요구사항: 해당하는 팀의 데이터만 표시 (설정된 필드만)
                const fieldLabels: Record<string, string> = {
                    bugs: 'Bugs',
                    meetingsMissed: 'Meeting Missed',
                    productivity: 'Productivity',
                    morale: 'Morale'
                };

                [...leftYAxisFields, ...rightYAxisFields].forEach(field => {
                    const value = pointData[field];
                    if (value !== undefined) {
                        result += `${fieldLabels[field]}: ${value}<br/>`;
                    }
                });

                return result;
            }
        },
        legend: {
            show: false, // 커스텀 범례 사용
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'value' as const,
            name: xAxisName,
            nameLocation: 'middle' as const,
            nameGap: 30
        },
        yAxis: [
            {
                type: 'value' as const,
                name: `${leftYAxisName}\t(실선)`,
                position: 'left' as const,
                axisLine: {
                    show: true
                },
                axisLabel: {
                    formatter: '{value}'
                },
                nameTextStyle: {
                    lineHeight: 16
                }
            },
            {
                type: 'value' as const,
                name: `${rightYAxisName}\t(점선)`,
                position: 'right' as const,
                axisLine: {
                    show: true
                },
                axisLabel: {
                    formatter: '{value}'
                },
                nameTextStyle: {
                    lineHeight: 16
                }
            }
        ],
        series: series as EChartsOption['series']
    };
};

/**
 * 이름 목록에서 초기 범례 아이템 생성 (team 또는 name 필드 사용)
 */
export const createInitialLegendItems = (data: iMultiLineChartData[]): iLegendItem[] => {
    const nameSet = new Set(
        data.map(item => item.team || item.name).filter((name): name is string => !!name)
    );
    const nameArray = Array.from(nameSet);
    return nameArray.map((name, index) => ({
        name: name,
        color: getTeamColor(index),
        visible: true
    }));
};

