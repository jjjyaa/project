import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/layout/mainlayout";

function AppLoader({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) return <div>로딩 중...</div>;

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AuthProvider>
        <MainLayout>
          <AppLoader>
            <Component {...pageProps} />
          </AppLoader>
        </MainLayout>
      </AuthProvider>
    </div>      
  )
}
