import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { loginApi } from '../apis/auth.api';
import type { iUserRequest } from '../types/user.type';

export const useAuth = () => {
    const queryClient = useQueryClient();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem('authToken');
    });

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'authToken') {
                setIsAuthenticated(!!e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

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

            if (response.token) {
                localStorage.setItem('authToken', response.token);
                setIsAuthenticated(true);

                window.dispatchEvent(new Event('authTokenChanged'));

                queryClient.invalidateQueries({ queryKey: ['posts'] });

                return { success: true, data: response };
            }

            return { success: false, error: '토큰을 받지 못했습니다.' };
        } catch (error) {
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

