import React from 'react';
import { IconPlus } from '@tabler/icons-react';
import { SearchBar } from '../../molecules/SearchBar';
import { Select } from '../../atoms/Select';
import type { SelectOption } from '../../atoms/Select';
import { Button } from '@mui/material';
import type { PostCategory, PostSortField, PostSortOrder } from '../../../types/general.type';
import { POST_CATEGORY_OPTIONS } from '../../../constants/post.constant';

export interface PostHeaderProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    categoryFilter?: PostCategory;
    onCategoryFilterChange: (category?: PostCategory) => void;
    sortField: PostSortField;
    sortOrder: PostSortOrder;
    onSortChange: (field: PostSortField, order: PostSortOrder) => void;
    onColumnSettingsClick: () => void;
    onCreatePostClick: () => void;
    onLoginClick: () => void;
}
const categoryOptions: SelectOption[] = [
    { value: '', label: '전체' },
    ...POST_CATEGORY_OPTIONS
];

const sortFieldOptions: SelectOption[] = [
    { value: 'title', label: '제목' },
    { value: 'createdAt', label: '생성일' }
];

const sortOrderOptions: SelectOption[] = [
    { value: 'asc', label: '오름차순' },
    { value: 'desc', label: '내림차순' }
];


export const PostHeader: React.FC<PostHeaderProps> = ({
    searchValue,
    onSearchChange,
    categoryFilter,
    onCategoryFilterChange,
    sortField,
    sortOrder,
    onSortChange,
    onLoginClick,
    onColumnSettingsClick,
    onCreatePostClick
}) => {

    return (
        <div className="space-y-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">게시판</h1>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outlined" onClick={onColumnSettingsClick} size="small" className='cursor-pointer'>
                            컬럼 설정
                        </Button>
                        <Button variant="outlined" onClick={onLoginClick} size="small" className='cursor-pointer'>
                            <span className="flex items-center gap-2">
                                로그인
                            </span>
                        </Button>
                        <Button variant="contained" onClick={onCreatePostClick} size="small" className='cursor-pointer'>
                            <span className="flex items-center gap-2">
                                <IconPlus className="w-4 h-4" />
                                게시글 작성
                            </span>
                        </Button>

                    </div>
                </div>

                {/* 필터 섹션 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                        <SearchBar
                            value={searchValue}
                            onChange={onSearchChange}
                            placeholder="제목 또는 본문 검색..."
                        />
                    </div>
                    <div className="flex gap-2 h-full">
                        <Select
                            value={categoryFilter || ''}
                            onChange={(e) => {
                                onCategoryFilterChange(
                                    e.target.value ? (e.target.value as PostCategory) : undefined
                                );
                            }}
                            options={categoryOptions}
                            className='h-full'
                        />
                    </div>
                    <div className="flex gap-2 h-full">
                        <Select
                            value={sortField}
                            onChange={(e) => onSortChange(e.target.value as PostSortField, sortOrder)}
                            options={sortFieldOptions}
                        />
                        <Select
                            value={sortOrder}
                            onChange={(e) => onSortChange(sortField, e.target.value as PostSortOrder)}
                            options={sortOrderOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

