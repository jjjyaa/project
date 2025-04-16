import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styled from "styled-components";
import SearchBar from "@/components/search";
import { PostList } from "@/types/post-type";

export default function PostListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostList[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/boards/search", {
          params: {
            searchTerm,
            searchType: searchCategory === "통합" ? "all" : searchCategory,
            page: currentPage ,
            size: 10,
          },
        });

        const data = response.data;
        setPosts(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("게시글 목록 불러오기 실패:", error);
      }
    };

    fetchPosts();
  }, [searchTerm, searchCategory, currentPage]);

  const handleSearch = (term: string, category: string) => {
    setSearchTerm(term);
    setSearchCategory(category);
    setCurrentPage(1); // 검색 시 첫 페이지로
  };

  return (
    <Container>
      <Title>게시글 목록</Title>
      <WriteButtonWrapper>
     <WriteButton onClick={() => router.push("/postWrite")}>
          게시글 등록
    </WriteButton>
    </WriteButtonWrapper>
      <SearchBar onSearch={handleSearch} />
      <Table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.boardId}>
                <td onClick={() => router.push(`/post/${post.boardId}`)}>
                  {post.title}
                  {post.commentCount > 0 && ` (${post.commentCount})`}
                  {post.likeCount > 0 && ` ❤️ ${post.likeCount}`}
                </td>
                <td>{post.name}</td>
                <td>{post.createdDatetime}</td>
                <td>{post.hitCnt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination>
          <PageButton onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            ◀ 이전
          </PageButton>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index}
              active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
          <PageButton onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            다음 ▶
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 1100px; /* 넓은 레이아웃 */
  margin: 2rem auto;
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px; 
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06); 
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WriteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;  /* 오른쪽 정렬 */
  margin-bottom: 0.25rem;
`;

const WriteButton = styled.button`
  padding: 0.4rem 1rem;   /* 작게 */
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem; 
  font-weight: 500;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  &:hover {
    background-color: #fbbf24;
  }
`;


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;

  th, td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 1rem; // 🔥 padding 증가
    text-align: center;
  }

  th {
    background-color: #fef3c7; // 🔥 밝은 노란색 강조 배경
    font-weight: bold;
    color: #111827;
    font-size: 0.95rem;
  }

  td {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
  }

  td:first-child {
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;

    &:hover {
    text-decoration: underline;
    }
  }
  tr:hover {
    background-color: #fefce8; // 🔥 hover 시 연노랑 배경
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : "#fff"};
  color: ${({ active }) => (active ? "#fff" : "#111827")};
  border-radius: 8px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ active }) =>
      active ? "#ea580c" : "#fef3c7"}; 
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;