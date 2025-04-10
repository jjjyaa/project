import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styled from "styled-components";
import SearchBar from "@/components/search";

// 게시글 타입 정의
interface Post {
  boardId: number;
  title: string;
  createdDatetime: string;
  hitCnt: number;
  name: string;
}

export default function PostListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]); // 게시글 목록 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchCategory, setSearchCategory] = useState("title"); // 검색 카테고리 상태

  // 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/boards/search", {
          params: {
            searchTerm,
            searchType: searchCategory,
          },
        });
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("게시글 목록 불러오기 실패:", error);
      }
    };

    fetchPosts();
  }, [searchTerm, searchCategory]); // 검색어 또는 카테고리가 변경될 때마다 API 호출

  // 검색어와 카테고리 변경 시 부모 상태를 업데이트하는 함수
  const handleSearch = (term: string, category: string) => {
    setSearchTerm(term);
    setSearchCategory(category);
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
          {posts.map((post) => (
            <tr key={post.boardId}>
              <td onClick={() => router.push(`/post/${post.boardId}`)}>
                {post.title}
              </td>
              <td>{post.name}</td>
              <td>{post.createdDatetime}</td>
              <td>{post.hitCnt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

// 스타일
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