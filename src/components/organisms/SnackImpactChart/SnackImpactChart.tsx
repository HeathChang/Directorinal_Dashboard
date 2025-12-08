import React, { useMemo, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { MultiLineChart } from '../../molecules/charts';
import type { iMultiLineChartData } from '../../../types/chart.type';
import { createMultiLineChartOption, createInitialLegendItems } from '../../../utils/multiLineChartOption';

interface SnackImpactChartProps {
    data: iMultiLineChartData[];
    loading?: boolean;
}

export const SnackImpactChart: React.FC<SnackImpactChartProps> = ({ data, loading = false }) => {
    const [legendItems, setLegendItems] = useState(() => createInitialLegendItems(data));

    React.useEffect(() => {
        setLegendItems(createInitialLegendItems(data));
    }, [data]);

    const handleLegendToggle = useCallback((name: string) => {
        setLegendItems(prev =>
            prev.map(item =>
                item.name === name ? { ...item, visible: !item.visible } : item
            )
        );
    }, []);

    const handleColorChange = useCallback((name: string, color: string) => {
        setLegendItems(prev =>
            prev.map(item =>
                item.name === name ? { ...item, color: color } : item
            )
        );
    }, []);

    const option = useMemo(() => {
        return createMultiLineChartOption({
            data,
            legendItems,
            xAxisName: '스낵 수',
            leftYAxisFields: ['meetingsMissed'],
            rightYAxisFields: ['morale'],
            leftYAxisName: '회의 불참횟수',
            rightYAxisName: '사기'
        });
    }, [data, legendItems]);

    if (loading) {
        return <Box sx={{ p: 3, textAlign: 'center' }}>Loading...</Box>;
    }

    if (!data || data.length === 0) {
        return <Box sx={{ p: 3, textAlign: 'center' }}>No data available for Snack Impact</Box>;
    }

    return (
        <Box>
            <MultiLineChart
                option={option}
                title="Snack Impact - Multi-Line Chart"
                height={500}
                legendItems={legendItems}
                onLegendToggle={handleLegendToggle}
                onColorChange={handleColorChange}
                hasData={data.length > 0}
            />
        </Box>
    );
};

