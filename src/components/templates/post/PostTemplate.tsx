import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { PostHeader } from '../../organisms/PostHeader';
import { PostTable } from '../../organisms/PostTable';
import { PostModal } from '../../molecules/PostModal';
import { ColumnSettingsModal } from '../../molecules/ColumnSettingsModal';
import { DEFAULT_POST_COLUMNS } from '../../../constants/post.constant';
import type { iPostData, iColumnConfig, PostCategory, PostSortField, PostSortOrder, iPostRequest } from '../../../types/general.type';

export interface PostTemplateProps {
    posts: iPostData[];
    isLoading?: boolean;
    isFetchingNextPage?: boolean;
    hasMore?: boolean;
    onLoadMore: () => void;
    onCreatePost: (data: iPostRequest) => Promise<void>;
    onUpdatePost: (id: string, data: iPostRequest) => Promise<void>;
    onDeletePost: (postId: string) => Promise<void>;
    isSubmitting?: boolean;
    categoryFilter?: PostCategory;
    onCategoryFilterChange: (category?: PostCategory) => void;
    sortField: PostSortField;
    sortOrder: PostSortOrder;
    onSortChange: (field: PostSortField, order: PostSortOrder) => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearch: () => void;
}

export const PostTemplate: React.FC<PostTemplateProps> = ({
    posts,
    isLoading = false,
    isFetchingNextPage = false,
    hasMore = false,
    onLoadMore,
    onCreatePost,
    onUpdatePost,
    onDeletePost,
    isSubmitting = false,
    categoryFilter,
    onCategoryFilterChange,
    sortField,
    sortOrder,
    onSortChange,
    searchValue,
    onSearchChange,
    onSearch
}) => {
    const { enqueueSnackbar } = useSnackbar();

    const [columns, setColumns] = useState<iColumnConfig[]>(() => {
        const saved = localStorage.getItem('postColumns');
        if (saved) {
            const savedColumns: iColumnConfig[] = JSON.parse(saved);
            const hasIndexColumn = savedColumns.some(col => col.id === 'index');
            if (!hasIndexColumn) {
                const indexColumn: iColumnConfig = { id: 'index', label: '순번', width: 80, visible: true, resizable: true };
                const titleIndex = savedColumns.findIndex(col => col.id === 'title');
                if (titleIndex >= 0) {
                    savedColumns.splice(titleIndex, 0, indexColumn);
                } else {
                    savedColumns.unshift(indexColumn);
                }
            } else {
                const indexColumn = savedColumns.find(col => col.id === 'index');
                const titleIndex = savedColumns.findIndex(col => col.id === 'title');
                if (indexColumn && titleIndex >= 0) {
                    const filteredColumns = savedColumns.filter(col => col.id !== 'index');
                    filteredColumns.splice(titleIndex, 0, indexColumn);
                    return filteredColumns;
                }
            }
            return savedColumns;
        }
        return DEFAULT_POST_COLUMNS;
    });

    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isColumnSettingsModalOpen, setIsColumnSettingsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<iPostData | undefined>();

    useEffect(() => {
        localStorage.setItem('postColumns', JSON.stringify(columns));
    }, [columns]);

    const filteredPosts = posts;

    const handleTableSort = useCallback((field: PostSortField) => {
        const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        onSortChange(field, newOrder);
    }, [sortField, sortOrder, onSortChange]);

    const handleColumnResize = useCallback((columnId: string, newWidth: number) => {
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId ? { ...col, width: newWidth } : col
            )
        );
    }, []);

    const handleColumnSettingsUpdate = useCallback((newColumns: iColumnConfig[]) => {
        setColumns(newColumns);
    }, []);

    const handleEditPost = useCallback((post: iPostData) => {
        setEditingPost(post);
        setIsPostModalOpen(true);
    }, []);

    const handleDeletePost = useCallback(async (postId: string) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await onDeletePost(postId);
                enqueueSnackbar('게시글이 삭제되었습니다.', { variant: 'success' });
            } catch {
                enqueueSnackbar('게시글 삭제에 실패했습니다.', { variant: 'error' });
            }
        }
    }, [onDeletePost, enqueueSnackbar]);

    const handlePostSubmit = useCallback(async (data: iPostRequest) => {
        try {
            if (editingPost) {
                await onUpdatePost(editingPost.id, data);
                enqueueSnackbar('게시글이 수정되었습니다.', { variant: 'success' });
            } else {
                await onCreatePost(data);
                enqueueSnackbar('게시글이 등록되었습니다.', { variant: 'success' });
            }
            setIsPostModalOpen(false);
            setEditingPost(undefined);
        } catch {
            enqueueSnackbar('게시글 저장에 실패했습니다.', { variant: 'error' });
        }
    }, [editingPost, onCreatePost, onUpdatePost, enqueueSnackbar]);

    const handlePostModalClose = useCallback(() => {
        setIsPostModalOpen(false);
        setEditingPost(undefined);
    }, []);

    const handleCreatePostClick = useCallback(() => {
        setEditingPost(undefined);
        setIsPostModalOpen(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50  min-w-[600px]">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <PostHeader
                    searchValue={searchValue}
                    onSearchChange={onSearchChange}
                    onSearch={onSearch}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={onCategoryFilterChange}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                    onColumnSettingsClick={() => setIsColumnSettingsModalOpen(prev => !prev)}
                    onCreatePostClick={handleCreatePostClick}
                />

                <PostTable
                    posts={filteredPosts}
                    columns={columns}
                    isLoading={isLoading}
                    isFetchingNextPage={isFetchingNextPage}
                    hasMore={hasMore}
                    onLoadMore={onLoadMore}
                    onEdit={handleEditPost}
                    onDelete={handleDeletePost}
                    onColumnResize={handleColumnResize}
                    onSort={handleTableSort}
                    sortField={sortField}
                    sortOrder={sortOrder}
                />

                <PostModal
                    isOpen={isPostModalOpen}
                    onClose={handlePostModalClose}
                    initialData={editingPost}
                    onSubmit={handlePostSubmit}
                    isLoading={isSubmitting}
                />

                <ColumnSettingsModal
                    isOpen={isColumnSettingsModalOpen}
                    onClose={() => setIsColumnSettingsModalOpen(prev => !prev)}
                    columns={columns}
                    onUpdateColumns={handleColumnSettingsUpdate}
                />
            </div>
        </div>
    );
};

