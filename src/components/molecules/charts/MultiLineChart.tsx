import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Paper, Typography } from '@mui/material';
import type { iLegendItem } from '../../../types/chart.type';
import { ChartLegend } from './ChartLegend';
import type { EChartsOption } from 'echarts';

interface MultiLineChartProps {
    option: EChartsOption; // ECharts 옵션을 props로 받음
    title?: string;
    height?: number;
    legendItems: iLegendItem[]; // 범례 아이템을 props로 받음
    onLegendToggle: (name: string) => void; // 범례 토글 핸들러
    onColorChange: (name: string, color: string) => void; // 색상 변경 핸들러
    hasData?: boolean; // 데이터 존재 여부
}


export const MultiLineChart: React.FC<MultiLineChartProps> = ({
    option,
    title,
    height = 400,
    legendItems,
    onLegendToggle,
    onColorChange,
    hasData = true
}) => {
    const shouldRenderChart = useMemo(() => {
        return hasData && option && Object.keys(option).length > 0;
    }, [hasData, option]);

    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            {title && (
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {title}
                </Typography>
            )}
            {shouldRenderChart && (
                <ReactECharts
                    option={option}
                    style={{ height: `${height}px`, width: '100%' }}
                    opts={{ renderer: 'svg' }}
                    notMerge={true}
                    lazyUpdate={true}
                />
            )}
            <ChartLegend
                items={legendItems}
                onToggle={onLegendToggle}
                onColorChange={onColorChange}
            />
        </Paper>
    );
};


