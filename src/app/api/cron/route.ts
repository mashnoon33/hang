export function GET(request: Request) {
    console.log("cron job ran")
    return new Response('Hello from Vercel!');
  }