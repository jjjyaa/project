// pages/login.tsx (로그인 페이지)
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import styled from "styled-components";
import { LoginForm } from "@/types/member-type";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth()

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
      router.push("/");
    } catch (err) {
      alert("로그인 실패");
      console.error(err);
    }
  };

  // 6. 렌더링
  return (
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
        <Button type="button" onClick={() => router.push("/signup")}> 회원가입 </Button>
      </form>
      
    </LoginBox>
    </Container>
  );
}

// 스타일
const Container = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px #fef3c7;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  border: none;
  margin-top : 1rem;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fbbf24;
  }
`;