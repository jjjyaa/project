import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// 회원가입 페이지
function Signup() {
    const [form, setForm] = useState({
        email:'',
        password: '',
        name:'',
        phone:'',
        address:''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log("보낼 데이터 ", form);
          const response = await axios.post(
            "http://localhost:8082/api/members/signup",
            form);
          alert("회원가입 성공!");
          navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert(error.response.data);
            } else {
                alert("회원 가입중 오류 발생");
            }
        }
      };
    
      return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <h2>회원가입</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="이메일" onChange={handleChange} /><br />
            <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} /><br />
            <input type="text" name="name" placeholder="이름" onChange={handleChange} /><br />
            <input type="text" name="phone" placeholder="전화번호" onChange={handleChange} /><br />
            <input type="text" name="address" placeholder="주소" onChange={handleChange} /><br />
            <button type="submit">가입하기</button>
          </form>
        </div>
      );
    }

export default Signup;