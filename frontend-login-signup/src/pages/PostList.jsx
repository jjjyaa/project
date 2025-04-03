import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// 게시글 목록
function PostList() {

    const [posts, setPosts] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get("http://localhost:8082/api/boards/")
      .then((res) => {setPosts(res.data);})
      .catch((err) => {console.error("게시글 목록 가져오기 실패", err);});
      }, []);
    
    const handleCheckboxChange = (id) => {
      setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
  };

    const handleDeleteSelected = async () => {
      const confirmed = window.confirm("선택한 게시글을 삭제하시겠습니까?");
      if (!confirmed) return;
      try {
        for (const id of selectedIds) {
          await axios.delete(`http://localhost:8082/api/boards/${id}/delete`);
        }
        // 삭제 후 목록 새로고침
        const res = await axios.get("http://localhost:8082/api/boards/");
        setPosts(res.data);
        setSelectedIds([]);
        alert("삭제 완료");
      } catch (err) {
        console.error(err);
        alert("삭제 실패");
      }
    };
    
    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2>📋 게시글 목록</h2>
        <button onClick={handleDeleteSelected} disabled={selectedIds.length === 0}>
        삭제 </button>
        <button onClick={() => navigate(`/write`)} style={{ marginLeft: "10px"}}> 게시글 등록</button>
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px", textAlign: "center" }}>
        <thead>
          <tr>
            <th>선택</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
          </thead>
          <tbody>
          {posts.map(post => (
            <tr key={post.boardId}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(post.boardId)}
                  onChange={() => handleCheckboxChange(post.boardId)}
                />
              </td>
              <td>
                <Link to={`/detail/${post.boardId}`} style={{ textDecoration: 'none', color: 'blue' }}>
                  {post.title}
                </Link>
              </td>
              <td>{post.member?.name}</td>
              <td>{post.createdDatetime}</td>
              <td>{post.hitCnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }
    
export default PostList;