"use client"
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { format } from 'date-fns';
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from 'react';

export function UpdateProfile({ hideTrigger = false }: { hideTrigger?: boolean }) {
    const { data: session, status } = useSession();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date>();
    const { mutate: updateProfile } = api.user.updateProfile.useMutation();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ name, bio, dateOfBirth: dateOfBirth?.toISOString() ?? '' });
    };

    return (
        <Dialog open={status === "authenticated" && !session?.user.name}>
            {!hideTrigger && <>
                <DialogTrigger asChild>
                    <Button>Edit Profile</Button>
                </DialogTrigger></>}
            <DialogContent className="max-w-[400px]">
                <DialogTitle>Update Profile</DialogTitle>
                <DialogDescription className="mt-[-10px]">
                    Plase update the following information to continue.
                </DialogDescription>
                <form onSubmit={handleSubmit} >
                    <div className="form-group mt-4 mb-8 space-y-4">
                        <div>
                            <label className="text-sm font-medium" htmlFor="name">Name</label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium"  htmlFor="bio">Bio</label>
                            <Textarea
                                id="bio"
                                name="bio"
                                placeholder="I am a software engineer..."
                                value={bio}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium" htmlFor="dateOfBirth">Date of Birth</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !dateOfBirth && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dateOfBirth}
                                        onSelect={setDateOfBirth}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="submit" className="w-full">
                            Save Changes
                        </Button>          </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}