import React from 'react';
import { PostHeader } from '../../organisms/PostHeader';
import { PostTable } from '../../organisms/PostTable';
import { PostModal } from '../../molecules/PostModal';
import { ColumnSettingsModal } from '../../molecules/ColumnSettingsModal';
import type { iPostData, iColumnConfig, PostCategory, PostSortField, PostSortOrder, iPostRequest } from '../../../types/general.type';

export interface PostTemplateProps {
    // 데이터
    posts: iPostData[];
    columns: iColumnConfig[];
    isLoading?: boolean;
    hasMore?: boolean;

    // 필터 및 정렬
    searchValue: string;
    categoryFilter?: PostCategory;
    sortField: PostSortField;
    sortOrder: PostSortOrder;

    // 모달 상태
    isPostModalOpen: boolean;
    isColumnSettingsModalOpen: boolean;
    editingPost?: iPostData;

    // 이벤트 핸들러
    onSearchChange: (value: string) => void;
    onCategoryFilterChange: (category?: PostCategory) => void;
    onSortChange: (field: PostSortField, order: PostSortOrder) => void;
    onColumnResize: (columnId: string, newWidth: number) => void;
    onColumnSettingsToggle: () => void;
    onColumnSettingsUpdate: (columns: iColumnConfig[]) => void;
    onLoadMore: () => void;
    onCreatePostClick: () => void;
    onEditPost: (post: iPostData) => void;
    onDeletePost: (postId: string) => void;
    onPostSubmit: (data: iPostRequest) => void;
    onPostModalClose: () => void;
    onLoginClick: () => void;
    isSubmitting?: boolean;
}

export const PostTemplate: React.FC<PostTemplateProps> = ({
    posts,
    columns,
    isLoading = false,
    hasMore = false,
    searchValue,
    categoryFilter,
    sortField,
    sortOrder,
    isPostModalOpen,
    isColumnSettingsModalOpen,
    editingPost,
    onSearchChange,
    onCategoryFilterChange,
    onSortChange,
    onColumnResize,
    onColumnSettingsToggle,
    onColumnSettingsUpdate,
    onLoadMore,
    onCreatePostClick,
    onEditPost,
    onDeletePost,
    onPostSubmit,
    onPostModalClose,
    onLoginClick,
    isSubmitting = false
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50  min-w-[600px]">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <PostHeader
                    searchValue={searchValue}
                    onSearchChange={onSearchChange}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={onCategoryFilterChange}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                    onColumnSettingsClick={onColumnSettingsToggle}
                    onCreatePostClick={onCreatePostClick}
                    onLoginClick={onLoginClick}
                />

                <PostTable
                    posts={posts}
                    columns={columns}
                    isLoading={isLoading}
                    hasMore={hasMore}
                    onLoadMore={onLoadMore}
                    onEdit={onEditPost}
                    onDelete={onDeletePost}
                    onColumnResize={onColumnResize}
                    onSort={(field) => {
                        const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
                        onSortChange(field, newOrder);
                    }}
                    sortField={sortField}
                    sortOrder={sortOrder}
                />

                <PostModal
                    isOpen={isPostModalOpen}
                    onClose={onPostModalClose}
                    initialData={editingPost}
                    onSubmit={onPostSubmit}
                    isLoading={isSubmitting}
                />

                <ColumnSettingsModal
                    isOpen={isColumnSettingsModalOpen}
                    onClose={onColumnSettingsToggle}
                    columns={columns}
                    onUpdateColumns={onColumnSettingsUpdate}
                />
            </div>
        </div>
    );
};

