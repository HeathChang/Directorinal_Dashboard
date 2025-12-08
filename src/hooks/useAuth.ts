import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { loginApi } from '../apis/auth.api';
import type { iUserRequest } from '../types/user.type';

export const useAuth = () => {
    const queryClient = useQueryClient();
    // localStorage에서 초기 인증 상태 확인
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem('authToken');
    });

    // localStorage 변경 감지를 위한 이벤트 리스너
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'authToken') {
                setIsAuthenticated(!!e.newValue);
            }
        };

        // 다른 탭에서의 localStorage 변경 감지
        window.addEventListener('storage', handleStorageChange);

        // 같은 탭에서의 localStorage 변경 감지를 위한 커스텀 이벤트
        const handleCustomStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('authToken'));
        };
        window.addEventListener('authTokenChanged', handleCustomStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authTokenChanged', handleCustomStorageChange);
        };
    }, []);

    const login = async (credentials: iUserRequest) => {
        try {
            const response = await loginApi(credentials);

            // 토큰을 localStorage에 저장
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                setIsAuthenticated(true);

                // 커스텀 이벤트 발생 (같은 탭에서의 변경 감지)
                window.dispatchEvent(new Event('authTokenChanged'));

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
        setIsAuthenticated(false);
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    };

    return {
        login,
        logout,
        isAuthenticated
    };
};

