// pages/post-list.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link"; // next/link로 변경
import axios from "axios";

// 게시글 목록
const PostList = () => {
  const [posts, setPosts] = useState<Array<{ 
    boardId: number;
    title: string; 
    member: {
        email: string;
    };
    createdDatetime: string
  }>>([]);

  useEffect(() => {
    // 게시글 불러오기
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/boards/");
        setPosts(response.data); // 게시글 목록 상태에 저장
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>📋 게시글 목록</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((board) => (
            <tr key={board.boardId}>
              <td>{board.boardId}</td>
              <td>
                <Link href={`/post/${board.boardId}`}>
                  {board.title}
                </Link>
              </td>
              <td>{board.member.email}</td>
              <td>{new Date(board.createdDatetime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
