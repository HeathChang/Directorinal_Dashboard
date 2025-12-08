import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PostTemplate } from '../../components/templates/post';
import { usePosts, usePostMutations, useAuth } from '../../hooks';
import type {
    iPostData,
    iColumnConfig,
    PostCategory,
    PostSortField,
    PostSortOrder,
    iPostRequest
} from '../../types/general.type';
import { DEFAULT_POST_COLUMNS } from '../../constants/post.constant';

export const PostPage: React.FC = () => {
    // React Query 훅
    const { posts: allPosts, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts();
    const {
        createPost,
        updatePost,
        deletePost,
        isSubmitting
    } = usePostMutations();
    const { login } = useAuth();

    // 상태 관리
    const [columns, setColumns] = useState<iColumnConfig[]>(() => {
        const saved = localStorage.getItem('postColumns');
        return saved ? JSON.parse(saved) : DEFAULT_POST_COLUMNS;
    });

    const [searchValue, setSearchValue] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<PostCategory | undefined>();
    const [sortField, setSortField] = useState<PostSortField>('createdAt');
    const [sortOrder, setSortOrder] = useState<PostSortOrder>('desc');

    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isColumnSettingsModalOpen, setIsColumnSettingsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<iPostData | undefined>();

    // 컬럼 설정 저장
    useEffect(() => {
        localStorage.setItem('postColumns', JSON.stringify(columns));
    }, [columns]);

    // 클라이언트 사이드 필터링 및 정렬
    const filteredAndSortedPosts = useMemo(() => {
        let filteredPosts = [...allPosts];

        // 검색 필터
        if (searchValue) {
            const searchLower = searchValue.toLowerCase();
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchLower) ||
                post.body.toLowerCase().includes(searchLower)
            );
        }

        // 카테고리 필터
        if (categoryFilter) {
            filteredPosts = filteredPosts.filter(post => post.category === categoryFilter);
        }

        // 정렬
        filteredPosts.sort((a, b) => {
            let comparison = 0;
            if (sortField === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (sortField === 'createdAt') {
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filteredPosts;
    }, [allPosts, searchValue, categoryFilter, sortField, sortOrder]);

    const handlePostSubmit = useCallback(async (data: iPostRequest) => {
        try {
            if (editingPost) {
                await updatePost({ id: editingPost.id, data });
            } else {
                await createPost(data);
            }
            setIsPostModalOpen(false);
            setEditingPost(undefined);
        } catch (error) {
            console.error('게시글 저장 실패:', error);
        }
    }, [editingPost, createPost, updatePost]);

    const handleEditPost = useCallback((post: iPostData) => {
        setEditingPost(post);
        setIsPostModalOpen(true);
    }, []);

    const handleDeletePost = useCallback((postId: string) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deletePost(postId);
        }
    }, [deletePost]);

    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isLoading && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

    const handleSortChange = useCallback((field: PostSortField, order: PostSortOrder) => {
        setSortField(field);
        setSortOrder(order);
    }, []);

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

    const handleLoginClick = useCallback(async () => {
        const result = await login({
            email: 'jannhyunsoo@gmail.com',
            password: 'TQ5Yw8N2K9'
        });

        if (!result.success) {
            alert(result.error || '로그인에 실패했습니다. 다시 시도해주세요.');
        }
    }, [login]);

    return (
        <PostTemplate
            posts={filteredAndSortedPosts}
            columns={columns}
            isLoading={isLoading || isFetchingNextPage}
            hasMore={hasNextPage || false}
            searchValue={searchValue}
            categoryFilter={categoryFilter}
            sortField={sortField}
            sortOrder={sortOrder}
            isPostModalOpen={isPostModalOpen}
            isColumnSettingsModalOpen={isColumnSettingsModalOpen}
            editingPost={editingPost}
            onSearchChange={setSearchValue}
            onCategoryFilterChange={setCategoryFilter}
            onSortChange={handleSortChange}
            onColumnResize={handleColumnResize}
            onColumnSettingsToggle={() => setIsColumnSettingsModalOpen(prev => !prev)}
            onColumnSettingsUpdate={handleColumnSettingsUpdate}
            onLoadMore={handleLoadMore}
            onCreatePostClick={() => {
                setEditingPost(undefined);
                setIsPostModalOpen(true);
            }}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
            onPostSubmit={handlePostSubmit}
            onPostModalClose={() => {
                setIsPostModalOpen(false);
                setEditingPost(undefined);
            }}
            onLoginClick={handleLoginClick}
            isSubmitting={isSubmitting}
        />
    );
};

