export interface iBarChartData {
    name: string;
    value: number;
}

export interface iStackedChartData {
    week: string;
    [key: string]: string | number;
}

export interface iMultiLineChartData {
    x: number;
    team?: string;
    name?: string;
    bugs?: number;
    meetingsMissed?: number;
    productivity?: number;
    morale?: number;
}

export interface iLegendItem {
    name: string;
    color: string;
    visible: boolean;
}


export interface iCoffeeBrandData {
    brand: string;
    popularity: number;
}

export interface iSnackBrandShareData {
    name: string;
    share: number;
}

export interface iMoodTrendData {
    week: string;
    happy: number;
    tired: number;
    stressed: number;
}

export interface iWeeklyWorkoutData {
    week: string;
    running: number;
    cycling: number;
    stretching: number;
}

export interface iTechTeamCoffeeImpactData {
    team: string;
    series: {
        cups: number;
        bugs: number;
        productivity: number;
    }[]
}

export interface iDepartmentSnackImpactData {
    name: string;
    metrics: {
        snacks: number;
        meetingsMissed: number;
        morale: number;
    }[]
}

export type CoffeeBrandDataResponse = iCoffeeBrandData[];
export type SnackBrandShareDataResponse = iSnackBrandShareData[];
export type MoodTrendDataResponse = iMoodTrendData[];
export type WeeklyWorkoutDataResponse = iWeeklyWorkoutData[];
export type TechTeamCoffeeImpactDataResponse = { teams: iTechTeamCoffeeImpactData[] };
export type DepartmentSnackImpactDataResponse = { departments: iDepartmentSnackImpactData[] };