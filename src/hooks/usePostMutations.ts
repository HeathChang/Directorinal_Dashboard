import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostApi, updatePostApi, deletePostApi } from '../apis/post.api';
import type { iPostRequest } from '../types/general.type';

export const usePostMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createPostApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: iPostRequest }) => 
            updatePostApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

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

