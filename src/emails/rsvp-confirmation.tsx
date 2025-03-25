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
import { format, toZonedTime } from "date-fns-tz";
import { Calendar, Clock, LucideIcon } from "lucide-react";

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
  const timeZone = "America/New_York";

  const eventStartNY = eventStart
    ? toZonedTime(new Date(eventStart), timeZone)
    : undefined;
  const eventEndNY = eventEnd
    ? toZonedTime(new Date(eventEnd), timeZone)
    : undefined;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 mb-[-12px] p-0 text-[14px] font-normal text-gray-600">
              {calendarName}
            </Heading>
            <Heading className="mx-0 mb-[10px] p-0 text-[24px] font-bold text-black">
              {eventSummary}
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              {isReminder
                ? "This is a reminder for your reservation. Hope to see you soon! Please let the host know if you need to cancel."
                : "This is a confirmation for your reservation. Hope to see you soon! Please let the host know if you need to cancel."}
            </Text>
            <Section className="flex flex-col gap-[-15px]">
              <Section>
                <IconLabel
                  icon={Calendar}
                  label={` ${eventStartNY ? format(eventStartNY, "EEEE, MMM d, yyyy") : ""}`}
                />
              </Section>
              <Section>
                <IconLabel
                  icon={Clock}
                  label={` ${eventStartNY ? format(eventStartNY, "hh:mm a") : ""} - ${eventEndNY ? format(eventEndNY, "hh:mm a") : ""}`}
                />
              </Section>
            </Section>
            <Section className="mt-[20px]">
              <Button
                className="rounded-lg bg-black px-3 py-2 text-sm text-white"
                href={calendarUrl}
              >
                View Calendar
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

RSVPEmail.PreviewProps = {
  name: "Alan Turing",
  eventSummary: "Enigma Project Meeting",
  eventStart: "10/10/2023 10:00 AM",
  eventEnd: "10/10/2023 11:00 AM",
  calendarName: "Enigma Calendar",
  calendarUrl: "https://enigma.calendar.com",
  isReminder: true,
} as RsvpEmailProps;

export default RSVPEmail;

interface IconLabelProps {
  icon: LucideIcon;
  label: string;
  labelClass?: string;
}

export function IconLabel({
  icon: Icon,
  label,
  labelClass = "font-normal",
}: IconLabelProps) {
  return (
    <div className="my-[-10px] flex flex-row items-center gap-2 text-gray-600">
      <Icon className="h-4 w-4 flex-shrink-0" />
      <p className={labelClass}>{label}</p>
    </div>
  );
}
