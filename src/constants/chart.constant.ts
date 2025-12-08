export const ChartTab = {
    TOP_COFFEE_BRANDS: 0,
    POPULAR_SNACK_BRANDS: 1,
    WEEKLY_MOOD_TREND: 2,
    WEEKLY_WORKOUT_TREND: 3,
    COFFEE_CONSUMPTION: 4,
    SNACK_IMPACT: 5
} as const;

export type ChartTab = typeof ChartTab[keyof typeof ChartTab];



export const CHART_TAB_LABELS = [
    'Top Coffee Brands',
    'Popular Snack Brands',
    'Weekly Mood Trend',
    'Weekly Workout Trend',
    'Coffee Consumption',
    'Snack Impact'
] as const;

