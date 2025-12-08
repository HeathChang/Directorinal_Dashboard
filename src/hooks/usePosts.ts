import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsApi } from '../apis/post.api';
import type { iPostData, PostCategory, PostSortField, PostSortOrder } from '../types/general.type';

const POSTS_PER_PAGE = 10;

export interface UsePostsParams {
    sortField?: PostSortField;
    sortOrder?: PostSortOrder;
    category?: PostCategory;
}

export const usePosts = (params?: UsePostsParams) => {
    const {
        data: postsData,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['posts', params?.sortField, params?.sortOrder, params?.category],
        queryFn: ({ pageParam }) => {
            return getPostsApi({
                nextCursor: pageParam as string | null,
                limit: POSTS_PER_PAGE,
                sort: params?.sortField,
                order: params?.sortOrder,
                category: params?.category
            });
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.nextCursor && lastPage.nextCursor !== null) {
                return lastPage.nextCursor;
            }
            return undefined;
        },
        initialPageParam: null as string | null
    });

    const allPosts: iPostData[] = [];
    if (postsData?.pages) {
        postsData.pages.forEach(page => {
            if (page.items && Array.isArray(page.items)) {
                allPosts.push(...page.items);
            }
        });
    }

    return {
        posts: allPosts,
        isLoading,
        fetchNextPage,
        hasNextPage: hasNextPage || false,
        isFetchingNextPage
    };
};

