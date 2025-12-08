import React, { useMemo, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { BarChart, DonutChart } from '../../molecules/charts';
import type { iBarChartData } from '../../../types/chart.type';
import { createBarChartOption, createInitialBarLegendItems } from '../../../utils/barChartOption';
import { createDonutChartOption, createInitialDonutLegendItems } from '../../../utils/donutChartOption';

interface PopularSnackBrandsChartProps {
    data: iBarChartData[];
    loading?: boolean;
}

export const PopularSnackBrandsChart: React.FC<PopularSnackBrandsChartProps> = ({ data, loading = false }) => {
    const [barLegendItems, setBarLegendItems] = useState(() => createInitialBarLegendItems(data));
    const [donutLegendItems, setDonutLegendItems] = useState(() => createInitialDonutLegendItems(data));

    React.useEffect(() => {
        setBarLegendItems(createInitialBarLegendItems(data));
        setDonutLegendItems(createInitialDonutLegendItems(data));
    }, [data]);

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

    const handleDonutLegendToggle = useCallback((name: string) => {
        setDonutLegendItems(prev =>
            prev.map(item =>
                item.name === name ? { ...item, visible: !item.visible } : item
            )
        );
    }, []);

    const handleDonutColorChange = useCallback((name: string, color: string) => {
        setDonutLegendItems(prev =>
            prev.map(item =>
                item.name === name ? { ...item, color: color } : item
            )
        );
    }, []);

    const tooltipFormatter = useCallback((params: unknown) => {
        if (!Array.isArray(params) || params.length === 0) return '';
        const p = params as Array<{ axisValue?: string; value?: number }>;
        const brandName = p[0].axisValue || '';
        const value = p[0].value || 0;
        return `${brandName}<br/>점유율: ${value}`;
    }, []);

    const barOption = useMemo(() => {
        return createBarChartOption({
            data,
            legendItems: barLegendItems,
            xAxisName: '브랜드',
            yAxisName: '점유율',
            tooltipFormatter
        });
    }, [data, barLegendItems, tooltipFormatter]);

    const donutOption = useMemo(() => {
        return createDonutChartOption({
            data,
            legendItems: donutLegendItems,
            tooltipFormatter: '{b}<br/>점유율: {c} ({d}%)'
        });
    }, [data, donutLegendItems]);

    if (loading) {
        return <Box sx={{ p: 3, textAlign: 'center' }}>Loading...</Box>;
    }

    if (!data || data.length === 0) {
        return <Box sx={{ p: 3, textAlign: 'center' }}>No data available for Popular Snack Brands</Box>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
                <BarChart
                    option={barOption}
                    title="Popular Snack Brands - Bar Chart"
                    height={400}
                    legendItems={barLegendItems}
                    onLegendToggle={handleBarLegendToggle}
                    onColorChange={handleBarColorChange}
                    hasData={data.length > 0}
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <DonutChart
                    option={donutOption}
                    title="Popular Snack Brands - Donut Chart"
                    height={400}
                    legendItems={donutLegendItems}
                    onLegendToggle={handleDonutLegendToggle}
                    onColorChange={handleDonutColorChange}
                    hasData={data.length > 0}
                />
            </Box>
        </Box>
    );
};

