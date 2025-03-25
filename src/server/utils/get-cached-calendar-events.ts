import ical from "node-ical";
import { createTRPCContext } from "../api/trpc";
import { Calendar } from "../api/types";

type ContextType = Awaited<ReturnType<typeof createTRPCContext>>;

const TTL = 1000 * 60 * 5; // 1 minutes
export async function getCachedCalendarEvents(ctx: ContextType, calendar: Calendar) {
    const cached = ctx.cache.get(calendar.icalUrl);
    const now = Date.now();

    if (!cached || cached.expiresAt < now) {
        const data = await ical.async.fromURL(calendar.icalUrl);
        const expiresAt = now + TTL;
        ctx.cache.set(calendar.icalUrl, {
            data,
            expiresAt
        });
        return data;
    }

    return cached.data;
}
