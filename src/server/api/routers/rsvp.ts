import { createTRPCRouter, cronProcedure, protectedProcedure } from "@/server/api/trpc";
import { calendars, rsvps, users } from "@/server/db/schema";
import { getCachedCalendarEvents } from "@/server/utils/get-cached-calendar-events";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { organizeEventsById } from "../../../lib/ical";

export const rsvpRouter = createTRPCRouter({
    getRsvp: protectedProcedure.query(async ({ ctx, input }) => {
        const rsvp = await ctx.db.query.rsvps.findFirst({
            where: eq(rsvps.userId, ctx.session.user.id),
        });
        if (!rsvp) {
            throw new Error("RSVP not found");
        }

        return rsvp;
    }),
    getAllRsvps: protectedProcedure.query(async ({ ctx, input }) => {
        const allRsvps = await ctx.db.query.rsvps.findMany({
            where: eq(rsvps.userId, ctx.session.user.id),
        });
        if (!allRsvps) {
            throw new Error("RSVP not found");
        }

        return allRsvps;
    }),
    
    getUpcomingRsvps: cronProcedure.input(z.object({
        start: z.string(),
        end: z.string(),
    })).query(async ({ ctx, input }) => {
        const allRsvps = await ctx.db.select().from(rsvps)
            .leftJoin(calendars, eq(rsvps.calendarId, calendars.id))
            .leftJoin(users, eq(rsvps.userId, users.id));

        const calendarEvents = await Promise.all(
            allRsvps.map(async (rsvp) => {
                if (!rsvp.calendar) {
                    return {};
                }
                const data = await getCachedCalendarEvents(ctx, rsvp.calendar);
                if (!data) {
                    return {};
                }
                return organizeEventsById(data);
            })
        ).then(eventsArray => {
            const combinedEvents = eventsArray.reduce((acc, events) => ({ ...acc, ...events }), {});
            return combinedEvents;
        });

        const rsvpsWithEvents = allRsvps.map((allRsvp) => ({
            calendar: allRsvp.calendar,
            event: calendarEvents[allRsvp.rsvp.eventId],
            rsvp: allRsvp.rsvp,
            user: allRsvp.user,
        }));

        const filteredRsvps = rsvpsWithEvents.filter((rsvp) => rsvp.event && rsvp.event.start > new Date(input.start) && rsvp.event.start < new Date(input.end));

        return filteredRsvps;
    }),

    getAllRsvpForAnEvent: protectedProcedure.input(z.object({
        eventId: z.string(),
    })).query(async ({ ctx, input }) => {
        const allRsvps = await ctx.db.query.rsvps.findMany({
            where: eq(rsvps.eventId, input.eventId),
        });

        if (!allRsvps) {
            throw new Error("RSVP not found");
        }

        const userIds = allRsvps.map((rsvp) => rsvp.userId);
        const users = await ctx.db.query.users.findMany({
            where: (users, { inArray }) => inArray(users.id, userIds),
        });

        return allRsvps.map((rsvp) => ({
            ...rsvp,
            user: users.find((user) => user.id === rsvp.userId),
        }));
    }),

    createRsvp: protectedProcedure.input(z.object({
        eventId: z.string(),
        units: z.number().optional(),
        calendarId: z.number(),
    })).mutation(async ({ ctx, input }) => {
        // TODO: validate eventId in the future when events live in the DB
        await ctx.db.insert(rsvps).values({
            eventId: input.eventId,
            units: input.units,
            userId: ctx.session.user.id,
            calendarId: input.calendarId,
        });
        return input;
    }),
    
    cancelRsvp: protectedProcedure.input(z.object({
        eventId: z.string(),
    })).mutation(async ({ ctx, input }) => {
        await ctx.db.delete(rsvps).where(eq(rsvps.eventId, input.eventId) && eq(rsvps.userId, ctx.session.user.id));
        return input;
    }),
});
