import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CheckSession from "./components/auth/CheckSession";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto-part-Xchange",
  description: "Auto-part-Xchange website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          
        />
        <CheckSession /> {/* <-- session checker */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
      if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
      }
    `,
          }}
        /> */}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  `}
        </Script>
        {children}
      </body>
    </html>
  );
}
