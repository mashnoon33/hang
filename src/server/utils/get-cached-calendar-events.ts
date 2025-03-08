import { createTRPCContext } from "../api/trpc";
import ical from "node-ical";
import { Calendar } from "../api/types";

type ContextType = Awaited<ReturnType<typeof createTRPCContext>>;

export async function getCachedCalendarEvents(ctx: ContextType, calendar: Calendar) {
    const data = ctx.cache.get(calendar.icalUrl);
    if (!data) {
        const data = await ical.async.fromURL(calendar.icalUrl);
        ctx.cache.set(calendar.icalUrl, data);
    }
    return data;
}
