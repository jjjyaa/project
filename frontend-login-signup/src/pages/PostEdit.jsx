import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PostEdit() {
  const { id } = useParams(); // URL에서 게시글 ID 추출
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    contents: "",
  });

  // 게시글 정보 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/boards/${id}`);
        setForm({
          title: response.data.title,
          contents: response.data.contents,
        });
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        alert("게시글 정보를 불러오는 데 실패했습니다.");
      }
    };
    fetchPost();
  }, [id]);

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 수정 요청 보내기
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8082/api/boards/${id}/update`, form);
      alert("게시글이 수정되었습니다.");
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
      <h2>✏️ 게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          name="contents"
          value={form.contents}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
          rows="10"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}

export default PostEdit;
