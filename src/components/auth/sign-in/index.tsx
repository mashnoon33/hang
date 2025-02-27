"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from "@/trpc/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { signIn, useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import React, { useMemo, useState } from 'react';

export function SignIn({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { status } = useSession();
  const { slug } = useParams();
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const isCalendarPage = useMemo(() => {
    return !!(pathname.includes("/calendar") && slug);
  }, [pathname, slug]);

  const { data: calendarName } = api.schedule.getCalendarName.useQuery({ identifier: slug as string }, { enabled: isCalendarPage && status === "unauthenticated" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("resend", { email });
  };


  return (
    <Modal isOpen={open || (isCalendarPage && status === "unauthenticated")} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2>Welcome back!</h2>
              <p className="text-sm text-gray-500">
                {calendarName ? `You have been invited to RSVP for ${calendarName}. Please sign in to continue.` : "Please sign in to continue."}
              </p>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-4 mb-8">
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    autoFocus={false}
                  />
                </div>
                <ModalFooter>
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}