import type { Metadata, ResolvingMetadata } from 'next';
import { CalendarClient } from './components/CalendarClient';
import { api } from '@/trpc/server';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Await the params to ensure they are ready to use
    const { slug } = await Promise.resolve(params);

    // Get the calendar metadata using the server-side API
    const calendarData = await api.schedule.getCalendarMetadata({ identifier: slug });

    // Get the parent metadata
    const previousImages = (await parent).openGraph?.images ?? [];
    const calendarName = calendarData.name ?? 'Calendar';
    const calendarImage = calendarData.image ? [{ url: calendarData.image }] : [];
    const description = calendarData.shortDescription ?? `You have been invited to RSVP. Please let us know if you can attend.`;
    return {
      title: calendarName,
      description,
      openGraph: {
        title: calendarName,
        description,
        images: [...previousImages, ...calendarImage],
      },
    };
  } catch (error) {
    console.error('Failed to fetch calendar metadata:', error);
    // Fallback metadata if the API call fails
    return {
      title: 'Calendar',
      description: 'View and manage your calendar events',
      openGraph: {
        title: 'Calendar',
        description: 'View and manage your calendar events',
        images: (await parent).openGraph?.images ?? [],
      },
    };
  }
}

export default async function CalendarPage() {
  return <CalendarClient />;
}