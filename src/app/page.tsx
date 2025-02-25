"use client";


import { Button } from "@/components/ui/button"
import CreateCalendarModal from "@/components/modals/create-calendar"
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { SignIn } from "@/components/auth/sign-in";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openCreateCalendarModal, setOpenCreateCalendarModal] = useState(false);
  const handleSave = (shortUrl: string) => {
    router.push(`/calendar/${shortUrl}`);
  };

  const handleSignIn = () => {
    setOpenSignInModal(true);
  };

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-red-100 to-white px-4 py-16 text-center">
      <div className="max-w-3xl">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to Hang
        </h1>
        <p className="mb-8  text-gray-600">
          Hang is an appointment scheduling platform for social situations, similar to a combination of Calendly and Partiful.
          <span className="italic"> It is very much a work in progress. Most functionality is not yet implemented.</span>
        </p>
        <div className="flex justify-center gap-4">
          {status === "authenticated" && <CreateCalendarModal open={openCreateCalendarModal} onOpenChange={setOpenCreateCalendarModal} onSave={handleSave} />}
          {status === "authenticated" && <Button onClick={() => signOut()}>Sign Out</Button>}
          {status === "unauthenticated" && <Button onClick={handleSignIn}>Sign In</Button>}
          {status === "unauthenticated" && <SignIn open={openSignInModal} onOpenChange={setOpenSignInModal} />}
          {status === "authenticated" && <Button onClick={() => setOpenCreateCalendarModal(true)}>Create Calendar</Button>}
          {status === "authenticated" && <CreateCalendarModal open={openCreateCalendarModal} onOpenChange={setOpenCreateCalendarModal} onSave={handleSave} />}

        </div>
      </div>
    </main>
  )
}

