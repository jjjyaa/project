// pages/write.tsx (게시글 작성 페이지)
import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

import Layout from "@/components/Layout";
import styled from "styled-components";

// 게시글 입력 타입
interface PostForm {
  title: string;
  contents: string;
}

export default function PostWritePage() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext is not provided");
  }

  const { user } = auth;

  const [form, setForm] = useState<PostForm>({
    title: "",
    contents: "",
  });

  const [file, setFile] = useState<File | null>(null);

  // 입력값 처리
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 파일 선택 처리
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 글 작성 제출
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user || !user.email) {
      alert("로그인이 필요합니다.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "dto",
      new Blob(
        [JSON.stringify({
          title: form.title,
          contents: form.contents,
          email: user.email,
        })],
        { type: "application/json" }
      )
    );
    
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("http://localhost:8082/api/boards/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("글 작성 완료!");
      router.push("/postList");
    } catch (err) {
      alert("글 작성 실패");
      console.error(err);
    }
  };

  return (
    <Layout>
    <Container>
    <Title>글 등록하기</Title> 
      <form onSubmit={handleSubmit}>
        <TitleInput
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />
        <ContentArea
          name="contents"
          value={form.contents}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
        />
        <FileInput
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        <Button type="submit">등록</Button>
      </form>
    </Container>
    </Layout>
  );
}

// 스타일 정의
const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;


const TitleInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ContentArea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  margin-bottom: 1rem;
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  display: block;
  margin-left: auto;
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
  }
`;
