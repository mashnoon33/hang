"use client"
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { SignIn } from "@/components/auth/sign-in";
import { UpdateProfile } from "@/components/auth/profile";
import { HeroUIProvider } from "@heroui/react";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} flex flex-col h-full`}>
      <body className="flex flex-col h-full ">
        <SessionProvider>
          <TRPCReactProvider><>
            <HeroUIProvider>
              <SignIn hideTrigger={true} />
              <UpdateProfile hideTrigger={true} />
              {children}
            </HeroUIProvider>
          </></TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
