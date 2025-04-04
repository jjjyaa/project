import React, { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

// 로그인 페이지
function Login() {
    
    const navigate = useNavigate(); // 페이지 이동

    const { login } = useContext(AuthContext); // context에서 login 함수 가져오기

    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/api/members/login', loginData);
            alert('로그인 성공');
            const userData = response.data; // 서버로 받은 사용자 정보
            login(userData); // 저장
            
            navigate('/main'); // 메인페이지 이동
        } catch (error) {
            alert('로그인 실패');
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <h2> 로그인 </h2>
            <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="이메일" onChange={handleChange} /><br />
            <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} /><br />
            <button type="submit">로그인</button>
            </form>
        </div>
    )
}

export default Login;