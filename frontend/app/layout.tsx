import type { Metadata } from "next";
import { Poppins, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { loadUserFromStorage } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { Navbar } from "@/components/Navbar";
import Footer from "../components/Footer";
import { BreadcrumbSeperator } from "@/components/common/Breadcrumb";

const sora = Sora({
  variable: "--display-font",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--body-font",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FYUG",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${poppins.variable}`}
    >
      <body className="md:min-h-[800px] min-h-full font-display">
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <Toaster />
            {/* <div className="mt-8 sm:w-[75%] w-[90%] m-auto pb-6 ">
              <BreadcrumbSeperator />
            </div> */}
            <div className="content-container">{children}</div>
            <div className="">
              <Footer />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
