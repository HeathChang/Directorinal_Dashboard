import type { PostCategory } from '../types/general.type';

// 게시글 카테고리 옵션
export const POST_CATEGORY_OPTIONS: Array<{ value: PostCategory; label: string }> = [
    { value: 'NOTICE', label: '공지사항' },
    { value: 'QNA', label: 'Q&A' },
    { value: 'FREE', label: '자유게시판' }
];

// 게시글 테이블 기본 컬럼 설정
export const DEFAULT_POST_COLUMNS = [
    { id: 'index', label: '순번', width: 80, visible: true, resizable: true },
    { id: 'id', label: 'ID', width: 200, visible: false, resizable: true },
    { id: 'title', label: '제목', width: 300, visible: true, resizable: true },
    { id: 'category', label: '카테고리', width: 120, visible: true, resizable: true },
    { id: 'tags', label: '태그', width: 200, visible: true, resizable: true },
    { id: 'createdAt', label: '생성일', width: 180, visible: true, resizable: true },
    { id: 'actions', label: '작업', width: 120, visible: true, resizable: false }
];

// 게시글 제한사항
export const POST_LIMITS = {
    TITLE_MAX_LENGTH: 80,
    BODY_MAX_LENGTH: 2000,
    TAGS_MAX_COUNT: 5,
    TAG_MAX_LENGTH: 24
};

