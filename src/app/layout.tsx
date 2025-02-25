"use client"
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { UpdateProfile } from "@/components/auth/profile";
import { SignIn } from "@/components/auth/sign-in";
import { TRPCReactProvider } from "@/trpc/react";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} flex flex-col h-full`}>
      <body className="flex flex-col h-full ">
        <SessionProvider>
          <TRPCReactProvider><>
            <HeroUIProvider>
              <SignIn open={false} onOpenChange={() => {
                console.log("open")
              }} />
              <UpdateProfile hideTrigger={true} />
              {children}
            </HeroUIProvider>
          </></TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}


