import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SSAIGE - AI-Powered Learning",
  description:
    "Transform your study materials into powerful learning tools with AI. Generate flashcards, quizzes, notes, and get AI tutoring assistance.",
  keywords: [
    "AI learning",
    "study tools",
    "flashcards",
    "quizzes",
    "education",
    "AI tutor",
  ],
  authors: [{ name: "SSAIGE Team" }],
  metadataBase: new URL("https://www.ssaige.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ssaige.app",
    title: "SSAIGE - AI-Powered Learning",
    description:
      "Transform your study materials into powerful learning tools with AI. Generate flashcards, quizzes, notes, and get AI tutoring assistance.",
    siteName: "SSAIGE",
    images: [
      {
        url: "/app_preview.png",
        width: 1200,
        height: 630,
        alt: "SSAIGE - AI-Powered Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SSAIGE - AI-Powered Learning",
    description:
      "Transform your study materials into powerful learning tools with AI. Generate flashcards, quizzes, notes, and get AI tutoring assistance.",
    images: ["/app_preview.png"],
    creator: "@ssaige_app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
