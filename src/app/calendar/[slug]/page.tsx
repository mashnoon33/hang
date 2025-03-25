import type { Metadata, ResolvingMetadata } from "next";
import { api } from "@/trpc/server";
import { CalendarView } from "@/components/calendar/calendar";


export async function generateMetadata(
  { params }: {
    params: Promise<{ slug: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const { slug } = await Promise.resolve(params);
    const data = await api.schedule.getCalendarMetadata({ identifier: slug });
    const images = (await parent).openGraph?.images ?? [];

    const metadata = {
      title: data.name ?? "Calendar",
      description: data.shortDescription ?? "You have been invited to RSVP.",
    };

    return {
      ...metadata,
      openGraph: {
        ...metadata,
        images: [...images, ...(data.image ? [{ url: data.image }] : [])],
      },
    };
  } catch {
    const fallback = {
      title: "Calendar",
      description: "View and manage your calendar events",
    };
    return {
      ...fallback,
      openGraph: {
        ...fallback,
        images: (await parent).openGraph?.images ?? [],
      },
    };
  }
}

export default async function CalendarPage() {
  return <CalendarView />;
}
