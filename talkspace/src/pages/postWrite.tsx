import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import styled from "styled-components";
import { PostForm } from "@/types/post-type";

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
  );
}

// styled-components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const TitleInput = styled.input`
  padding: 0.8rem 1rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.base};
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px #fef3c7;
  }
`;

const ContentArea = styled.textarea`
  padding: 1rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.base};
  min-height: 200px;
  resize: vertical;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px #fef3c7;
  }
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  display: block;
  margin-left: auto;
  margin-top: 1rem;
  padding: 0.6rem 1.4rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;

  &:hover {
    background-color: #fbbf24;
  }
`;