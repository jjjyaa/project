import React from "react";
import { useState } from "react";
import axios from "axios";


// 회원가입 페이지
function Signup() {
    const [form, setForm] = useState({
        email:'',
        password: '',
        name:'',
        phone:'',
        address:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/api/members/signup', form);
            alert('회원 가입 완료');
            console.log(response.data);
        } catch (error) {
            alert('회원 가입 실패',error);
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <h2> 회원가입 </h2>
            <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="이메일" onChange={handleChange} /><br />
            <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} /><br />
            <input type="text" name="name" placeholder="이름" onChange={handleChange} /><br />
            <input type="text" name="phone" placeholder="전화번호" onChange={handleChange} /><br />
            <input type="text" name="address" placeholder="주소" onChange={handleChange} /><br />
            <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default Signup;