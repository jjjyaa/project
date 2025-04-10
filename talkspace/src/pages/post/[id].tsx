import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";

// 게시글 타입
interface Post {
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

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const { user } = useAuth();  // 현재 로그인된 user 정보 가져오기
  const { id } = router.query;

  // 게시글 불러오기
  useEffect(() => {
    if (!id) return;
  
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/boards/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        alert("존재하지 않는 게시글입니다.");
        router.push("/postList");
      }
    };
  
    fetchPost();
  }, [id]);

  // 게시글 삭제
  const handleDelete = async () => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:8082/api/boards/${id}/delete`);
      alert("게시글이 삭제되었습니다.");
      router.push("/postList");
    } catch (error) {
      console.error("삭제 중 오류:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <Card>
      <Title>{post.title}</Title>
      <Meta>
        <span>작성자: {post.name}</span>
        <span>작성일: {post.createdDatetime}</span>
        <span>조회수: {post.hitCnt}</span>
      </Meta>
      <Divider />
      <Content>{post.contents}</Content>
      {post.files && post.files.length > 0 && (
        <FileBox>
          <h4>📎 첨부파일</h4>
          <ul>
            {post.files.map((file, idx) => (
              <li key={idx}>
                <a
                  href={`http://localhost:8082/uploads/${file.storedFilePath}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.originalFileName}
                </a>
              </li>
            ))}
          </ul>
        </FileBox>
      )}
      <ButtonBox>
        {user?.name === post.name && (
          <>
            <Button onClick={() => router.push(`/edit/${id}`)}>수정하기</Button>
            <Button onClick={handleDelete}>삭제하기</Button>
          </>
        )}
        <Button onClick={() => router.push("/postList")}>목록으로</Button>
      </ButtonBox>
    </Card>
  );
}

// 스타일
const Card = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.80rem;
  color: #555;
  margin-bottom: 1rem;
  gap: 4px;
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #ddd;
`;

const Content = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ButtonBox = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Button = styled.button<{ color?: "gray" | "red" }>`
  padding: 0.5rem 1.1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;

  background-color: ${(props) =>
    props.color === "gray"
      ? "#e5e7eb"
      : props.color === "red"
      ? "#ef4444"
      : "#4f46e5"};
  color: ${(props) =>
    props.color === "gray" ? "#333" : props.color === "red" ? "white" : "white"};

  &:hover {
    background-color: ${(props) =>
      props.color === "gray"
        ? "#d1d5db"
        : props.color === "red"
        ? "#dc2626"
        : "#4338ca"};
  }
`;

const FileBox = styled.div`
  margin-top: 3rem;

  h4 {
    font-weight: bold;
    margin-bottom: 0.8rem;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li a {
    color: #1d4ed8;
    text-decoration: underline;

    &:hover {
      color: #4338ca;
    }
  }
`;
