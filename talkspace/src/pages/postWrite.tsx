import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// 게시글 작성 페이지
const PostWrite = () => {
    const { user } = useAuth(); // 로그인된 사용자 정보 가져오기
    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');

    // 제목 입력 값 처리
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 내용 입력 값 처리
    const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value);
    };

  // 폼 제출 시 게시글 작성 요청
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !contents.trim()) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8082/api/boards/", 
                { 
                  title, 
                  contents,
                  email:user?.email
                },
              );

            alert("게시글 등록 성공");
            router.push("/"); // 메인 페이지로 이동
        } catch (error) {
            alert("게시글 등록 실패");
            console.error(error);
        }
    };

    if (!user) {
        return <div>로그인이 필요합니다.</div>
    }

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={handleTitleChange}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                    <textarea
                        name="contents"
                        placeholder="내용을 입력하세요"
                        value={contents}
                        onChange={handleContentsChange}
                        rows={10}
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                    <button type="submit">등록하기</button>
            </form>
        </div>
  );
};

export default PostWrite;
