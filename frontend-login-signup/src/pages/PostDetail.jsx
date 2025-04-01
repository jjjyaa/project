import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// 게시물 상세 조회
function PostDetail() {
  const { id } = useParams(); // URL에서 :id 값을 추출
  const [post, setPost] = useState(null); // 게시글 데이터 저장
  const [error, setError] = useState(null); // 오류 메시지 저장

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/boards/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("게시글 상세 조회 실패:", err);
        setError("게시글을 불러올 수 없습니다.");
      }
    };
    fetchPost();
  }, [id]);

    // 게시글 삭제
    const handleDelete = async () => {
        const confirm = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirm) return;
    
        try {
          await axios.delete(`http://localhost:8082/api/boards/${id}/delete`);
          alert("게시글이 삭제되었습니다.");
          navigate("/list"); // 삭제 후 목록 페이지로 이동
        } catch (error) {
          console.error("삭제 실패:", error);
          alert("삭제 중 오류가 발생했습니다.");
        }
      };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>게시글을 불러오는 중입니다...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
      <h2>{post.title}</h2>
      <p><strong>작성자:</strong> {post.writer}</p>
      <p><strong>작성일:</strong> {new Date(post.createdDatetime).toLocaleString()}</p>
      <hr />
      <p>{post.contents}</p>

      <div style={{ marginTop: "20px"}}>
        <button onClick={() => navigate(`/edit/${id}`)}>✏️ 수정</button>
        <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}> 🗑 삭제 </button>
      </div>
    </div>
  );
}

export default PostDetail;