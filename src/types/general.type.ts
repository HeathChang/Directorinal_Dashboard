export interface iPostData {
    id: string;
    userId: string;
    title: string;
    body: string;
    category: string;
    tags: string[];
    createdAt: string;
}

export interface iPostRequest {
    title: string;
    body: string;
    category: string;
    tags: string[];
}

export type PostSortField = 'title' | 'createdAt';
export type PostSortOrder = 'asc' | 'desc';

export interface iColumnConfig {
    id: string;
    label: string;
    width: number;
    visible: boolean;
    resizable: boolean;
}

export type PostCategory = 'NOTICE' | 'QNA' | 'FREE';

