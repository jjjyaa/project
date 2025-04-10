import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import styled from "styled-components";

export default function Home() {
  const router = useRouter();
  const { user , logout } = useAuth();

  // 로그아웃 처리
  const handleLogout = () => {
    logout();            // context 초기화
    router.push("/login"); // 로그인 페이지로 이동
  };

  // 글쓰기 페이지 이동
  const handleListOrSignup = () => {
    if (user) {
      router.push("/postList"); // 로그인 상태면 게시판으로
    } else {
      router.push("/signup"); // 비로그인 상태면 회원가입 페이지로
    }
  };

  return (
    <Wrapper>
      <Welcome>
        {user ? `${user.name}님, 환영합니다!` : "로그인 후 글쓰기가 가능합니다"}
      </Welcome>
      <ButtonGroup>
      <Button onClick={handleListOrSignup}>{user ? "게시판" : "회원가입"}</Button>
      <Button onClick={handleLogout} style={{ marginLeft: "10px" }}>{user ? "로그아웃" : "로그인"}</Button>
      </ButtonGroup>
    </Wrapper>
  );
}

// 스타일 정의
const Wrapper = styled.div`
  max-width: 400px;
  margin: 100px auto;
  text-align: center;
  background-color: #fff7ed;
`;
const Welcome = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding-bottom:5px;
`;

const Button = styled.button<{ variant?: "primary" | "gray" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  background-color: ${(props) =>
    props.variant === "gray" ? "#e5e7eb" : "#4f46e5"};
  color: ${(props) => (props.variant === "gray" ? "#333" : "#fff")};

  &:hover {
    background-color: ${(props) =>
      props.variant === "gray" ? "#d1d5db" : "#4338ca"};
  }
`;