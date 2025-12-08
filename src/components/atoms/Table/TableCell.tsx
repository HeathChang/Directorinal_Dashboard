import React from 'react';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
    className?: string;
    isHeader?: boolean;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ 
    children, 
    className = '', 
    isHeader = false,
    ...props
}, ref) => {
    const Component = isHeader ? 'th' : 'td';
    const baseStyles = isHeader
        ? 'px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
        : 'px-6 py-4 whitespace-nowrap text-sm text-gray-700';
    
    return (
        <Component ref={ref} className={`${baseStyles} ${className}`} {...props}>
            {children}
        </Component>
    );
});

TableCell.displayName = 'TableCell';

