// layout/mainlayout.tsx

import { ReactNode } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {

  const { user, logout } = useAuth();

  return (
    <Container>
      <Header>
        <Logo><Link href="/">My Board</Link></Logo>
        <Nav>
          <StyledLink href="/postList">글 목록</StyledLink>
          <StyledLink href="/postWrite">글쓰기</StyledLink>
          {user ? (
            <>
              <StyledLink href="/memberEdit">정보수정</StyledLink>
              <LogoutButton onClick={logout}>로그아웃</LogoutButton>
            </>
          ) : (
            <StyledLink href="/login">로그인</StyledLink>
          )}
        </Nav>
      </Header>

      <Main>{children}</Main>

      <Footer>© 2025 MyBoard Project.</Footer>
    </Container>
  );
}

// styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.white}; 
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text}; 
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    text-decoration: underline;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 40px;
  background-color: #fdf6f0; /* 따뜻한 베이지 */
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.white}; 
  color: ${({ theme }) => theme.colors.text};             
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px;
  text-align: center;
  font-size: 0.85rem;
`;