// pages/postList.tsx (게시글 목록)
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  // 게시글 목록 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8082/api/boards/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        }
      })
      .catch((err) => {
        console.error("게시글 목록 불러오기 실패:", err);
      });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>📋 게시글 목록</h2>

      <button
        onClick={() => router.push("/postWrite")}
        style={{ marginBottom: "10px" }}
      >
        게시글 등록
      </button>

      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", textAlign: "center" }}
      >
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
              <td
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => router.push(`/post/${post.boardId}`)}
              >
                {post.title}
              </td>
              <td>{post.name}</td>
              <td>{post.createdDatetime}</td>
              <td>{post.hitCnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
