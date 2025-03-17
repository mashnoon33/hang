import { env } from '@/env';
import { add } from 'date-fns';
import { Resend } from 'resend';


const resend = new Resend(env.AUTH_RESEND_KEY);

import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { sendRsvpEmail } from '@/lib/resend/rsvp';

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    // Create tRPC context
    const context = await createTRPCContext({
        headers: request.headers,
    });

    // Use tRPC to fetch RSVPs coming up in the next 24 hours
    const now = new Date();
    
    const next24Hours = add(now, { days: 1 });
    const rsvps = await appRouter.createCaller(context).rsvp.getUpcomingRsvps({
        start: now.toISOString(),
        end: next24Hours.toISOString(),
    });

    // // console.log(JSON.stringify(rsvps, null, 2));
    // return Response.json({ data: rsvps });

    if (!rsvps || rsvps.length === 0) {
        return new Response('No upcoming RSVPs in the next 24 hours', {
            status: 200,
        });
    }
    for (const rsvp of rsvps) {
        if (rsvp.user && rsvp.event && rsvp.event.start) {
            try {
                await sendRsvpEmail(
                    { name: rsvp.user.name ?? "", email: rsvp.user.email ?? "" },
                    { summary: rsvp.event.summary ?? "", start: rsvp.event.start ?? new Date(), end: rsvp.event.end ?? new Date() },
                    {
                        name: rsvp.calendar?.name ?? "", shortUrl: rsvp.calendar?.shortUrl ?? "",
                        id: rsvp.calendar?.id ?? 0,
                        description: rsvp.calendar?.description ?? "",
                        userId: rsvp.user.id ?? 0,
                        shortDescription: rsvp.calendar?.shortDescription ?? null
                    },
                    true
                );
            } catch (error) {
                console.error(`Error sending email to ${rsvp.user.email}:`, error);
            }
        }
    }

    // const { data, error } = await resend.emails.send({
    //     from: 'Mash <test@auth.mash.studio>',
    //     to: ['mashnyy@gmail.com'],
    //     subject: 'Upcoming RSVPs',
    //     html: `<strong>Upcoming RSVPs in the next 24 hours:</strong><br>${rsvps.map(rsvp => `<p>${rsvp.calendar?.name} - ${rsvp.event?.summary} on ${rsvp.event?.start}</p>`).join('')}`,
    // });

    // if (error) {
    //     return Response.json({ error: error.message });
    // }

    return Response.json({ success: true });
}