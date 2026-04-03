import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SurakshaAI Command Center",
  description: "Real-time threat monitoring and infrastructure health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased font-sans`}>
      <body className="min-h-screen flex flex-col m-0 overflow-hidden bg-slate-100 text-slate-900 border-border">
        {children}
      </body>
    </html>
  );
}
