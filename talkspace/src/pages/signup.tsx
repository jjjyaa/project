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
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
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
    </div>
    </SignupBox>
    </Container>
  );
}

// 스타일
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const SignupBox = styled.div`
  width: 400px;
  padding: 2rem;
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

