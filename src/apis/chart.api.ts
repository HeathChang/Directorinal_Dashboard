import axios from 'axios';
import { API_BASE_URL } from '../constants/general.constant';
import type {
    CoffeeBrandDataResponse,
    SnackBrandShareDataResponse,
    MoodTrendDataResponse,
    WeeklyWorkoutDataResponse,
    TechTeamCoffeeImpactDataResponse,
    DepartmentSnackImpactDataResponse
} from '../types/chart.type';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getTopCoffeeBrandsApi = async (): Promise<CoffeeBrandDataResponse> => {
    const response = await apiClient.get<CoffeeBrandDataResponse>('/mock/top-coffee-brands');
    return response.data;
};

export const getPopularSnackBrandsApi = async (): Promise<SnackBrandShareDataResponse> => {
    const response = await apiClient.get<SnackBrandShareDataResponse>('/mock/popular-snack-brands');
    return response.data;
};

export const getWeeklyMoodTrendApi = async (): Promise<MoodTrendDataResponse> => {
    const response = await apiClient.get<MoodTrendDataResponse>('/mock/weekly-mood-trend');
    return response.data;
};

export const getWeeklyWorkoutTrendApi = async (): Promise<WeeklyWorkoutDataResponse> => {
    const response = await apiClient.get<WeeklyWorkoutDataResponse>('/mock/weekly-workout-trend');
    return response.data;
};

export const getCoffeeConsumptionApi = async (): Promise<TechTeamCoffeeImpactDataResponse> => {
    const response = await apiClient.get<TechTeamCoffeeImpactDataResponse>('/mock/coffee-consumption');
    return response.data;
};

export const getSnackImpactApi = async (): Promise<DepartmentSnackImpactDataResponse> => {
    const response = await apiClient.get<DepartmentSnackImpactDataResponse>('/mock/snack-impact');
    return response.data;
};

