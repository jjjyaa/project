import React from "react";
import { userContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Main() {
    const { user } = userContext(AuthContext);

    return (
        <div>
        <h2>{user ? `${user.name}님, 환영합니다! 🎉` : '로그인 정보 없음'}</h2>
      </div>
    );
}

export default Main;