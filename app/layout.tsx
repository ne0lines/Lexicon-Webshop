import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import Sidebar from './components/Sidebar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Webbutik Admin",
  description: "Admin panel for Webbutik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}