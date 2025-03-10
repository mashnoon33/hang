import { VEvent } from "node-ical";
import { Resend } from "resend";
import { env } from "@/env";

import { format } from "date-fns";
import { Calendar } from "@/server/api/types";
import { RSVPEmail } from "@/emails/rsvp-confirmation";
const resend = new Resend(env.AUTH_RESEND_KEY);

export async function sendRsvpEmail(
    user: { name: string; email: string },
    event: { summary: string; start: Date; end: Date },
    calendar: Omit<Calendar, "icalUrl">,
    isReminder = false
) {
    const { name, email } = user;
    const { summary, start, end } = event;
    const { name: calendarName } = calendar;

    const subject = `RSVP ${isReminder ? "Reminder" : "Confirmation"} for ${summary}`;
    const react = RSVPEmail({ name, eventSummary: summary, eventStart: format(start, "MM/dd/yyyy hh:mm a"), eventEnd: format(end, "MM/dd/yyyy hh:mm a"), calendarName, calendarUrl: `https://${env.NEXT_DOMAIN}/calendar/${calendar.shortUrl}`, isReminder });

    const { data, error } = await resend.emails.send({
        from: env.AUTH_EMAIL_FROM,
        to: [email],
        cc: ["mashnoon33@gmail.com"],
        subject: subject,
        react: react,
    });

    if (error) {
        throw new Error("Resend error: " + error.message);
    }
}
