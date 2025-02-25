CREATE TABLE IF NOT EXISTS "hang_calendar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"ical_url" varchar(255) NOT NULL,
	"short_url" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hang_calendar" ADD CONSTRAINT "hang_calendar_user_id_hang_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."hang_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calendar_user_id_idx" ON "hang_calendar" USING btree ("user_id");