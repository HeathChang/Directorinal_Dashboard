import { useState, useEffect, useCallback } from 'react';
import {
    getTopCoffeeBrandsApi,
    getPopularSnackBrandsApi,
    getWeeklyMoodTrendApi,
    getWeeklyWorkoutTrendApi,
    getCoffeeConsumptionApi,
    getSnackImpactApi
} from '../apis/chart.api';
import type {
    iBarChartData,
    iStackedChartData,
    iMultiLineChartData,
    CoffeeBrandDataResponse,
    SnackBrandShareDataResponse,
    MoodTrendDataResponse,
    WeeklyWorkoutDataResponse,
    TechTeamCoffeeImpactDataResponse,
    DepartmentSnackImpactDataResponse
} from '../types/chart.type';
import { ChartTab, CHART_TAB_LABELS } from '../constants/chart.constant';
import {
    transformCoffeeBrandToBarChart,
    transformSnackBrandToBarChart,
    transformMoodTrendToStackedChart,
    transformWeeklyWorkoutToStackedChart,
    transformTechTeamCoffeeToMultiLineChart,
    transformDepartmentSnackToMultiLineChart,
    extractStackedChartCategories
} from '../utils/chartTransformers';

type ChartApiResponse =
    | CoffeeBrandDataResponse
    | SnackBrandShareDataResponse
    | MoodTrendDataResponse
    | WeeklyWorkoutDataResponse
    | TechTeamCoffeeImpactDataResponse
    | DepartmentSnackImpactDataResponse;

export const useChartData = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const [data, setData] = useState<{ [key: number]: ChartApiResponse }>({});

    const handleTabChange = useCallback((_: unknown, newValue: number) => {
        setSelectedTab(newValue);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (data[selectedTab]) return;

            setLoading(prev => ({ ...prev, [selectedTab]: true }));

            try {
                let result: ChartApiResponse | null = null;

                switch (selectedTab) {
                    case ChartTab.TOP_COFFEE_BRANDS:
                        result = await getTopCoffeeBrandsApi();
                        break;
                    case ChartTab.POPULAR_SNACK_BRANDS:
                        result = await getPopularSnackBrandsApi();
                        break;
                    case ChartTab.WEEKLY_MOOD_TREND:
                        result = await getWeeklyMoodTrendApi();
                        break;
                    case ChartTab.WEEKLY_WORKOUT_TREND:
                        result = await getWeeklyWorkoutTrendApi();
                        break;
                    case ChartTab.COFFEE_CONSUMPTION:
                        result = await getCoffeeConsumptionApi();
                        break;
                    case ChartTab.SNACK_IMPACT:
                        result = await getSnackImpactApi();
                        break;
                }

                if (result) {
                    setData(prev => ({ ...prev, [selectedTab]: result }));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(prev => ({ ...prev, [selectedTab]: false }));
            }
        };

        fetchData();
    }, [selectedTab, data]);

    const getBarChartData = useCallback((tab: ChartTab): iBarChartData[] => {
        const rawData = data[tab];
        if (!rawData) return [];

        switch (tab) {
            case ChartTab.TOP_COFFEE_BRANDS:
                return transformCoffeeBrandToBarChart(rawData as CoffeeBrandDataResponse);
            case ChartTab.POPULAR_SNACK_BRANDS:
                return transformSnackBrandToBarChart(rawData as SnackBrandShareDataResponse);
            default:
                return [];
        }
    }, [data]);

    const getStackedChartData = useCallback((tab: ChartTab): iStackedChartData[] => {
        const rawData = data[tab];
        if (!rawData) return [];

        switch (tab) {
            case ChartTab.WEEKLY_MOOD_TREND:
                return transformMoodTrendToStackedChart(rawData as MoodTrendDataResponse);
            case ChartTab.WEEKLY_WORKOUT_TREND:
                return transformWeeklyWorkoutToStackedChart(rawData as WeeklyWorkoutDataResponse);
            default:
                return [];
        }
    }, [data]);

    const getStackedChartCategories = useCallback((tab: ChartTab): string[] => {
        const stackedData = getStackedChartData(tab);
        return extractStackedChartCategories(stackedData);
    }, [getStackedChartData]);

    const getMultiLineChartData = useCallback((tab: ChartTab): iMultiLineChartData[] => {
        const rawData = data[tab];
        if (!rawData) return [];

        switch (tab) {
            case ChartTab.COFFEE_CONSUMPTION:
                return transformTechTeamCoffeeToMultiLineChart(rawData as TechTeamCoffeeImpactDataResponse);

            case ChartTab.SNACK_IMPACT:
                return transformDepartmentSnackToMultiLineChart(rawData as DepartmentSnackImpactDataResponse);

            default:
                return [];
        }
    }, [data]);

    const getTabLoading = useCallback((tab: ChartTab): boolean => {
        return loading[tab] || false;
    }, [loading]);

    return {
        selectedTab,
        handleTabChange,
        tabLabels: CHART_TAB_LABELS,
        getBarChartData,
        getStackedChartData,
        getStackedChartCategories,
        getMultiLineChartData,
        getTabLoading
    };
};
