import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { ChartTab } from '../../../constants/chart.constant';
import { TopCoffeeBrandsChart } from '../../organisms/TopCoffeeBrandsChart';
import { PopularSnackBrandsChart } from '../../organisms/PopularSnackBrandsChart';
import { WeeklyMoodTrendChart } from '../../organisms/WeeklyMoodTrendChart';
import { WeeklyWorkoutTrendChart } from '../../organisms/WeeklyWorkoutTrendChart';
import { CoffeeConsumptionChart } from '../../organisms/CoffeeConsumptionChart';
import { SnackImpactChart } from '../../organisms/SnackImpactChart';
import type {
    iBarChartData,
    iStackedChartData,
    iMultiLineChartData
} from '../../../types/chart.type';

export interface ChartTemplateProps {
    selectedTab: number;
    tabLabels: readonly string[];
    onTabChange: (event: unknown, newValue: number) => void;
    getBarChartData: (tab: ChartTab) => iBarChartData[];
    getStackedChartData: (tab: ChartTab) => iStackedChartData[];
    getStackedChartCategories: (tab: ChartTab) => string[];
    getMultiLineChartData: (tab: ChartTab) => iMultiLineChartData[];
    getTabLoading: (tab: ChartTab) => boolean;
}

export const ChartTemplate: React.FC<ChartTemplateProps> = ({
    selectedTab,
    tabLabels,
    onTabChange,
    getBarChartData,
    getStackedChartData,
    getStackedChartCategories,
    getMultiLineChartData,
    getTabLoading
}) => {
    return (
        <Box className="w-full min-w-[600px]">
            <Box className="border-1 border-gray-100">
                <Tabs
                    value={selectedTab}
                    onChange={onTabChange}
                    aria-label="chart tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tabLabels.map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                        />
                    ))}
                </Tabs>
            </Box>
            {selectedTab === ChartTab.TOP_COFFEE_BRANDS && (
                <TopCoffeeBrandsChart
                    data={getBarChartData(ChartTab.TOP_COFFEE_BRANDS)}
                    loading={getTabLoading(ChartTab.TOP_COFFEE_BRANDS)}
                />
            )}
            {selectedTab === ChartTab.POPULAR_SNACK_BRANDS && (
                <PopularSnackBrandsChart
                    data={getBarChartData(ChartTab.POPULAR_SNACK_BRANDS)}
                    loading={getTabLoading(ChartTab.POPULAR_SNACK_BRANDS)}
                />
            )}
            {selectedTab === ChartTab.WEEKLY_MOOD_TREND && (
                <WeeklyMoodTrendChart
                    data={getStackedChartData(ChartTab.WEEKLY_MOOD_TREND)}
                    categories={getStackedChartCategories(ChartTab.WEEKLY_MOOD_TREND)}
                    loading={getTabLoading(ChartTab.WEEKLY_MOOD_TREND)}
                />
            )}
            {selectedTab === ChartTab.WEEKLY_WORKOUT_TREND && (
                <WeeklyWorkoutTrendChart
                    data={getStackedChartData(ChartTab.WEEKLY_WORKOUT_TREND)}
                    categories={getStackedChartCategories(ChartTab.WEEKLY_WORKOUT_TREND)}
                    loading={getTabLoading(ChartTab.WEEKLY_WORKOUT_TREND)}
                />
            )}
            {selectedTab === ChartTab.COFFEE_CONSUMPTION && (
                <CoffeeConsumptionChart
                    data={getMultiLineChartData(ChartTab.COFFEE_CONSUMPTION)}
                    loading={getTabLoading(ChartTab.COFFEE_CONSUMPTION)}
                />
            )}
            {selectedTab === ChartTab.SNACK_IMPACT && (
                <SnackImpactChart
                    data={getMultiLineChartData(ChartTab.SNACK_IMPACT)}
                    loading={getTabLoading(ChartTab.SNACK_IMPACT)}
                />
            )}
        </Box>
    );
};

