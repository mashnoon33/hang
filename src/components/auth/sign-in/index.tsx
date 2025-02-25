"use client"
import { signIn } from "next-auth/react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

export function SignIn() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("resend", { email });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Sign In</DialogTitle>
        <DialogDescription>
          Enter your email to sign in with Resend.
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-actions flex justify-between">
            <Button type="submit">Sign in with Resend</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}