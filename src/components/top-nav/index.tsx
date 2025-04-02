import CreateCalendarModal from "@/components/modals/create-calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, UserCircleIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useCal } from "../calendar/calendar-provider";

export function TopNav() {
    const { data: session } = useSession();
    const [showEditCalendar, setShowEditCalendar] = useState(false);
    const { calendar } = useCal();
    const isOwner = useMemo(
      () => session?.user?.id === calendar?.userId,
      [session, calendar],
    );
    return (
      <div className="flex h-12 md:h-16 flex-row items-center justify-between bg-gradient-to-t from-transparent to-red-50 px-4 py-2">
        <h1 className="text-xl font-bold text-red-700" style={{ fontFamily: '"Arial Black", "Arial Bold", Gadget, sans-serif' }}>Hang</h1>
        <div className="flex flex-row gap-2">
          {isOwner && (
            <Button
              variant="ghost"
              className="hover:bg-red-200"
              onClick={() => setShowEditCalendar(true)}
            >
              <Pencil className="h-8 w-8 font-bold text-red-800" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="hover:bg-red-200">
                <UserCircleIcon className="h-8 w-8 font-bold text-red-800" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[200px]">
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex flex-row items-center gap-2 hover:bg-transparent">
                  <Avatar>
                    <AvatarFallback>
                      {session?.user?.name
                        ?.split(" ")
                        .map((name) => name.charAt(0).toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-xs font-medium">{session?.user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuItem>
  
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem disabled={true}>My Profile</DropdownMenuItem>
                <DropdownMenuItem disabled={true}>My Events</DropdownMenuItem>
                <DropdownMenuItem disabled={true}>My Calendar</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {showEditCalendar && calendar && (
          <CreateCalendarModal
            open={showEditCalendar}
            onOpenChange={setShowEditCalendar}
            onSave={() => setShowEditCalendar(false)}
            calendarData={{ ...calendar }}
          />
        )}
      </div>
    );
  }
  