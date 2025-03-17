import { Metadata } from 'next';
import { CalendarLayoutClient } from './components/CalendarLayoutClient';



export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CalendarLayoutClient>{children}</CalendarLayoutClient>;
} 