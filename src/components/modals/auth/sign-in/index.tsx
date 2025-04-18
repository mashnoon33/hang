"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { signIn, useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

export function SignIn({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const { status } = useSession();
  const { slug } = useParams();
  const pathname = usePathname();

  const isCalendarPage = useMemo(() => {
    return !!(pathname.includes("/calendar") && slug);
  }, [pathname, slug]);

  const { data: calendarName } = api.schedule.getCalendarMetadata.useQuery(
    {
      identifier: slug as string,
    },
    {
      enabled: isCalendarPage && status === "unauthenticated",
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("resend", { email });
  };

  return (
    <Modal
      isOpen={open || (isCalendarPage && status === "unauthenticated")}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2>Welcome!</h2>
          <p className="text-sm font-normal text-gray-500">
            {calendarName?.name ? (
              <>
                You have been invited to RSVP for{" "}
                <strong>{calendarName.name}</strong>. Please sign in to
                continue.
              </>
            ) : (
              "Please sign in to continue."
            )}
          </p>
        </ModalHeader>

        <ModalBody className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <GoogleLoginButton onClick={() => signIn("google")} />
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export function GoogleLoginButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="currentColor"
        />
      </svg>
      Login with Google
    </Button>
  );
}
