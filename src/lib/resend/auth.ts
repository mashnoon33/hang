import SignInEmail from "@/emails/sign-in";
import { env } from "@/env";
import { Resend } from "resend";

type Theme = {
  brandColor?: string;
  buttonText?: string;
};

type SendVerificationRequestParams = {
  identifier: string;
  url: string;
  theme: Theme;
};

const resend = new Resend(env.AUTH_RESEND_KEY);

export async function sendVerificationRequest(
  params: SendVerificationRequestParams,
) {
  const { identifier: to, url, theme } = params;
  const { host } = new URL(url);

  const { data, error } = await resend.emails.send({
    from: env.AUTH_EMAIL_FROM,
    to: [to],
    subject: `Sign in to ${host}`,
    react: SignInEmail({ signInUrl: url, host }),
    text: `Sign in to ${host}`,
  });

  if (error) {
    throw new Error("Resend error: " + error.message);
  }
}

