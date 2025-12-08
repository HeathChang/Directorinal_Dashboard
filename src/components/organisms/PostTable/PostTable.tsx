import React, { useEffect, useRef } from 'react';
import { IconFileText, IconLoader2 } from '@tabler/icons-react';
import { Table, TableHead, TableBody } from '../../atoms/Table';
import { TableColumnHeader } from '../../molecules/TableColumnHeader';
import { PostRow } from '../../molecules/PostRow';
import type { iPostData, iColumnConfig, PostSortField, PostSortOrder } from '../../../types/general.type';

export interface PostTableProps {
    posts: iPostData[];
    columns: iColumnConfig[];
    isLoading?: boolean;
    isFetchingNextPage?: boolean;
    onLoadMore?: () => void;
    hasMore?: boolean;
    onEdit?: (post: iPostData) => void;
    onDelete?: (postId: string) => void;
    onColumnResize?: (columnId: string, newWidth: number) => void;
    onSort?: (field: PostSortField) => void;
    sortField?: PostSortField;
    sortOrder?: PostSortOrder;
}

export const PostTable: React.FC<PostTableProps> = ({
    posts,
    columns,
    isLoading = false,
    isFetchingNextPage = false,
    onLoadMore,
    hasMore = false,
    onEdit,
    onDelete,
    onColumnResize,
    onSort,
    sortField,
    sortOrder
}) => {
    const observerTarget = useRef<HTMLDivElement>(null);

    // 무한 스크롤 구현
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // 초기 로딩 중이 아니고, 다음 페이지를 가져오는 중이 아니고, 더 가져올 페이지가 있을 때만 요청
                if (entries[0].isIntersecting && hasMore && !isLoading && !isFetchingNextPage && onLoadMore) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, isLoading, isFetchingNextPage, onLoadMore]);

    const visibleColumns = columns.filter(col => col.visible);

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <tr>
                            {visibleColumns.map((column) => (
                                <TableColumnHeader
                                    key={column.id}
                                    column={column}
                                    onResize={onColumnResize}
                                    onSort={onSort && (column.id === 'title' || column.id === 'createdAt')
                                        ? (columnId: string) => onSort(columnId as PostSortField)
                                        : undefined}
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                />
                            ))}
                        </tr>
                    </TableHead>
                    <TableBody>
                        {posts.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={visibleColumns.length}
                                    className="px-6 py-16 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <IconFileText className="w-16 h-16 text-gray-300 mb-4" stroke={1.5} />
                                        <p className="text-gray-500 text-lg font-medium">
                                            {isLoading ? '로딩 중...' : '게시글이 없습니다.'}
                                        </p>
                                        {!isLoading && (
                                            <p className="text-gray-400 text-sm mt-1">첫 번째 게시글을 작성해보세요!</p>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            posts.map((post, index) => (
                                <PostRow
                                    key={post.id}
                                    post={post}
                                    columns={columns}
                                    index={index}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 무한 스크롤 트리거 */}
            {hasMore && (
                <div ref={observerTarget} className="h-12 flex items-center justify-center bg-gray-50 border-t border-gray-200">
                    {isFetchingNextPage && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <IconLoader2 className="animate-spin h-5 w-5" />
                            <span>로딩 중...</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

