"use client";
import "@mantine/core/styles.css";
import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import {MantineProvider} from "@mantine/core";
import theme from "@/app/theme";
import {AuthProvider} from "@/context/AuthContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${inter.variable}`}>
      <title>Digital Remains</title>
      <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
              <AuthProvider>
                  {children}
              </AuthProvider>
          </MantineProvider>
      </QueryClientProvider>
      </body>
      </html>
  );
}
