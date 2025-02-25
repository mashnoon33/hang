import { VEvent } from "node-ical";
import { Resend } from "resend";
import { env } from "@/env";
import { Calendar } from "@/server/api/types";

const resend = new Resend(env.AUTH_RESEND_KEY);

// export async function sendRsvpEmail(user: {name: string, email: string}, event: VEvent, calendar: Calendar) {

// }