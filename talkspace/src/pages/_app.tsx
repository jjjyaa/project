import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/layout/mainlayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AuthProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      </AuthProvider>
    </div>      
  )
}
