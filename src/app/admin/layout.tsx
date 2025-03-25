"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex h-full flex-col">
      <body className="flex h-full flex-col">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-lg font-bold text-white">Admin Dashboard</div>
            <div>
              <Button
                className="bg-red-500 hover:bg-red-700"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
