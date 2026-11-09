
import AuthGuard from "@/components/AuthGuard";
import AppLayout from "@/components/AppLayout";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amina",
  description: "Sistema de gestión para pymes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen">

    <Suspense fallback={<div>Cargando...</div>}>

  <AuthGuard>

    <AppLayout>
      {children}
    </AppLayout>

  </AuthGuard>

</Suspense>

        </body>
    </html>
  );
}