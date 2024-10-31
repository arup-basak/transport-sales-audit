import type { Metadata } from "next";
import RootLayoutProvider from "@/provider/RootLayoutProvider";
import { Poppins as FontSans } from "next/font/google";
import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const mFont = FontSans({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Internal Sales Audit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mFont.className} antialiased bg-white dark:bg-black`}>
        <RootLayoutProvider>
          <NavBar />
          <Sidebar />
          {children}
        </RootLayoutProvider>
      </body>
    </html>
  );
}
