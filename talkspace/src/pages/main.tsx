// pages/main.tsx (메인 페이지)
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function MainPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  // context 예외 처리
  if (!auth) {
    throw new Error("AuthContext is not provided");
  }

  const { user, logout } = auth;

  // 로그아웃 처리
  const handleLogout = () => {
    logout();            // context 초기화
    router.push("/login"); // 로그인 페이지로 이동
  };

  // 글쓰기 페이지 이동
  const goToWrite = () => {
    router.push("/postWrite");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{user ? `${user.name}님, 환영합니다!` : "로그인 정보 없음"}</h2>
      <button onClick={goToWrite}>글쓰기</button>
      <button onClick={handleLogout} style={{ marginLeft: "10px" }}>로그아웃</button>
    </div>
  );
}