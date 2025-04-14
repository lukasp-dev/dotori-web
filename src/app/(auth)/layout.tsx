import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Create Next App",
  description: "Login or Sign Up",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      {children}
    </div>
  );
}
