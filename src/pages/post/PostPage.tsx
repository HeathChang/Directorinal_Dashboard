import React, { useState, useCallback } from 'react';
import { PostTemplate } from '../../components/templates/post';
import { usePosts, usePostMutations } from '../../hooks';
import type { iPostRequest, PostCategory, PostSortField, PostSortOrder } from '../../types/general.type';

export const PostPage: React.FC = () => {
    const [categoryFilterInput, setCategoryFilterInput] = useState<PostCategory | undefined>();
    const [sortFieldInput, setSortFieldInput] = useState<PostSortField>('createdAt');
    const [sortOrderInput, setSortOrderInput] = useState<PostSortOrder>('desc');
    const [searchInput, setSearchInput] = useState<string>('');

    const [categoryFilter, setCategoryFilter] = useState<PostCategory | undefined>();
    const [sortField, setSortField] = useState<PostSortField>('createdAt');
    const [sortOrder, setSortOrder] = useState<PostSortOrder>('desc');
    const [searchValue, setSearchValue] = useState<string>('');

    const { posts, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts({
        sortField,
        sortOrder,
        category: categoryFilter,
        search: searchValue
    });


    const {
        createPost,
        updatePost,
        deletePost,
        isSubmitting
    } = usePostMutations();

    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isLoading && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

    const handleCreatePost = useCallback(async (data: iPostRequest) => {
        await createPost(data);
    }, [createPost]);

    const handleUpdatePost = useCallback(async (id: string, data: iPostRequest) => {
        await updatePost({ id, data });
    }, [updatePost]);

    const handleDeletePost = useCallback(async (postId: string) => {
        await deletePost(postId);
    }, [deletePost]);

    const handleSearch = useCallback(() => {
        setCategoryFilter(categoryFilterInput);
        setSortField(sortFieldInput);
        setSortOrder(sortOrderInput);
        setSearchValue(searchInput.trim());
    }, [categoryFilterInput, sortFieldInput, sortOrderInput, searchInput]);

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
            categoryFilter={categoryFilterInput}
            onCategoryFilterChange={setCategoryFilterInput}
            sortField={sortFieldInput}
            sortOrder={sortOrderInput}
            onSortChange={(field, order) => {
                setSortFieldInput(field);
                setSortOrderInput(order);
            }}
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            onSearch={handleSearch}
        />
    );
};

