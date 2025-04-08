// pages/login.tsx (로그인 페이지)
import { useRouter } from "next/navigation";
import { useState, useContext, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

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
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          onChange={handleChange}
        /><br />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={handleChange}
        /><br />
        <hr />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
