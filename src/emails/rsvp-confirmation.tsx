import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { Calendar, Clock, LucideIcon, Star } from 'lucide-react';
import { format } from 'date-fns';
interface RsvpConfirmationEmailProps {
  name?: string;
  email?: string;
  eventSummary?: string;
  eventStart?: string;
  eventEnd?: string;
  calendarName?: string;
}

export const RsvpConfirmationEmail = ({
  name,
  eventSummary,
  eventStart,
  eventEnd,
  calendarName,
}: RsvpConfirmationEmailProps) => {
  const previewText = `RSVP Confirmation for ${eventSummary}`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Preview>{previewText}</Preview>
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              RSVP Confirmation
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hi {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We appreciate your RSVP for the event <strong>{eventSummary}</strong> listed on the <strong>{calendarName}</strong> calendar.
            </Text>
            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
              </Text>
              <div className="flex flex-col gap-[-5px]  text-gray-600">
                <IconLabel icon={Star} label={`${eventSummary}`} />
              <IconLabel icon={Calendar} label={` ${format(new Date(eventStart!), "EEEE, MMM d, yyyy")}`} />
              <IconLabel icon={Clock} label={` ${format(new Date(eventStart!), "hh:mm a")} - ${format(new Date(eventEnd!), "hh:mm a")}`} />
              </div>
              
            </Section>
            <Text className="text-black text-[14px] leading-[24px] mt-[32px]">
              We look forward to seeing you there!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

RsvpConfirmationEmail.PreviewProps = {
  name: 'Alan Turing',
  eventSummary: 'Enigma Project Meeting',
  eventStart: '10/10/2023 10:00 AM',
  eventEnd: '10/10/2023 11:00 AM',
  calendarName: 'Enigma Calendar',
} as RsvpConfirmationEmailProps;

export default RsvpConfirmationEmail;


interface IconLabelProps {
  icon: LucideIcon;
  label: string;
  labelClass?: string;
}

export function IconLabel({ icon: Icon, label, labelClass = "font-normal" }: IconLabelProps) {
  return (
    <div className="flex flex-row gap-2 items-center text-gray-600">
      <Icon className="w-4 h-4 flex-shrink-0" />
      <p className={labelClass}>{label}</p>
    </div>
  );
}