import { useQueryClient } from '@tanstack/react-query';
import { loginApi } from '../apis/auth.api';
import type { iUserRequest } from '../types/user.type';

export const useAuth = () => {
    const queryClient = useQueryClient();

    const login = async (credentials: iUserRequest) => {
        try {
            const response = await loginApi(credentials);
            
            // 토큰을 localStorage에 저장
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                
                // 게시글 목록 새로고침
                queryClient.invalidateQueries({ queryKey: ['posts'] });
                
                return { success: true, data: response };
            }
            
            return { success: false, error: '토큰을 받지 못했습니다.' };
        } catch (error) {
            console.error('로그인 실패:', error);
            return { 
                success: false, 
                error: error instanceof Error ? error.message : '로그인에 실패했습니다.' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('authToken');
    };

    return {
        login,
        logout,
        isAuthenticated
    };
};

