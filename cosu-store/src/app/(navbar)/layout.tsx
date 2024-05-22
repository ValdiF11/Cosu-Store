import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cosu Store",
  description: "Best cosplay costume in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-pink-50 flex flex-col items-center min-h-dvh shadow-xl">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
