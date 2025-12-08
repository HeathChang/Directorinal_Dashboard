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

// 게시글 목록 조회 (Cursor 기반 페이지네이션)
export interface GetPostsParams {
    nextCursor?: string | null;
    prevCursor?: string | null;
    limit?: number;
    sort?: string;
    order?: string;
    category?: string;
}

export const getPostsApi = async (params: GetPostsParams): Promise<{
    items: iPostData[];
    nextCursor: string | null;
    prevCursor: string | null;
}> => {
    const queryParams: Record<string, string | number> = {
        limit: params.limit || 10
    };

    if (params.nextCursor) {
        queryParams.nextCursor = params.nextCursor;
    } else if (params.prevCursor) {
        queryParams.prevCursor = params.prevCursor;
    }

    // sort, order, category 파라미터 추가
    if (params.sort) {
        queryParams.sort = params.sort;
    }
    if (params.order) {
        queryParams.order = params.order;
    }
    if (params.category) {
        queryParams.category = params.category;
    }

    const response = await apiClient.get('/posts', {
        params: queryParams
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
    const response = await apiClient.patch(`/posts/${id}`, postData);
    return response.data;
};

// 게시글 삭제
export const deletePostApi = async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
};

