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
    leftYAxisFields: ('bugs' | 'meetingMissed')[];
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

    // 팀 목록 추출
    const teamSet = new Set(data.map(item => item.team));
    const teams = Array.from(teamSet);

    if (teams.length === 0) {
        return {};
    }

    // 데이터를 팀별로 그룹화
    const teamData: { [team: string]: iMultiLineChartData[] } = {};
    teams.forEach(team => {
        teamData[team] = data.filter(item => item.team === team).sort((a, b) => a.x - b.x);
    });

    // 보이는 팀 필터링
    const visibleTeams = teams.filter(team => {
        const legendItem = legendItems.find(li => li.name === team);
        return legendItem?.visible !== false;
    });

    if (visibleTeams.length === 0) {
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

    visibleTeams.forEach(team => {
        const legendItem = legendItems.find(li => li.name === team);
        const color = legendItem?.color || getTeamColor(teams.indexOf(team));
        const teamDataPoints = teamData[team];

        // 왼쪽 Y축 필드들 (실선, 원형 마커)
        leftYAxisFields.forEach(field => {
            if (teamDataPoints.some(item => item[field] !== undefined)) {
                const fieldLabels: Record<string, string> = {
                    bugs: 'Bugs',
                    meetingMissed: 'Meeting Missed'
                };
                series.push({
                    name: `${team} - ${fieldLabels[field]}`,
                    type: 'line',
                    yAxisIndex: 0,
                    data: teamDataPoints.map(item => ({
                        value: [item.x, item[field]],
                        name: team
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
            if (teamDataPoints.some(item => item[field] !== undefined)) {
                const fieldLabels: Record<string, string> = {
                    productivity: 'Productivity',
                    morale: 'Morale'
                };
                series.push({
                    name: `${team} - ${fieldLabels[field]}`,
                    type: 'line',
                    yAxisIndex: 1,
                    data: teamDataPoints.map(item => ({
                        value: [item.x, item[field]],
                        name: team
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

                // 호버된 시리즈의 팀 이름 추출
                const teamName = p.seriesName.split(' - ')[0];

                // 해당 팀의 모든 데이터 포인트 찾기
                const teamDataPoints = teamData[teamName] || [];
                const pointData = teamDataPoints.find(item => item.x === xValue);

                if (!pointData) return '';

                let result = `${xAxisName}: ${xValue}<br/>`;
                result += `Team: ${teamName}<br/>`;

                // 요구사항: 해당하는 팀의 데이터만 표시 (설정된 필드만)
                const fieldLabels: Record<string, string> = {
                    bugs: 'Bugs',
                    meetingMissed: 'Meeting Missed',
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
                name: leftYAxisName,
                position: 'left' as const,
                axisLine: {
                    show: true
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value' as const,
                name: rightYAxisName,
                position: 'right' as const,
                axisLine: {
                    show: true
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: series
    };
};

/**
 * 팀 목록에서 초기 범례 아이템 생성
 */
export const createInitialLegendItems = (data: iMultiLineChartData[]): iLegendItem[] => {
    const teamSet = new Set(data.map(item => item.team));
    const teamArray = Array.from(teamSet);
    return teamArray.map((team, index) => ({
        name: team,
        color: getTeamColor(index),
        visible: true
    }));
};

