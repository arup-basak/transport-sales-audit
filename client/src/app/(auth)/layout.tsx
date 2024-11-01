import type { Metadata } from "next";
import ToogleThemeButton from "@/components/ToogleThemeButton";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute top-4 right-4">
        <ToogleThemeButton />
      </div>
      <main className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
}