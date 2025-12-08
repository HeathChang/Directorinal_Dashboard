import React from 'react';
import { Modal } from '../../atoms/Modal';
import { PostForm } from '../PostForm';
import type { PostFormProps } from '../PostForm';

export interface PostModalProps extends Omit<PostFormProps, 'onCancel'> {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export const PostModal: React.FC<PostModalProps> = ({
    isOpen,
    onClose,
    title,
    ...formProps
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title || (formProps.initialData ? '게시글 수정' : '게시글 작성')}
            size="lg"
        >
            <PostForm
                {...formProps}
                onCancel={onClose}
            />
        </Modal>
    );
};

