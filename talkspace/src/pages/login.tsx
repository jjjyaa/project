import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// 로그인 페이지
function Login() {
  const { login } = useAuth(); // custom hook을 사용하여 AuthContext에 접근
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // 입력 값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 시 로그인 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/members/login', loginData);
      alert('로그인 성공');
      const userData = response.data; // 서버에서 받은 사용자 정보
      login(userData); // 로그인 정보 저장
      router.push('/'); // 메인 페이지로 이동
    } catch (error) {
      alert('로그인 실패');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          onChange={handleChange}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
