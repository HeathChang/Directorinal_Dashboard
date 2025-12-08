import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsApi } from '../apis/post.api';
import type { iPostData } from '../types/general.type';

const POSTS_PER_PAGE = 10;

export const usePosts = () => {
    const { 
        data: postsData, 
        isLoading, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1 }) => getPostsApi(pageParam, POSTS_PER_PAGE),
        getNextPageParam: (lastPage, allPages) => {
            const totalPages = Math.ceil(lastPage.total / POSTS_PER_PAGE);
            return allPages.length < totalPages ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1
    });

    // 모든 페이지의 게시글을 하나의 배열로 합치기
    const allPosts: iPostData[] = [];
    postsData?.pages.forEach(page => {
        allPosts.push(...(page.data ?? []));
    });

    return {
        posts: allPosts,
        isLoading,
        fetchNextPage,
        hasNextPage: hasNextPage || false,
        isFetchingNextPage
    };
};

