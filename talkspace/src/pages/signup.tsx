// pages/signup.tsx (회원가입 페이지)
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styled from "styled-components";
import { SignupForm } from "@/types/member-type";

export default function SignupPage() {
  const router = useRouter();

  // 2. 상태값 선언
  const [form, setForm] = useState<SignupForm>({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  });

  // 3. 입력값 처리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 4. 회원가입 요청
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8082/api/members/signup", form);
      alert("회원가입 성공!");
      router.push("/login");
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert(error.response.data);
      } else {
        alert("회원 가입 중 오류 발생");
        console.error(error);
      }
    }
  };

  // 5. JSX 출력
  return (
      <Container>
      <SignupBox>
      <Title>회원가입</Title>
      <form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="이메일" onChange={handleChange} /><br />
        <Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} /><br />
        <Input type="text" name="name" placeholder="이름" onChange={handleChange} /><br />
        <Input type="text" name="phone" placeholder="전화번호" onChange={handleChange} /><br />
        <Input type="text" name="address" placeholder="주소" onChange={handleChange} /><br />
        <hr/>
        <Button type="submit">가입하기</Button>
      </form>
    </SignupBox>
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

const SignupBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  margin-bottom: 2rem;
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
  margin-top: 1rem;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fbbf24;
  }
`;