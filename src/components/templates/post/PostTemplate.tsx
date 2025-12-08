import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
    onSortChange
}) => {
    const { enqueueSnackbar } = useSnackbar();

    // 컬럼 설정 상태 관리
    const [columns, setColumns] = useState<iColumnConfig[]>(() => {
        const saved = localStorage.getItem('postColumns');
        if (saved) {
            const savedColumns: iColumnConfig[] = JSON.parse(saved);
            // 순번 컬럼이 없으면 추가하고, 제목 앞에 오도록 순서 보장
            const hasIndexColumn = savedColumns.some(col => col.id === 'index');
            if (!hasIndexColumn) {
                // 순번 컬럼 추가
                const indexColumn: iColumnConfig = { id: 'index', label: '순번', width: 80, visible: true, resizable: true };
                // 제목 컬럼의 인덱스 찾기
                const titleIndex = savedColumns.findIndex(col => col.id === 'title');
                if (titleIndex >= 0) {
                    // 제목 앞에 순번 삽입
                    savedColumns.splice(titleIndex, 0, indexColumn);
                } else {
                    // 제목이 없으면 맨 앞에 추가
                    savedColumns.unshift(indexColumn);
                }
            } else {
                // 순번 컬럼이 있으면 제목 앞에 오도록 순서 조정
                const indexColumn = savedColumns.find(col => col.id === 'index');
                const titleIndex = savedColumns.findIndex(col => col.id === 'title');
                if (indexColumn && titleIndex >= 0) {
                    // 순번 컬럼 제거 후 제목 앞에 삽입
                    const filteredColumns = savedColumns.filter(col => col.id !== 'index');
                    filteredColumns.splice(titleIndex, 0, indexColumn);
                    return filteredColumns;
                }
            }
            return savedColumns;
        }
        return DEFAULT_POST_COLUMNS;
    });

    // 검색 상태 관리 (클라이언트 사이드 필터링)
    const [searchValue, setSearchValue] = useState('');

    // 모달 상태 관리
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isColumnSettingsModalOpen, setIsColumnSettingsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<iPostData | undefined>();

    // 컬럼 설정 localStorage 저장
    useEffect(() => {
        localStorage.setItem('postColumns', JSON.stringify(columns));
    }, [columns]);

    // 검색 필터만 클라이언트 사이드에서 처리 (카테고리와 정렬은 서버에서 처리)
    const filteredPosts = useMemo(() => {
        if (!searchValue) {
            return posts;
        }

        const searchLower = searchValue.toLowerCase();
        return posts.filter(post =>
            post.title.toLowerCase().includes(searchLower) ||
            post.body.toLowerCase().includes(searchLower)
        );
    }, [posts, searchValue]);

    // 테이블 정렬 핸들러
    const handleTableSort = useCallback((field: PostSortField) => {
        const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        onSortChange(field, newOrder);
    }, [sortField, sortOrder, onSortChange]);

    // 컬럼 리사이즈 핸들러
    const handleColumnResize = useCallback((columnId: string, newWidth: number) => {
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId ? { ...col, width: newWidth } : col
            )
        );
    }, []);

    // 컬럼 설정 업데이트 핸들러
    const handleColumnSettingsUpdate = useCallback((newColumns: iColumnConfig[]) => {
        setColumns(newColumns);
    }, []);

    // 게시글 편집 핸들러
    const handleEditPost = useCallback((post: iPostData) => {
        setEditingPost(post);
        setIsPostModalOpen(true);
    }, []);

    // 게시글 삭제 핸들러
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

    // 게시글 제출 핸들러
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
        } catch (error) {
            console.error('게시글 저장 실패:', error);
            enqueueSnackbar('게시글 저장에 실패했습니다.', { variant: 'error' });
        }
    }, [editingPost, onCreatePost, onUpdatePost, enqueueSnackbar]);

    // 모달 닫기 핸들러
    const handlePostModalClose = useCallback(() => {
        setIsPostModalOpen(false);
        setEditingPost(undefined);
    }, []);

    // 게시글 작성 클릭 핸들러
    const handleCreatePostClick = useCallback(() => {
        setEditingPost(undefined);
        setIsPostModalOpen(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50  min-w-[600px]">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <PostHeader
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
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

