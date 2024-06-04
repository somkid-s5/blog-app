import type { Metadata } from "next";


import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import ThemeProvider from "@/providers/ThemeProviders";
import SessionProvider from "@/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Project Blog App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ThemeProvider>
            <Navbar />
            <div className="container mx-auto  min-h-screen">{children}</div>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
