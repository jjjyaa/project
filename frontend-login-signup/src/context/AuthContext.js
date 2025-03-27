import { createContext, useState, useEffect } from "react";

// 1. Context 생성 (앱 전역에서 공유할 상태)
export const AuthContext = createContext();

// 2. Context Provider 컴포넌트 정의
export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    // 3. 새로고침 시 localStorage에서 로그인 정보 복원
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    // 4. 로그인 함수
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user',JSON.stringify(userData));
    };
    // 5. 로그아웃 함수
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    // 6. 하위 컴포넌트에서 사용할 수 있도록 value 전달
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}