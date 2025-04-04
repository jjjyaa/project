import React, { useState } from "react";
import axios from "axios";

// 회원가입 페이지

// 폼 데이터 타입 정의
interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
}

function Signup() {
  // 상태의 타입을 FormData로 정의
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  });

  // 입력 값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 폼 제출 시 회원가입 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/members/signup', formData);
      alert('회원 가입 완료');
      console.log(response.data);
    } catch (error) {
      alert('회원 가입 실패');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
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
        <input
          name="name"
          placeholder="이름"
          onChange={handleChange}
        />
        <br />
        <input
          name="phone"
          placeholder="전화번호"
          onChange={handleChange}
        />
        <br />
        <input
          name="address"
          placeholder="주소"
          onChange={handleChange}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
