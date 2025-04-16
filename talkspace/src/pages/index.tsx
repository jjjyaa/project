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
  max-width: 600px;
  margin: 3rem auto;
  padding: 2.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Welcome = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.4rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fbbf24;
  }
`;