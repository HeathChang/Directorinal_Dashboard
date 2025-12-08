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
                morale: seriesItem.morale
            });
        });
    });

    return result;
};

/**
 * Department Snack Impact API Response를 Multi-Line Chart Data로 변환
 */
export const transformDepartmentSnackToMultiLineChart = (
    response: DepartmentSnackImpactDataResponse
): iMultiLineChartData[] => {
    // response가 null이거나 undefined인 경우
    if (!response) {
        console.warn('transformDepartmentSnackToMultiLineChart: response is null or undefined');
        return [];
    }

    // departments 속성이 없는 경우
    if (!response.departments) {
        console.warn('transformDepartmentSnackToMultiLineChart: response.departments is missing', response);
        return [];
    }

    // departments가 배열이 아닌 경우
    if (!Array.isArray(response.departments)) {
        console.warn('transformDepartmentSnackToMultiLineChart: response.departments is not an array', response.departments);
        return [];
    }

    // departments 배열이 비어있는 경우
    if (response.departments.length === 0) {
        console.warn('transformDepartmentSnackToMultiLineChart: response.departments is empty');
        return [];
    }

    const result: iMultiLineChartData[] = [];

    response.departments.forEach((deptData) => {
        if (!deptData) {
            console.warn('transformDepartmentSnackToMultiLineChart: deptData is null or undefined');
            return;
        }

        if (!deptData.metrics || !Array.isArray(deptData.metrics)) {
            console.warn('transformDepartmentSnackToMultiLineChart: deptData.metrics is missing or not an array', deptData);
            return;
        }

        deptData.metrics.forEach((metricItem) => {
            if (!metricItem) {
                console.warn('transformDepartmentSnackToMultiLineChart: metricItem is null or undefined');
                return;
            }

            result.push({
                x: metricItem.snacks,
                team: deptData.department,
                meetingMissed: metricItem.meetingMissed,
                morale: metricItem.morale
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

