import React, { useContext, useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// 글 등록 페이지
function PostWrite() {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const {user} = useContext(AuthContext); // 로그인 사용자 정보
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(!title.trim() || !contents.trim()){
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8082/api/boards', {
                title,
                contents,
                writer: user?.name // 사용자 이름과 같이 전송
            });
            alert('게시글 등록 성공');
            navigate('/main');
        } catch (error) {
            alert('게시글 등록 실패');
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'left' }}>
          <h2>게시글 작성</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <textarea
              name="content"
              placeholder="내용을 입력하세요"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              rows="10"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <button type="submit">등록하기</button>
          </form>
        </div>
      );
    }
    
    export default PostWrite;