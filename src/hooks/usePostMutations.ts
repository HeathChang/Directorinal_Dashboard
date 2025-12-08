import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostApi, updatePostApi, deletePostApi } from '../apis/post.api';
import type { iPostData, iPostRequest } from '../types/general.type';

export const usePostMutations = () => {
    const queryClient = useQueryClient();

    // 게시글 작성
    const createMutation = useMutation({
        mutationFn: createPostApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    // 게시글 수정
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: iPostRequest }) => 
            updatePostApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    // 게시글 삭제
    const deleteMutation = useMutation({
        mutationFn: deletePostApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    return {
        createPost: createMutation.mutateAsync,
        updatePost: updateMutation.mutateAsync,
        deletePost: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isSubmitting: createMutation.isPending || updateMutation.isPending
    };
};

