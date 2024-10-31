import React from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "@/lib/providers";
import { auth } from "@/lib/auth";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar/Navbar";
//import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
//import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Footer from "@/components/Footer/Footer";

// Default fonts - need to be changed to use SCU fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Zenior",
  description: "Zenior - SCU Senior Project Management",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider session={session}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
