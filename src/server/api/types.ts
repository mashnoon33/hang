import { calendars, rsvps } from "@/server/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Calendar = InferSelectModel<typeof calendars>;
export type Rsvp = InferSelectModel<typeof rsvps>;

