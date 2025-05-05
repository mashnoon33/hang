"use client";

import { Button } from "@/components/ui/button";
import CreateCalendarModal from "@/components/modals/create-calendar";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { SignIn } from "@/components/modals/auth/sign-in";
import { useState } from "react";
import Link from "next/link";
import { Github, Mail } from "lucide-react";

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
        <h1 className="mb-6 text-[100px] font-bold tracking-tight text-gray-900 [filter:url(#wavy)] animate-wave">
          Hang
          <svg width="0" height="0">
            <filter id="wavy">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="9">
                <animate 
                  attributeName="baseFrequency"
                  values="0.005;0.01;0.015;0.01;0.005"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="20" />
            </filter>
          </svg>
        </h1>
        <p className="mb-8 text-gray-600">
          Hang is the modern social calendar of your dreams.
          <span className="italic">
            It is very much a work in progress. Usage of the platform is
            currently limited to invite-only.
          </span>
        </p>
        <div className="flex justify-center gap-4">
          {status === "authenticated" && (
            <CreateCalendarModal
              open={openCreateCalendarModal}
              onOpenChange={setOpenCreateCalendarModal}
              onSave={handleSave}
            />
          )}
          {/* {status === "authenticated" && (
            <Button onClick={() => signOut()}>Sign Out</Button>
          )}
          {status === "unauthenticated" && (
            <Button onClick={handleSignIn}>Sign In</Button>
          )}
          {status === "unauthenticated" && (
            <SignIn open={openSignInModal} onOpenChange={setOpenSignInModal} />
          )}
          {status === "authenticated" && (
            <Button onClick={() => setOpenCreateCalendarModal(true)}>
              Create Calendar
            </Button>
          )} */}
          <Link href="mailto:mashnoon33@gmail.com?subject=Hang%20Access%20Request&body=Hi%20there%2C%0A%0AI%20would%20like%20to%20request%20access%20to%20Hang.%0A%0ABest%2C" className="no-underline">
            <Button
              variant="outline"
              className="gap-2"
            >
              <Mail className="h-4 w-4" />
              Request Access
            </Button>
          </Link>
          <Link href="https://github.com/mashnoon33/hang" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </Link>
          {status === "authenticated" && (
            <CreateCalendarModal
              open={openCreateCalendarModal}
              onOpenChange={setOpenCreateCalendarModal}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </main>
  );
}
