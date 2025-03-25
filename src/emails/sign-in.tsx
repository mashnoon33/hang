import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface SignInEmailProps {
  name?: string;
  signInUrl?: string;
  host?: string;
}

export const SignInEmail = ({ name, signInUrl, host }: SignInEmailProps) => {
  const previewText = `Sign in to ${host}`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Sign in to {host}
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hi {name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Please click the button below to sign in to {host}.
            </Text>
            <Section>
              <div className="flex justify-center">
                <Button
                  className="box-border w-full rounded-[8px] bg-indigo-600 px-[12px] py-[12px] text-center font-semibold text-white"
                  href={signInUrl}
                >
                  Sign In
                </Button>
              </div>
            </Section>
            <Text className="mt-[32px] text-[14px] leading-[24px] text-black">
              If you did not request this email, please ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

SignInEmail.PreviewProps = {
  name: "Alan Turing",
  signInUrl: "https://example.com/sign-in",
  host: "example.com",
} as SignInEmailProps;

export default SignInEmail;
