import React from 'react';

export interface TableBodyProps {
    children: React.ReactNode;
    className?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({ children, className = '' }) => {
    return (
        <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
            {children}
        </tbody>
    );
};

