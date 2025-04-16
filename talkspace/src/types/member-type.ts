import { ReactNode } from "react";

// 타입 정의
export interface LoginForm {
    email: string;
    password: string;
}

// 회원가입 폼 타입 정의
export interface SignupForm {
    email: string;
    password: string;
    name: string;
    phone: string;
    address: string;
}
// 사용자 정보 타입 정의
export type User = {
  email: string;
  name: string;
  
  phone?: string;
  address?: string;
};
// Context Provider 컴포넌트 정의
export interface AuthProviderProps {
  children: ReactNode;
}

// Context 값의 타입 정의
export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}