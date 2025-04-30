import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./_contexts/ClientProvider";
import React from "react";
import { Toaster } from "sonner";
import { AuthContextProvider } from "./_contexts/auth";
import { ThemeProvider } from "./_contexts/ThemeProvider";

const inter = Inter({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Simple Finance",
  description: "FSC - Labs - Simple Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} dark`} cz-shortcut-listen="false">
        <ClientProvider>
          <AuthContextProvider>
            <ThemeProvider>
              <Toaster />
              <div
                className="max-w-[440px] p-[30px]"
                style={{ margin: "0 auto" }}
              >
                {children}
              </div>
            </ThemeProvider>
          </AuthContextProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
