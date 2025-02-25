CREATE TABLE IF NOT EXISTS "hang_rsvp" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hang_rsvp_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"eventId" varchar(255) NOT NULL,
	"createdOn" timestamp DEFAULT now() NOT NULL,
	"updatedOn" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"units" integer DEFAULT 1
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hang_rsvp" ADD CONSTRAINT "hang_rsvp_user_id_hang_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."hang_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
