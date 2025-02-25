import { env } from '@/env';
import { Resend } from 'resend';


const resend = new Resend(env.AUTH_RESEND_KEY);

export async function GET(request: Request) {
    console.log("cron job ran")
    const { data, error } = await resend.emails.send({
        from: 'Mash <test@mash.studio>',
        to: ['mashnyy@gmail.com'],
        subject: 'Hello World',
        html: '<strong>It works!</strong>',
    });

    if (error) {
        return console.error({ error });
    }

    console.log({ data });
    return new Response(JSON.stringify(data));
}