//댓글 타입정의
export interface Comment {
    commentId: number;
    boardId: number;
    content: string;
    name: string;
    createdDatetime: string;
}
//댓글 props 타입
export interface CommentSectionProps {
    boardId: number;
}
//검색 props 타입
export interface SearchBarProps {
    onSearch: (searchTerm: string, searchCategory: string) => void;
}

// 수정 게시글 타입
export interface EditPost {
    boardId: number;
    title: string;
    contents: string;
}
// 상세보기 게시글 타입
export interface DeatilPost {
    boardId: number;
    title: string;
    contents: string;
    createdDatetime: string;
    hitCnt: number;
    name: string;
    files?: {
      originalFileName: string;
      storedFilePath: string;
    }[];
}
// 게시글 목록 타입
export interface PostList {
    boardId: number;
    title: string;
    createdDatetime: string;
    hitCnt: number;
    name: string;

    commentCount: number;
    likeCount: number;
}
// 게시글 입력 타입
export interface PostForm {
    title: string;
    contents: string;
}