import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { rsvps } from "@/server/db/schema";

import { eq } from "drizzle-orm";
import { z } from "zod";


// ctx.session!.user.id
export const rsvpRouter = createTRPCRouter({
    getRsvp: protectedProcedure.query(async ({ ctx, input }) => {
        const rsvp = await ctx.db.query.rsvps.findFirst({
            where: eq(rsvps.userId, ctx.session.user.id),
        }) 
        if (!rsvp) {
            throw new Error("RSVP not found");
        }

        return rsvp;
    }),
    getAllRsvps: protectedProcedure.query(async ({ ctx, input }) => {
        const allRsvps = await ctx.db.query.rsvps.findMany({
            where: eq(rsvps.userId, ctx.session.user.id),
        }) 
        if (!allRsvps) {
            throw new Error("RSVP not found");
        }

        return allRsvps;
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

        const userIds = allRsvps.map(rsvp => rsvp.userId);
        const users = await ctx.db.query.users.findMany({
            where: (users, { inArray }) => inArray(users.id, userIds),
        });

        return allRsvps.map(rsvp => ({
            ...rsvp,
            user: users.find(user => user.id === rsvp.userId),
        }));
    }),
    createRsvp: protectedProcedure.input(z.object({
        eventId: z.string(),
        units: z.number().optional()
    })).mutation(async ({ ctx, input }) => {
        // TODO: validate eventId in the future when events live in the DB
        await ctx.db.insert(rsvps).values({
            eventId: input.eventId,
            units: input.units,
            userId: ctx.session.user.id
        });
        return input
    }),
    cancelRsvp: protectedProcedure.input(z.object({
        eventId: z.string(),
    })).mutation(async ({ ctx, input }) => {
        await ctx.db.delete(rsvps).where(eq(rsvps.eventId, input.eventId));
        return input
    })
});


