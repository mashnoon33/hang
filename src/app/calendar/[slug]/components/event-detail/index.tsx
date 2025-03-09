import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCalendar } from "../CalendarProvider";
import { MarkdownRenderer } from "../side-drawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Pencil, UserCircleIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import CreateCalendarModal from "@/components/modals/create-calendar";
export function TopNav() {
  const { data: session } = useSession();
  const [showEditCalendar, setShowEditCalendar] = useState(false);
  const { calendar } = useCalendar();
  const isOwner = useMemo(() => session?.user?.id === calendar?.userId, [session, calendar]);
  return (
    <div className="flex flex-row justify-between items-center h-16 px-4 py-2 bg-gradient-to-t from-transparent to-red-50  ">
      <h1 className="text-xl text-red-800 font-bold">Hang</h1>
      <div className="flex flex-row gap-2">
        {isOwner && <Button variant="ghost" className="hover:bg-red-200" onClick={() => setShowEditCalendar(true)}>
          <Pencil className="w-8 h-8 font-bold text-red-800" />
        </Button>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="hover:bg-red-200">
              <UserCircleIcon className="w-8 h-8 font-bold text-red-800" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[200px]">
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex flex-row gap-2 items-center hover:bg-transparent">
                <Avatar>
                  <AvatarFallback>
                    {session?.user?.name?.split(" ").map(name => name.charAt(0).toUpperCase()).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-xs font-medium">{session?.user?.name}</p>
                  <p className="text-xs text-gray-500">{session?.user?.email}</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>Logout</DropdownMenuItem>
              <DropdownMenuItem disabled={true}>My Profile</DropdownMenuItem>
              <DropdownMenuItem disabled={true}>My Events</DropdownMenuItem>
              <DropdownMenuItem disabled={true}>My Calendar</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {showEditCalendar && calendar && <CreateCalendarModal open={showEditCalendar} onOpenChange={setShowEditCalendar} onSave={() => setShowEditCalendar(false)} calendarData={{ ...calendar}} />}
    </div>
  );
}

export function EventDetail({ setShowEventDetail }: { setShowEventDetail?: (show: boolean) => void }) {
  return (
    <div className="flex w-full flex-col h-full ">
      <TopNav />
      <EventDetailIsolate />
    </div>
  );
}

export function EventDetailIsolate() {
  const { calendar } = useCalendar();
  return (
    <div className="p-4">
      {!calendar ? (
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-12 bg-gray-300 rounded"></div>
          <div className="h-80 bg-gray-300 rounded mb-4"></div>
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>

        </div>
      ) : (
        <div className="mb-20">
          <div className="text-4xl mb-4 font-bold">{calendar.name}</div>
          <MarkdownRenderer markdown={calendar.description ?? ""} />
        </div>
      )}

    </div>
  );
}