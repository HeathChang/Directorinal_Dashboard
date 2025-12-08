import React from 'react';

export interface TableRowProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const TableRow: React.FC<TableRowProps> = ({ children, className = '', onClick }) => {
    return (
        <tr
            className={`
                transition-colors duration-150
                ${onClick ? 'cursor-pointer hover:bg-blue-50/50' : 'hover:bg-gray-50/50'}
                border-b border-gray-100
                ${className}
            `}
            onClick={onClick}
        >
            {children}
        </tr>
    );
};

