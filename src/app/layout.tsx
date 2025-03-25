"use client";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { UpdateProfile } from "@/components/modals/auth/profile";
import { SignIn } from "@/components/modals/auth/sign-in";
import { TRPCReactProvider } from "@/trpc/react";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} flex h-full flex-col`}>
      <body className="flex h-full flex-col">
        <SessionProvider>
          <TRPCReactProvider>
            <>
              <HeroUIProvider>
                <Analytics />
                <SignIn
                  open={false}
                  onOpenChange={() => {
                    console.log("open");
                  }}
                />
                <UpdateProfile />
                {children}
              </HeroUIProvider>
            </>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
