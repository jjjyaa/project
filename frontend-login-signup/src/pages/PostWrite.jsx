import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostWrite() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    contents: ""
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 로그인 사용자 정보 없으면 글쓰기 제한
    if (!user || !user.email) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      // FormData 생성
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("contents", form.contents);
      formData.append("email", user.email);
      if (file) {
        formData.append("file", file);
      }

      // multipart/form-data 전송
      await axios.post("http://localhost:8082/api/boards/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("글 작성 완료");
      navigate("/list"); // 글 목록 페이지로 이동
    } catch (error) {
      alert("글 작성 실패");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="제목" value={form.title} onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} />
        <textarea name="contents" placeholder="내용" value={form.contents} onChange={handleChange} rows="10" style={{ width: "100%", marginBottom: "10px" }} />
        <input type="file" onChange={handleFileChange} accept="image/*" style={{ marginBottom: "10px" }}/>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default PostWrite;