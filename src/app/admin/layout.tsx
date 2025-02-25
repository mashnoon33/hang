"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" className="flex flex-col h-full">
            <body className="flex flex-col h-full">
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="text-white text-lg font-bold">
                            Admin Dashboard
                        </div>
                        <div>
                            <Button className="bg-red-500 hover:bg-red-700" onClick={() => signOut()}>
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
