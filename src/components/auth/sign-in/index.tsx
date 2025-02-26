"use client"
import { signIn, useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from "next/navigation";
import { usePathname } from 'next/navigation'
import { api } from "@/trpc/react";

export function SignIn({ hideTrigger = false }: { hideTrigger?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    if (isCalendarPage && status === "unauthenticated") {
      setIsOpen(true);
    }
  }, [isCalendarPage, status]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!hideTrigger && <>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Sign In</Button>
        </DialogTrigger></>}
      <DialogContent className="max-w-[400px]">
        <DialogTitle>Welcome back!</DialogTitle>
        <DialogDescription className="mt-[-10px]">
          You have been invited to RSVP for {calendarName}. Please sign in to continue.
        </DialogDescription>
        <form onSubmit={handleSubmit} >
          <div className="form-group mt-4 mb-8">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}