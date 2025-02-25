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
} from '@react-email/components';

interface SignInEmailProps {
    name?: string;
    signInUrl?: string;
    host?: string;
}

export const SignInEmail = ({
    name,
    signInUrl,
    host,
}: SignInEmailProps) => {
    const previewText = `Sign in to ${host}`;

    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Preview>{previewText}</Preview>
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Sign in to {host}
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi {name},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Please click the button below to sign in to {host}.
                        </Text>
                        <Section>
                            <div className="flex justify-center">
                                <Button className="box-border w-full rounded-[8px] bg-indigo-600 px-[12px] py-[12px] text-center font-semibold text-white"
                                    href={signInUrl}
                                >
                                    Sign In
                                </Button>

                            </div>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px] mt-[32px]">
                            If you did not request this email, please ignore it.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

SignInEmail.PreviewProps = {
    name: 'Alan Turing',
    signInUrl: 'https://example.com/sign-in',
    host: 'example.com',
} as SignInEmailProps;

export default SignInEmail;
