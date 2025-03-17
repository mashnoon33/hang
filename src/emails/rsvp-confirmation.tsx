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
import { format, toZonedTime } from 'date-fns-tz';
import { Calendar, Clock, LucideIcon } from 'lucide-react';


interface RsvpEmailProps {
  name?: string;
  email?: string;
  eventSummary?: string;
  eventStart?: string;
  eventEnd?: string;
  calendarName?: string;
  calendarUrl?: string;
  isReminder?: boolean;
}

export const RSVPEmail = ({
  name,
  eventSummary,
  eventStart,
  eventEnd,
  calendarName,
  calendarUrl,
  isReminder = false,
}: RsvpEmailProps) => {
  const previewText = `RSVP ${isReminder ? "Reminder" : "Confirmation"} for ${eventSummary}`;
  const timeZone = 'America/New_York';

  const eventStartNY = eventStart ? toZonedTime(new Date(eventStart), timeZone) : undefined;
  const eventEndNY = eventEnd ? toZonedTime(new Date(eventEnd), timeZone) : undefined;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2 ">
          <Preview>{previewText}</Preview>
          <Container className="border  border-solid border-[#eaeaea] rounded-xl my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-gray-600 text-[14px] font-normal mb-[-12px]  p-0 mx-0">
              {calendarName}
            </Heading>
            <Heading className="text-black text-[24px] font-bold  p-0 mb-[10px] mx-0">
              {eventSummary}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              {isReminder ? "This is a reminder for your reservation. Hope to see you soon! Please let the host know if you need to cancel." : "This is a confirmation for your reservation. Hope to see you soon! Please let the host know if you need to cancel."}
            </Text>
            <Section className="flex flex-col gap-[-15px]">
              <Section>
                <IconLabel icon={Calendar} label={` ${eventStartNY ? format(eventStartNY, "EEEE, MMM d, yyyy") : ''}`} />
              </Section>
              <Section>
                <IconLabel icon={Clock} label={` ${eventStartNY ? format(eventStartNY, "hh:mm a") : ''} - ${eventEndNY ? format(eventEndNY, "hh:mm a") : ''}`} />
              </Section>
              
            </Section>
            <Section className="mt-[20px]">
              <Button className="px-3 bg-black text-white py-2 text-sm rounded-lg" href={calendarUrl}>View Calendar</Button>
            </Section>
            
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

RSVPEmail.PreviewProps = {
  name: 'Alan Turing',
  eventSummary: 'Enigma Project Meeting',
  eventStart: '10/10/2023 10:00 AM',
  eventEnd: '10/10/2023 11:00 AM',
  calendarName: 'Enigma Calendar',
  calendarUrl: 'https://enigma.calendar.com',
  isReminder: true,
} as RsvpEmailProps;

export default RSVPEmail;


interface IconLabelProps {
  icon: LucideIcon;
  label: string;
  labelClass?: string;
}

export function IconLabel({ icon: Icon, label, labelClass = "font-normal" }: IconLabelProps) {
  return (
    <div className="flex flex-row gap-2 items-center my-[-10px] text-gray-600">
      <Icon className="w-4 h-4 flex-shrink-0" />
      <p className={labelClass}>{label}</p>
    </div>
  );
}