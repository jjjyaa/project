import React from "react";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useState({
        email:'',
        password: '',
        name:'',
        phone:'',
        address:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
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
            <h2> 회원가입 </h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="이메일" onChange={handleChange} /><br />
                <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} /><br />
                <input name="name" placeholder="이름" onChange={handleChange} /><br />
                <input name="phone" placeholder="전화번호" onChange={handleChange} /><br />
                <input name="address" placeholder="주소" onChange={handleChange} /><br />
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default Signup;