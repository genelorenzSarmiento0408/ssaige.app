import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import UserProfile from "@/components/user-profile";

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
  description: "Transform your study materials with AI-powered tools",
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
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg text-purple-700">
                  SSAIGE
                </span>
              </Link>

              <nav className="hidden sm:flex items-center gap-4 ml-6">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-purple-600"
                >
                  Dashboard
                </Link>
                <Link
                  href="/features"
                  className="text-gray-700 hover:text-purple-600"
                >
                  Features
                </Link>
                <Link
                  href="/multiplayer"
                  className="text-gray-700 hover:text-purple-600"
                >
                  Multiplayer
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-700 hover:text-purple-600"
                >
                  Pricing
                </Link>
              </nav>
            </div>

            <UserProfile />
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
