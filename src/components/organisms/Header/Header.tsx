import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../../hooks/useAuth';

const DEFAULT_LOGIN_CREDENTIALS = {
    email: 'jannhyunsoo@gmail.com',
    password: 'TQ5Yw8N2K9'
};

export const Header: React.FC = () => {
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = async () => {
        try {
            const result = await login(DEFAULT_LOGIN_CREDENTIALS);

            if (!result.success) {
                enqueueSnackbar(result.error || '로그인에 실패했습니다. 다시 시도해주세요.', { variant: 'error' });
            } else {
                enqueueSnackbar('로그인에 성공했습니다.', { variant: 'success' });
            }
        } catch {
            enqueueSnackbar('로그인에 실패했습니다. 다시 시도해주세요.', { variant: 'error' });
        }
    };

    const isPostActive = location.pathname === '/post';
    const isChartActive = location.pathname === '/chart';

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm min-w-[600px]">
            <div className="px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
                            Directional 2025
                        </h1>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Button
                            component={Link}
                            to="/post"
                            variant={isPostActive ? 'contained' : 'outlined'}
                            size="small"
                            className={`cursor-pointer font-regular min-w-[80px] ${isChartActive ? 'bg-primary-600 text-white' : 'bg-white text-gray-900 border border-gray-300'}`}
                        >
                            Post
                        </Button>

                        <Button
                            component={Link}
                            to="/chart"
                            variant={isChartActive ? 'contained' : 'outlined'}
                            size="small"
                            className={`cursor-pointer font-regular min-w-[80px] ${isChartActive ? 'bg-primary-600 text-white' : 'bg-white text-gray-900 border border-gray-300'}`}
                        >
                            Chart
                        </Button>

                        <Tooltip open={!isAuthenticated} title="로그인을 먼저 진행해주세요." arrow>
                            <Button variant="contained" size="small" onClick={handleLogin} disabled={isAuthenticated} className="cursor-pointer font-regular min-w-[80px]">
                                로그인
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </header>
    );
};

