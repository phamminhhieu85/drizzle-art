import Header from "@/components/layout/header";

import "./globals.css";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "react-hot-toast";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Drizzle Art",
  description: "Artwork sharing platform with Drizzle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <Toaster />
          <div className="max-w-7xl container">
            <Header />
            <main className="px-5 py-10">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
