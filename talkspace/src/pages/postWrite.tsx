// pages/write.tsx (게시글 작성 페이지)
import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

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
    formData.append("title", form.title);
    formData.append("contents", form.contents);
    formData.append("email", user.email);
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
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>✍️ 게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <textarea
          name="contents"
          value={form.contents}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
          rows={10}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ marginBottom: "10px" }}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
