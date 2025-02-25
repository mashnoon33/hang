"use client";

import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import CreateCalendarModal from "@/components/modals/create-calendar"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SignIn } from "@/components/auth/sign-in";
import Link from "next/link";


export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSave = (shortUrl: string) => {
    router.push(`/calendar/${shortUrl}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-100 to-white px-4 py-16 text-center">
      <div className="max-w-3xl">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to Hang
        </h1>
        <p className="mb-8  text-gray-600">
          Hang is an appointment scheduling platform for social situations, similar to a combination of Calendly and Partiful.
          <span className="italic"> It is very much a work in progress. Most functionality is not yet implemented.</span>
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/calendar">
            <Button className="bg-black hover:bg-slate-800">
              Open Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button></Link>
          {session ? <CreateCalendarModal onSave={handleSave} /> : <SignIn />}

        </div>
      </div>

    </main>
  )
}

