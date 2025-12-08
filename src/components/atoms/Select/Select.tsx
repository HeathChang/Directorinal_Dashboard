import React from 'react';
import clsx from 'clsx';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    error?: string;
    helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
    options,
    error,
    helperText,
    className = '',
    id,
    ...props
}) => {
    const selectId = id;

    return (
        <div className="w-full">

            <select
                id={selectId}
                className={clsx(
                    'w-full px-4 py-2.5 border rounded-lg h-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
                    'bg-white shadow-sm cursor-pointer',
                    error ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-300 hover:border-gray-400',
                    className
                )}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
};

