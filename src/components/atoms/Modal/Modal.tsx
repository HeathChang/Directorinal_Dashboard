import React, { useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import { IconButton } from '@mui/material';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md'
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeStyles = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
            <div
                className={`relative bg-white rounded-2xl shadow-2xl ${sizeStyles[size]} w-full max-h-[90vh] overflow-hidden flex flex-col transform transition-all`}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                        <IconButton
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            size="small"
                        >
                            <IconX className="w-5 h-5" />
                        </IconButton>
                    </div>
                )}
                <div className="overflow-y-auto flex-1 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

