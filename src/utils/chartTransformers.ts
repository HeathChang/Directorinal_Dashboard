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

/**
 * Coffee Brand API Response를 Bar Chart Data로 변환
 */
export const transformCoffeeBrandToBarChart = (
    response: CoffeeBrandDataResponse
): iBarChartData[] => {
    if (!Array.isArray(response) || response.length === 0) {
        return [];
    }

    return response.map((item) => ({
        name: item.brand,
        value: item.popularity
    }));
};

/**
 * Snack Brand Share API Response를 Bar Chart Data로 변환
 */
export const transformSnackBrandToBarChart = (
    response: SnackBrandShareDataResponse
): iBarChartData[] => {
    if (!Array.isArray(response) || response.length === 0) {
        return [];
    }

    return response.map((item) => ({
        name: item.name,
        value: item.share
    }));
};

/**
 * Mood Trend API Response를 Stacked Chart Data로 변환
 */
export const transformMoodTrendToStackedChart = (
    response: MoodTrendDataResponse
): iStackedChartData[] => {
    if (!Array.isArray(response) || response.length === 0) {
        return [];
    }

    return response.map((item) => ({
        week: item.week,
        happy: item.happy,
        tired: item.tired,
        stressed: item.stressed
    }));
};

/**
 * Weekly Workout API Response를 Stacked Chart Data로 변환
 */
export const transformWeeklyWorkoutToStackedChart = (
    response: WeeklyWorkoutDataResponse
): iStackedChartData[] => {
    if (!Array.isArray(response) || response.length === 0) {
        return [];
    }

    return response.map((item) => ({
        week: item.week,
        running: item.running,
        cycling: item.cycling,
        stretching: item.stretching
    }));
};

/**
 * Tech Team Coffee Impact API Response를 Multi-Line Chart Data로 변환
 */
export const transformTechTeamCoffeeToMultiLineChart = (
    response: TechTeamCoffeeImpactDataResponse
): iMultiLineChartData[] => {
    if (!response?.teams || !Array.isArray(response.teams) || response.teams.length === 0) {
        return [];
    }

    const result: iMultiLineChartData[] = [];

    response.teams.forEach((teamData) => {
        if (!teamData.series || !Array.isArray(teamData.series)) {
            return;
        }

        teamData.series.forEach((seriesItem) => {
            result.push({
                x: seriesItem.cups,
                team: teamData.team,
                bugs: seriesItem.bugs,
                productivity: seriesItem.productivity
            });
        });
    });
    return result;
};

export const transformDepartmentSnackToMultiLineChart = (
    response: DepartmentSnackImpactDataResponse
): iMultiLineChartData[] => {
    const result: iMultiLineChartData[] = [];

    response.departments.forEach((departmentData) => {
        if (!departmentData.metrics || !Array.isArray(departmentData.metrics)) {
            return;
        }

        departmentData.metrics.forEach((metric) => {
            result.push({
                x: metric.snacks,
                name: departmentData.name,
                meetingsMissed: metric.meetingsMissed,
                morale: metric.morale
            });
        });
    });

    return result;
};

/**
 * Stacked Chart Data에서 카테고리 목록 추출 (week 제외)
 */
export const extractStackedChartCategories = (data: iStackedChartData[]): string[] => {
    if (data.length === 0) {
        return [];
    }

    const firstItem = data[0];
    return Object.keys(firstItem).filter(key => key !== 'week');
};

