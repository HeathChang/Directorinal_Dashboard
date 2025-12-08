// 게시글 데이터 구조
export interface iPostData {
    id: string;
    userId: string;
    title: string;
    body: string;
    category: string;
    tags: string[];
    createdAt: string;
}

// 게시글 작성/수정 요청
export interface iPostRequest {
    title: string;
    body: string;
    category: string;
    tags: string[];
}

// 게시글 정렬 옵션
export type PostSortField = 'title' | 'createdAt';
export type PostSortOrder = 'asc' | 'desc';

// 테이블 컬럼 설정
export interface iColumnConfig {
    id: string;
    label: string;
    width: number;
    visible: boolean;
    resizable: boolean;
}

// PostCategory는 string 타입으로 사용 (enum 대신)
export type PostCategory = 'NOTICE' | 'QNA' | 'FREE';

