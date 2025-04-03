import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// 메인 페이지
function Main() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/login');
    };

    const goToWrite = () => {
      navigate("/write")
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>{user ? `${user.name}님, 환영합니다! 🎉` : '로그인 정보 없음'}</h2>
        <button onClick={goToWrite}>글쓰기</button>
        <button onClick={handleLogout} style={{marginLeft:"10px"}}>로그아웃</button>
      </div>
    );
}

export default Main;