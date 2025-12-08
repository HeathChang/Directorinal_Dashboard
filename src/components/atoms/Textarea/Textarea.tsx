import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    maxLength?: number;
    showCount?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
    label,
    error,
    helperText,
    maxLength,
    showCount = false,
    className = '',
    id,
    value,
    ...props
}) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const currentLength = typeof value === 'string' ? value.length : 0;
    
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                maxLength={maxLength}
                value={value}
                className={`
                    w-full px-4 py-3 border rounded-lg resize-none
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                    ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-300 hover:border-gray-400'}
                    bg-white shadow-sm
                    ${className}
                `}
                {...props}
            />
            <div className="flex justify-between mt-1">
                <div>
                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}
                    {helperText && !error && (
                        <p className="text-sm text-gray-500">{helperText}</p>
                    )}
                </div>
                {showCount && maxLength && (
                    <p className={`text-sm ${currentLength > maxLength * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
                        {currentLength} / {maxLength}
                    </p>
                )}
            </div>
        </div>
    );
};

