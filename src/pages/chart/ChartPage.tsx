import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { ChartTab } from '../../constants/chart.constant';
import { useChartData } from '../../hooks/useChartData';
import { TopCoffeeBrandsChart } from '../../components/organisms/TopCoffeeBrandsChart';
import { PopularSnackBrandsChart } from '../../components/organisms/PopularSnackBrandsChart';
import { WeeklyMoodTrendChart } from '../../components/organisms/WeeklyMoodTrendChart';
import { WeeklyWorkoutTrendChart } from '../../components/organisms/WeeklyWorkoutTrendChart';
import { CoffeeConsumptionChart } from '../../components/organisms/CoffeeConsumptionChart';
import { SnackImpactChart } from '../../components/organisms/SnackImpactChart';


export const ChartPage: React.FC = () => {
    const {
        selectedTab,
        handleTabChange,
        tabLabels,
        getBarChartData,
        getStackedChartData,
        getStackedChartCategories,
        getMultiLineChartData,
        getTabLoading
    } = useChartData();


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
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

