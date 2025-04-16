import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/layout/mainlayout";

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/GlobalStyle'
import { theme } from '../styles/theme'

function AppLoader({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) return <div>로딩 중...</div>;

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthProvider>
    </ThemeProvider>
  )
}
