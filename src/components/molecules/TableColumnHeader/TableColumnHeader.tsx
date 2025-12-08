import React from 'react';
import { TableCell } from '../../atoms/Table';
import type { iColumnConfig } from '../../../types/general.type';

export interface TableColumnHeaderProps {
    column: iColumnConfig;
    onResize?: (columnId: string, newWidth: number) => void;
    onSort?: (columnId: string) => void;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
    className?: string;
}

export const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
    column,
    onResize,
    onSort,
    sortField,
    sortOrder,
    className = ''
}) => {
    const [isResizing, setIsResizing] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [startWidth, setStartWidth] = React.useState(0);
    const headerRef = React.useRef<HTMLTableCellElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!column.resizable || !onResize) return;
        e.preventDefault();
        setIsResizing(true);
        setStartX(e.clientX);
        if (headerRef.current) {
            setStartWidth(headerRef.current.offsetWidth);
        }
    };

    React.useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!onResize) return;
            const diff = e.clientX - startX;
            const newWidth = Math.max(50, startWidth + diff);
            onResize(column.id, newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, startX, startWidth, column.id, onResize]);

    const isSortable = onSort && (column.id === 'title' || column.id === 'createdAt');
    const isSorted = sortField === column.id;

    return (
        <TableCell
            isHeader
            ref={headerRef}
            className={className}
            style={{ width: column.width, minWidth: 50 }}
        >
            <div className="flex items-center justify-between">
                <div
                    className={`flex items-center gap-2 ${isSortable ? 'cursor-pointer hover:text-gray-700' : ''}`}
                    onClick={() => isSortable && onSort?.(column.id)}
                >
                    <span>{column.label}</span>
                    {isSortable && isSorted && (
                        <span className="text-xs">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                    )}
                </div>
                {column.resizable && (
                    <div
                        className="w-1 h-4 bg-gray-300 hover:bg-gray-400 cursor-col-resize"
                        onMouseDown={handleMouseDown}
                    />
                )}
            </div>
        </TableCell>
    );
};

