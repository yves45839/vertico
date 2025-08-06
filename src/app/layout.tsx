import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VERTICO Construction",
  description: "Gros œuvre – Aménagement intérieur – Hydraulique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} bg-white text-blue-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
