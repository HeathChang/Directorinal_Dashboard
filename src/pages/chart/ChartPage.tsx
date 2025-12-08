import React from 'react';
import { ChartTemplate } from '../../components/templates/chart';
import { useChartData } from '../../hooks/useChartData';

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
        <ChartTemplate
            selectedTab={selectedTab}
            tabLabels={tabLabels}
            onTabChange={handleTabChange}
            getBarChartData={getBarChartData}
            getStackedChartData={getStackedChartData}
            getStackedChartCategories={getStackedChartCategories}
            getMultiLineChartData={getMultiLineChartData}
            getTabLoading={getTabLoading}
        />
    );
};

