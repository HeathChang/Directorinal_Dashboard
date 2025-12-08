import React from 'react';
import { TableRow, TableCell } from '../../atoms/Table';
import type { iPostData, iColumnConfig } from '../../../types/general.type';
import { Button } from '@mui/material';

export interface PostRowProps {
    post: iPostData;
    columns: iColumnConfig[];
    onEdit?: (post: iPostData) => void;
    onDelete?: (postId: string) => void;
}

export const PostRow: React.FC<PostRowProps> = ({
    post,
    columns,
    onEdit,
    onDelete
}) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ko-KR');
    };

    const getCategoryLabel = (category: string) => {
        const labels: Record<string, string> = {
            NOTICE: '공지사항',
            QNA: 'Q&A',
            FREE: '자유게시판'
        };
        return labels[category] || category;
    };

    const renderCellContent = (columnId: string) => {
        switch (columnId) {
            case 'id':
                return <span className="font-mono text-xs">{post.id}</span>;
            case 'title':
                return <span className="font-medium">{post.title}</span>;
            case 'category': {
                const categoryColors: Record<string, string> = {
                    NOTICE: 'bg-purple-100 text-purple-700 border-purple-200',
                    QNA: 'bg-green-100 text-green-700 border-green-200',
                    FREE: 'bg-blue-100 text-blue-700 border-blue-200'
                };
                const colorClass = categoryColors[post.category] || 'bg-gray-100 text-gray-700 border-gray-200';
                return (
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colorClass}`}>
                        {getCategoryLabel(post.category)}
                    </span>
                );
            }
            case 'tags':
                return (
                    <div className="flex flex-wrap gap-1.5">
                        {post.tags.length > 0 ? (
                            post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 text-sm">-</span>
                        )}
                    </div>
                );
            case 'createdAt':
                return <span>{formatDate(post.createdAt)}</span>;
            case 'actions':
                return (
                    <div className="flex gap-2">
                        {onEdit && (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => onEdit(post)}
                            >
                                수정
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => onDelete(post.id)}
                            >
                                삭제
                            </Button>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <TableRow>
            {columns
                .filter(column => column.visible)
                .map((column) => (
                    <TableCell
                        key={column.id}
                        style={{ width: column.width }}
                    >
                        {renderCellContent(column.id)}
                    </TableCell>
                ))}
        </TableRow>
    );
};

