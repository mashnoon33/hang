import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { calendars } from "@/server/db/schema";
import ical from "node-ical";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { organizeEventsByDate } from "../../../lib/ical";

export const scheduleRouter = createTRPCRouter({
    getCalendar: publicProcedure.input(z.object({
        identifier: z.string(),
    })).query(async ({ ctx, input }) => {
        const calendar = await ctx.db.query.calendars.findFirst({
            where: eq(calendars.shortUrl, input.identifier),
        }) ?? await ctx.db.query.calendars.findFirst({
            where: eq(calendars.id, parseInt(input.identifier)),
        });

        if (!calendar) {
            throw new Error("Calendar not found");
        }

        const data = await ical.async.fromURL(calendar.icalUrl);
        // omit icalUrl from response
        const { icalUrl, ...calendarWithoutIcalUrl } = calendar;
        return { ...calendarWithoutIcalUrl, events: organizeEventsByDate(data) };
    }),
    checkShortUrl: publicProcedure.input(z.object({
        shortUrl: z.string(),
    })).query(async ({ ctx, input }) => {
        const data = await ctx.db.query.calendars.findFirst({
            where: eq(calendars.shortUrl, input.shortUrl),
        });
        return data ? true : false;
    }),
    createCalendar: publicProcedure.input(z.object({
        name: z.string().min(1),
        description: z.string(),
        icalUrl: z.string(),
        shortUrl: z.string().optional(),
    })).mutation(async ({ ctx, input }) => {
      const shortUrl = input.shortUrl ?? crypto.randomUUID();
       await ctx.db.insert(calendars).values({
            name: input.name,
            description: input.description,
            icalUrl: input.icalUrl,
            shortUrl: input.shortUrl ?? crypto.randomUUID(),
            userId: ctx.session!.user.id
        });
        return shortUrl;
    })
});


