import { auth, signOut } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { SignIn } from "@/components/auth/sign-in";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Schedule } from "./_components/schedule";
export default async function Home() {
  const session = await auth();
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black" >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded-full  px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
              <pre>{session && JSON.stringify(session, null, 2)}</pre>
              <Schedule />
            {session ? (
              <Link href="/api/auth/signout">
                <Button >Sign out</Button>
              </Link>
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
