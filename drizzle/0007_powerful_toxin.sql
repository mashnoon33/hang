ALTER TABLE "hang_rsvp" ADD COLUMN "calendar_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hang_rsvp" ADD CONSTRAINT "hang_rsvp_calendar_id_hang_calendar_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "public"."hang_calendar"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
