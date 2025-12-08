import React, { useMemo, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { StackedBarChart, StackedAreaChart } from '../../molecules/charts';
import type { iStackedChartData } from '../../../types/chart.type';
import { createStackedBarChartOption, createStackedAreaChartOption, createInitialStackedLegendItems } from '../../../utils/stackedChartOption';

interface WeeklyMoodTrendChartProps {
    data: iStackedChartData[];
    categories: string[];
    loading?: boolean;
}

export const WeeklyMoodTrendChart: React.FC<WeeklyMoodTrendChartProps> = ({ 
    data, 
    categories, 
    loading = false 
}) => {
    const [barLegendItems, setBarLegendItems] = useState(() => createInitialStackedLegendItems(categories));
    const [areaLegendItems, setAreaLegendItems] = useState(() => createInitialStackedLegendItems(categories));

    React.useEffect(() => {
        setBarLegendItems(createInitialStackedLegendItems(categories));
        setAreaLegendItems(createInitialStackedLegendItems(categories));
    }, [categories]);

    const handleBarLegendToggle = useCallback((name: string) => {
        setBarLegendItems(prev =>
            prev.map(item =>
                item.name === name ? { ...item, visible: !item.visible } : item
            )
        );
    }, []);

    const handleBarColorChange = useCallback((name: string, color: string) => {
        setBarLegendItems(prev =>
            prev.map(item =>
                item.name === name ? { ...item, color: color } : item
            )
        );
    }, []);

    const handleAreaLegendToggle = useCallback((name: string) => {
        setAreaLegendItems(prev =>
            prev.map(item =>
                item.name === name ? { ...item, visible: !item.visible } : item
            )
        );
    }, []);

    const handleAreaColorChange = useCallback((name: string, color: string) => {
        setAreaLegendItems(prev =>
            prev.map(item =>
                item.name === name ? { ...item, color: color } : item
            )
        );
    }, []);

    const barOption = useMemo(() => {
        return createStackedBarChartOption({
            data,
            categories,
            legendItems: barLegendItems,
            xAxisName: 'week',
            yAxisName: '백분율(%)',
            yAxisMax: 100,
            yAxisFormatter: '{value}%'
        });
    }, [data, categories, barLegendItems]);

    const areaOption = useMemo(() => {
        return createStackedAreaChartOption({
            data,
            categories,
            legendItems: areaLegendItems,
            xAxisName: 'week',
            yAxisName: '백분율(%)',
            yAxisMax: 100,
            yAxisFormatter: '{value}%'
        });
    }, [data, categories, areaLegendItems]);

    if (loading) {
        return <Box sx={{ p: 3, textAlign: 'center' }}>Loading...</Box>;
    }

    if (!data || data.length === 0 || !categories || categories.length === 0) {
        return <Box sx={{ p: 3, textAlign: 'center' }}>No data available for Weekly Mood Trend</Box>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
                <StackedBarChart
                    option={barOption}
                    title="Weekly Mood Trend - Stacked Bar Chart"
                    height={400}
                    legendItems={barLegendItems}
                    onLegendToggle={handleBarLegendToggle}
                    onColorChange={handleBarColorChange}
                    hasData={data.length > 0 && categories.length > 0}
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <StackedAreaChart
                    option={areaOption}
                    title="Weekly Mood Trend - Stacked Area Chart"
                    height={400}
                    legendItems={areaLegendItems}
                    onLegendToggle={handleAreaLegendToggle}
                    onColorChange={handleAreaColorChange}
                    hasData={data.length > 0 && categories.length > 0}
                />
            </Box>
        </Box>
    );
};

