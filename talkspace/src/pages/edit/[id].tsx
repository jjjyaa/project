import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";
import { EditPost } from "@/types/post-type";

export default function PostEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [form, setForm] = useState<EditPost>({
    boardId: 0,
    title: "",
    contents: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>(""); // 에러 메시지 상태 추가

  // 수정 전 기존 데이터 불러오기
  useEffect(() => {
    if (!id) return;  // id가 없으면 함수 종료

    const fetchBoardData = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/boards/${id}`);
        const { boardId, title, contents } = res.data;
        setForm({ boardId, title, contents });
      } catch (err) {
        alert("게시글 정보를 불러오는 데 실패했습니다.");
        router.push("/postList");
      }
    };

    fetchBoardData();
  }, [id, setForm, router]);

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
            email: user?.email
          }),
        ],
        { type: "application/json" }
      )
    );
    try {
      await axios.patch(`http://localhost:8082/api/boards/${id}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("게시글이 수정되었습니다!");
      router.push(`/post/${id}`);
    } catch (err:any) {
      // 400 에러 처리
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data);  // 서버에서 반환한 에러 메시지 상태에 저장
        alert(errorMessage);
      } else {
        alert(errorMessage);
      }
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
