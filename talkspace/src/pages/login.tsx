// pages/login.tsx (로그인 페이지)
import { useRouter } from "next/navigation";
import { useState, useContext, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import styled from "styled-components";

// 1. 타입 정의
interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  // 2. context 없을 경우 예외 처리
  if (!auth) {
    throw new Error("AuthContext is not provided");
  }

  const { login } = auth;

  // 3. 상태 초기화
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  // 4. 입력값 처리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 5. 로그인 요청
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8082/api/members/login", form);
      alert("로그인 성공");
      login(res.data);
      router.push("/main");
    } catch (err) {
      alert("로그인 실패");
      console.error(err);
    }
  };

  // 6. 렌더링
  return (
    <Layout>
    <Container>
    <LoginBox>
      <Title> 로그인</Title>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <hr />
        <Button type="submit">로그인</Button>
      </form>
    </LoginBox>
    </Container>
    </Layout>
  );
}

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const LoginBox = styled.div`
  width: 350px;
  padding: 4rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 90%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
  }
`;