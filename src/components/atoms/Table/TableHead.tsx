import React from 'react';

export interface TableHeadProps {
    children: React.ReactNode;
    className?: string;
}

export const TableHead: React.FC<TableHeadProps> = ({ children, className = '' }) => {
    return (
        <thead className={`bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 ${className}`}>
            {children}
        </thead>
    );
};

