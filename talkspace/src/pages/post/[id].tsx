// pages/post/[id].tsx (게시글 상세보기 페이지)
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// 게시글 타입
interface Post {
  boardId: number;
  title: string;
  contents: string;
  createdDatetime: string;
  hitCnt: number;
  member: {
    name: string;
  };
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  const { id } = router.query;

  // 게시글 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/boards/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.error(err);
        alert("존재하지 않는 게시글입니다.");
        router.push("/postList");
      });
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
      <h2>제목: {post.title}</h2>
      <p><strong>작성자:</strong> {post.member.name}</p>
      <p><strong>작성일:</strong> {post.createdDatetime}</p>
      <p><strong>조회수:</strong> {post.hitCnt}</p>
      <hr />
      <p><strong>내용:</strong></p>
      <p>{post.contents}</p>
      <hr />
      <button onClick={() => router.push("/postList")}>목록으로</button>
      <button onClick={() => router.push(`/edit/${id}`)} style={{ marginLeft: "10px" }}>
        수정
      </button>
    </div>
  );
}
