"use client";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export function UpdateProfile() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const { mutate: updateProfile } = api.user.updateProfile.useMutation({
    onSuccess: () => {
      setOpen(false);
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, bio });
  };

  useEffect(() => {
    if (status === "authenticated" && !session?.user.name) {
      setOpen(true);
    }
  }, [status, session?.user.name]);

  return (
    <Modal isOpen={open}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2>Update Profile</h2>
          <p className="text-sm text-gray-500">
            Please update the following information to continue.
          </p>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-8 mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="bio">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="I am a software engineer..."
                  value={bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setBio(e.target.value)
                  }
                />
              </div>
            </div>
            <ModalFooter>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
