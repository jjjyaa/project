// pages/signup.tsx (회원가입 페이지)
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// 1. 회원가입 폼 타입 정의
interface SignupForm {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
}

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
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="이메일" onChange={handleChange} /><br />
        <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} /><br />
        <input type="text" name="name" placeholder="이름" onChange={handleChange} /><br />
        <input type="text" name="phone" placeholder="전화번호" onChange={handleChange} /><br />
        <input type="text" name="address" placeholder="주소" onChange={handleChange} /><br />
        <hr/>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
