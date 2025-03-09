import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { calendars } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { organizeEventsByDate } from "../../../lib/ical";
import { getCachedCalendarEvents } from "@/server/utils/get-cached-calendar-events";


export const scheduleRouter = createTRPCRouter({
    getCalendar: protectedProcedure.input(z.object({
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

        const data = await getCachedCalendarEvents(ctx, calendar);
        if (!data) {
            throw new Error("Calendar not found");
        }

        // omit icalUrl from response
        const { icalUrl, ...calendarWithoutIcalUrl } = calendar;
        return {
            ...calendarWithoutIcalUrl,
            events: organizeEventsByDate(data),
        };
    }),

    getCalendarMetadata: publicProcedure.input(z.object({
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
        const extractFirstImageFromMarkdown = (markdown: string): string | null => {
            const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
            let match;
            while ((match = markdownImageRegex.exec(markdown)) !== null) {
                if (match[1]) {
                    return match[1];
                }
            }
            return null;
        };

        const firstImage = extractFirstImageFromMarkdown(calendar.description);

        return {
            image: firstImage,
            name: calendar.name,
            shortDescription: calendar.shortDescription,
        };

       
    }),

    checkShortUrl: protectedProcedure.input(z.object({
        shortUrl: z.string(),
    })).query(async ({ ctx, input }) => {
        const data = await ctx.db.query.calendars.findFirst({
            where: eq(calendars.shortUrl, input.shortUrl),
        });
        return data ? true : false;
    }),
    createCalendar: protectedProcedure.input(z.object({
        name: z.string().min(1),
        description: z.string(),
        shortDescription: z.string().optional(),
        icalUrl: z.string(),
        shortUrl: z.string().optional(),
    })).mutation(async ({ ctx, input }) => {
        const shortUrl = input.shortUrl ?? crypto.randomUUID();
        await ctx.db.insert(calendars).values({
            name: input.name,
            description: input.description,
            icalUrl: input.icalUrl,
            shortDescription: input.shortDescription,
            shortUrl: input.shortUrl ?? crypto.randomUUID(),
            userId: ctx.session.user.id,
        });
        return shortUrl;
    }),
    updateCalendar: protectedProcedure.input(z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string(),
        shortDescription: z.string().optional(),
        shortUrl: z.string().optional(),
    })).mutation(async ({ ctx, input }) => {
        const { id, name, description, shortDescription, shortUrl } = input;
        const { db } = ctx;
        const updatedCalendar = await db.update(calendars).set({
            name,
            description,
            shortDescription,
            shortUrl,
        }).where(eq(calendars.id, id)).returning();
        return updatedCalendar[0];
    }),
});
