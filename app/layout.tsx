import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-white text-blue-900 antialiased">
        {children}
      </body>
    </html>
  );
}
