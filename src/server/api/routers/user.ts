import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    updateProfile: protectedProcedure.input(z.object({
        name: z.string(),
        bio: z.string(),
    })).mutation(async ({ ctx, input }) => {
        await ctx.db.update(users).set({
            name: input.name,
            bio: input.bio,
        }).where(eq(users.id, ctx.session.user.id));
        return input;
    })
});

export type UserRouter = typeof userRouter;