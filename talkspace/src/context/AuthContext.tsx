import React, { useState, useContext, ReactNode, createContext, useEffect } from 'react';

// 사용자 정보 타입 정의
type User = {
  email: string;
  name: string;
};

// Context 값의 타입 정의
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Context 생성 (기본값을 설정하여 undefined를 방지)
export const AuthContext = createContext<AuthContextType | null>(null); // 초기값을 null로 설정

// Context Provider 컴포넌트 정의
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // 새로고침 시 localStorage에서 로그인 정보 복원
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 로그인 함수
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // 하위 컴포넌트에서 사용할 수 있도록 value 전달
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 컴포넌트 내에서 AuthContext 사용 예시
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) { // context가 null일 때 에러를 던지도록 변경
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
