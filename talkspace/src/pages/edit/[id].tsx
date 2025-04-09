// pages/edit/[id].tsx (게시글 수정 페이지)
import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

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
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <textarea
          name="contents"
          value={form.contents}
          onChange={handleChange}
          placeholder="내용"
          rows={10}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}
