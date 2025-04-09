// pages/main.tsx (메인 페이지)
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

import Layout from "@/components/Layout";
import styled from "styled-components";



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
    <Layout>
    <Wrapper>
      <Welcome>
        {user ? `${user.name}님, 환영합니다!` : "로그인 정보 없음"}
      </Welcome>
      <ButtonGroup>
      <Button onClick={goToWrite}>글쓰기</Button>
      <Button onClick={handleLogout} style={{ marginLeft: "10px" }}>로그아웃</Button>
      </ButtonGroup>
    </Wrapper>
    </Layout>
  );
}

// 스타일 정의
const Wrapper = styled.div`
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
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