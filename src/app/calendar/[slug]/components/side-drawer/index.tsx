import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useCalendar } from '../CalendarProvider';
import { EventDetail, EventDetailIsolate } from '../event-detail';
export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
export function SideDrawer() {
  return (
    <div className=" overflow-y-auto h-screen bg-gray-50">
      <EventDetailIsolate />
    </div>
  );
}