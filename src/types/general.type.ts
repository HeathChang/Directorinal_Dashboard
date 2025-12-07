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

