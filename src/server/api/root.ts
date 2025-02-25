import { postRouter } from "@/server/api/routers/post";
import { scheduleRouter } from "@/server/api/routers/schedule";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { rsvpRouter } from "./routers/rsvp";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  schedule: scheduleRouter,
  rsvp: rsvpRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
