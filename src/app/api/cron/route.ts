import { env } from '@/env';
import { Resend } from 'resend';


const resend = new Resend(env.AUTH_RESEND_KEY);

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    const { data, error } = await resend.emails.send({
        from: 'Mash <test@auth.mash.studio>',
        to: ['mashnyy@gmail.com'],
        subject: 'Hello World',
        html: '<strong>It works!</strong>',
    });

    if (error) {
        return Response.json({ error: error.message });
    }

    return Response.json({ success: true });
}