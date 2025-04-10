// pages/edit/[id].tsx (게시글 수정 페이지)
import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import styled from "styled-components";

// 게시글 타입 정의
interface Post {
  boardId: number;
  title: string;
  contents: string;
}

export default function PostEditPage() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState<Post>({
    boardId: 0,
    title: "",
    contents: "",
  });

  // 수정 전 기존 데이터 불러오기
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8082/api/boards/${id}`)
      .then((res) => {
        const { boardId, title, contents } = res.data;
        setForm({ boardId, title, contents });
      })
      .catch((err) => {
        alert("게시글 정보를 불러오는 데 실패했습니다.");
        router.push("/postList");
      });
  }, [id]);

  // 입력값 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 수정 요청
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "dto",
      new Blob(
        [
          JSON.stringify({
            title: form.title,
            contents: form.contents,
          }),
        ],
        { type: "application/json" }
      )
    );
    try {
      await axios.patch(`http://localhost:8082/api/boards/${id}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("게시글이 수정되었습니다!");
      router.push(`/post/${id}`);
    } catch (err) {
      console.error("수정 실패", err);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <Card>
      <Title>게시글 수정</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <Textarea
          name="contents"
          value={form.contents}
          onChange={handleChange}
          placeholder="내용"
          rows={10}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <Button type="submit">수정 완료</Button>
      </form>
    </Card>
  );
}


// 스타일
const Card = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-size: 1.05rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  display: block;
  margin-left: auto;
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
  }
`;