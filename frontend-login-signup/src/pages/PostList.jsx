import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// 게시글 목록
function PostList() {

    const [posts, setPosts] = useState([]);

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
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2>📋 게시글 목록</h2>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(board => (
              <tr key={board.id}>
                <td>{board.id}</td>
                <td> 
                  <Link to={`/detail/${board.id}`}>{board.title}</Link>
                </td>
                <td>{board.writer}</td>
                <td>{new Date(board.createdDatetime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
    
export default PostList;