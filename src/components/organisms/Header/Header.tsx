import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';

export const Header: React.FC = () => {
    const location = useLocation();
    const { login, logout, isAuthenticated } = useAuth();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async () => {
        setIsLoggingIn(true);
        try {
            const result = await login({
                email: 'jannhyunsoo@gmail.com',
                password: 'TQ5Yw8N2K9'
            });

            if (!result.success) {
                alert(result.error || '로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const isPostActive = location.pathname === '/post';
    const isChartActive = location.pathname === '/chart';

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm min-w-[600px]">
            <div className="px-4">
                <div className="flex items-center justify-between h-16">
                    {/* 좌측: 프로젝트 이름 */}
                    <Link to="/" className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
                            Directional 2025
                        </h1>
                    </Link>

                    {/* 우측: 네비게이션 버튼 및 로그인 버튼 */}
                    <div className="flex items-center gap-3">
                        {/* Post 버튼 */}
                        <Button
                            component={Link}
                            to="/post"
                            variant={isPostActive ? 'contained' : 'outlined'}
                            size="small"
                            className="cursor-pointer"
                            sx={{
                                textTransform: 'none',
                                fontWeight: isPostActive ? 600 : 500,
                                minWidth: 80,
                            }}
                        >
                            Post
                        </Button>

                        {/* Chart 버튼 */}
                        <Button
                            component={Link}
                            to="/chart"
                            variant={isChartActive ? 'contained' : 'outlined'}
                            size="small"
                            className="cursor-pointer"
                            sx={{
                                textTransform: 'none',
                                fontWeight: isChartActive ? 600 : 500,
                                minWidth: 80,
                            }}
                        >
                            Chart
                        </Button>

                        {/* 로그인/로그아웃 버튼 */}
                        {isAuthenticated() ? (
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleLogout}
                                className="cursor-pointer"
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    minWidth: 80,
                                }}
                            >
                                로그아웃
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleLogin}
                                disabled={isLoggingIn}
                                className="cursor-pointer"
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    minWidth: 80,
                                }}
                            >
                                {isLoggingIn ? '로그인 중...' : '로그인'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

