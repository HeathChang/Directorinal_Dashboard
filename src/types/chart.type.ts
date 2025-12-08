// 바 차트, 도넛 차트 데이터 타입
export interface iBarChartData {
    name: string;
    value: number;
}

// 스택형 차트 데이터 타입
export interface iStackedChartData {
    week: string;
    [key: string]: string | number; // happy, tired, stressed 또는 running, cycling, stretching
}

// 멀티라인 차트 데이터 타입
export interface iMultiLineChartData {
    x: number; // 커피 잔수 또는 스낵 수
    team: string;
    bugs?: number;
    meetingMissed?: number;
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

// 멀티라인 차트용 팀별 커피 소비/버그/색상성
export interface iTechTeamCoffeeImpactData {
    team: string;
    series: {
        cups: number;
        bugs: number;
        morale: number;
    }[]
}

export interface iDepartmentSnackImpactData {
    department: string;
    metrics: {
        snacks: number;
        meetingMissed: number;
        morale: number;
    }[]
}

// API Response 타입 정의 (배열 형태로 직접 반환)
export type CoffeeBrandDataResponse = iCoffeeBrandData[];
export type SnackBrandShareDataResponse = iSnackBrandShareData[];
export type MoodTrendDataResponse = iMoodTrendData[];
export type WeeklyWorkoutDataResponse = iWeeklyWorkoutData[];
export type TechTeamCoffeeImpactDataResponse = { teams: iTechTeamCoffeeImpactData[] };
export type DepartmentSnackImpactDataResponse = { departments: iDepartmentSnackImpactData[] };