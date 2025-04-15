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
      <Title>📋 게시글 목록</Title>
      <WriteButton onClick={() => router.push("/postWrite")}>게시글 등록</WriteButton>
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
                <td onClick={() => router.push(`/post/${post.boardId}`)}>{post.title}</td>
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
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const WriteButton = styled.button`
  padding: 0.6rem 1.2rem;
  margin-bottom: 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #e5e7eb;
    padding: 0.9rem;
    text-align: center;
  }

  th {
    background-color: #f9fafb;
    font-weight: bold;
    color: #333;
  }

  td {
    font-size: 0.95rem;
  }

  td:first-child {
    color: #4f46e5;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #4338ca;
    }
  }

  tr:hover {
    background-color: #f3f4f6;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.4rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.4rem 0.8rem;
  border: 1px solid #d1d5db;
  background-color: ${({ active }) => (active ? "#4f46e5" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#111827")};
  border-radius: 6px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};

  &:hover:not(:disabled) {
    background-color: ${({ active }) => (active ? "#4338ca" : "#f3f4f6")};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;