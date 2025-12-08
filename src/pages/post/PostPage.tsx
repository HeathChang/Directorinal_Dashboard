import React, { useState, useCallback } from 'react';
import { PostTemplate } from '../../components/templates/post';
import { usePosts, usePostMutations } from '../../hooks';
import type { iPostRequest, PostCategory, PostSortField, PostSortOrder } from '../../types/general.type';

export const PostPage: React.FC = () => {
    // 필터 및 정렬 상태 관리
    const [categoryFilter, setCategoryFilter] = useState<PostCategory | undefined>();
    const [sortField, setSortField] = useState<PostSortField>('createdAt');
    const [sortOrder, setSortOrder] = useState<PostSortOrder>('desc');

    // React Query 훅
    const { posts, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts({
        sortField,
        sortOrder,
        category: categoryFilter
    });
    const {
        createPost,
        updatePost,
        deletePost,
        isSubmitting
    } = usePostMutations();

    // 더보기 핸들러
    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isLoading && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

    // 게시글 생성 핸들러
    const handleCreatePost = useCallback(async (data: iPostRequest) => {
        await createPost(data);
    }, [createPost]);

    // 게시글 수정 핸들러
    const handleUpdatePost = useCallback(async (id: string, data: iPostRequest) => {
        await updatePost({ id, data });
    }, [updatePost]);

    // 게시글 삭제 핸들러
    const handleDeletePost = useCallback(async (postId: string) => {
        await deletePost(postId);
    }, [deletePost]);

    return (
        <PostTemplate
            posts={posts}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasMore={hasNextPage || false}
            onLoadMore={handleLoadMore}
            onCreatePost={handleCreatePost}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
            isSubmitting={isSubmitting}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={(field, order) => {
                setSortField(field);
                setSortOrder(order);
            }}
        />
    );
};

