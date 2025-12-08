import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Paper, Typography } from '@mui/material';
import type { iLegendItem } from '../../../types/chart.type';
import { ChartLegend } from './ChartLegend';
import type { EChartsOption } from 'echarts';

interface BarChartProps {
    option: EChartsOption;
    title?: string;
    height?: number;
    legendItems: iLegendItem[];
    onLegendToggle: (name: string) => void;
    onColorChange: (name: string, color: string) => void;
    hasData?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
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


