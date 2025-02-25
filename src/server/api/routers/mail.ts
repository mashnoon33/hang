import {
    createTRPCRouter,
    publicProcedure
} from "@/server/api/trpc";
import { calendars } from "@/server/db/schema";

import { sendRsvpEmail } from "@/lib/resend/rsvp";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const mailRouter = createTRPCRouter({
    sendRsvpEmail: publicProcedure.input(z.object({
        event: z.object({
            name: z.string(),
            start: z.date(),
            end: z.date(),
        }),
        calendarId: z.number(),
        user: z.object({
            name: z.string(),
            email: z.string(),
        }),
    })).mutation(async ({ ctx, input }) => {
        const { event, calendarId, user } = input;
        console.log("Sending email");
        console.log(input)

        const calendar = await ctx.db.query.calendars.findFirst({
            where: eq(calendars.id, calendarId),
        });

        if (!calendar) {
            throw new Error("Calendar not found");
        }

        const eventProps = {
            summary: event.name,
            start: event.start,
            end: event.end,
            // Assuming other necessary VEvent properties are set here
        };

        await sendRsvpEmail(user, eventProps, calendar);
    }),
});
