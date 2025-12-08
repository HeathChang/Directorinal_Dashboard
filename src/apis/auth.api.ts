import axios from 'axios';
import type { iUserRequest, iUserResponse } from '../types/user.type';

const API_BASE_URL = 'https://fe-hiring-rest-api.vercel.app';

// 로그인 API
export const loginApi = async (credentials: iUserRequest): Promise<iUserResponse> => {
    const response = await axios.post<iUserResponse>(
        `${API_BASE_URL}/auth/login`,
        credentials
    );
    return response.data;
};

