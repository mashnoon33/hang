import { VEvent } from "node-ical";
import { Resend } from "resend";
import { env } from "@/env";

import { format } from "date-fns";
import { Calendar } from "@/server/api/types";
import { RsvpConfirmationEmail } from "@/emails/rsvp-confirmation";
const resend = new Resend(env.AUTH_RESEND_KEY);

export async function sendRsvpEmail(
    user: { name: string; email: string },
    event: { summary: string; start: Date; end: Date },
    calendar: Omit<Calendar, "icalUrl">,
) {
    console.log(user, event, calendar);
    const { name, email } = user;
    const { summary, start, end } = event;
    const { name: calendarName } = calendar;

    const subject = `RSVP Confirmation for ${summary}`;
    const react = RsvpConfirmationEmail({ name, eventSummary: summary, eventStart: format(start, "MM/dd/yyyy hh:mm a"), eventEnd: format(end, "MM/dd/yyyy hh:mm a"), calendarName });

    const textContent = `
    RSVP Confirmation

    Hi ${name},

    Thank you for your RSVP to the event ${summary} on the calendar ${calendarName}.

    Event Details:
    - Summary: ${summary}
    - Start: ${format(start, "MM/dd/yyyy hh:mm a")}
    - End: ${format(end, "MM/dd/yyyy hh:mm a")}

    We look forward to seeing you there!
  `;

    const { data, error } = await resend.emails.send({
        from: env.AUTH_EMAIL_FROM,
        to: [email],
        cc: [env.AUTH_EMAIL_FROM],
        subject: subject,
        react: react,
        text: textContent,
    });

    if (error) {
        throw new Error("Resend error: " + error.message);
    }
}
