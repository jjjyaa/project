import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';


interface MainLayoutProps {
    children: React.ReactNode;
  }

  // 전체 페이지를 감싸는 래퍼
const Wrapper = styled.div`
display: flex; 
flex-direction: column;
min-height: 100vh;
`;

// 상단 고정 헤더
const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
padding: 1rem 2rem;
background-color: white;
border-bottom: 1px solid #e5e7eb;
position: sticky;
top: 0;
z-index: 1000;
`;

// 로고 영역
const LogoBox = styled.div`
display: flex;
align-items: center;
font-weight: bold;
font-size: 1.3rem;

img {
  width: 24px;
  height: 24px;
  margin-left: 8px;
}
`;

// 가운데 메뉴 영역
const Menu = styled.nav`
display: flex;
gap: 2rem;
font-weight: 500;
font-size: 0.95rem;

a {
  text-decoration: none;
  color: #333;

  &:hover {
    color: #4f46e5;
  }
}
`;

// 오른쪽 아이콘 영역
const IconBox = styled.div`
display: flex;
gap: 1.5rem;
font-size: 1.1rem;
color: #555;
cursor: pointer;

svg:hover {
  color: #4f46e5;
}
`;

// Hero 이미지 배너
const Hero = styled.section`
background-image: url("/a.jpg");
background-size: cover;
background-position: center;
height: 200px;
display: flex;
align-items: center;
justify-content: center;
color: white;
font-size: 2rem;
font-weight: bold;
text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
`;

// 메인 콘텐츠
const Main = styled.main`
flex: 1;
padding: 2rem;
`;

// 하단 고정 푸터
const Footer = styled.footer`
background-color: #f3f4f6;
color: #666;
text-align: center;
padding: 1rem;
margin-top: auto;
`;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
    <Wrapper>
    <Header>
      <LogoBox>
        Project
      </LogoBox>
      <Menu>
        <Link href="/">🏠 Home</Link>
        <Link href="/postList">📋 게시판</Link>
      </Menu>
    </Header>
    <Hero></Hero>
    <Main>{children}</Main>
    <Footer>© 2025 Project Team</Footer>
  </Wrapper>
    );
};

export default MainLayout;