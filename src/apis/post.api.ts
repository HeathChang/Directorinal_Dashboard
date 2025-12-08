import axios from 'axios';
import type { iPostData, iPostRequest } from '../types/general.type';
import { API_BASE_URL } from '../constants/general.constant';


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

// 게시글 목록 조회 (페이지네이션)
export const getPostsApi = async (page: number = 1, limit: number = 10): Promise<{
    data: iPostData[];
    total: number;
    page: number;
    limit: number;
}> => {
    const response = await apiClient.get('/posts', {
        params: { page, limit }
    });
    return response.data;
};

// 게시글 상세 조회
export const getPostApi = async (id: string): Promise<iPostData> => {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
};

// 게시글 작성
export const createPostApi = async (postData: iPostRequest): Promise<iPostData> => {
    const response = await apiClient.post('/posts', postData);
    return response.data;
};

// 게시글 수정
export const updatePostApi = async (id: string, postData: iPostRequest): Promise<iPostData> => {
    const response = await apiClient.put(`/posts/${id}`, postData);
    return response.data;
};

// 게시글 삭제
export const deletePostApi = async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
};

