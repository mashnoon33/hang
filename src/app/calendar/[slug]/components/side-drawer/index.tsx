import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useCalendar } from '../CalendarProvider';
export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
export function SideDrawer() {
  const { calendar } = useCalendar();
  return (
    <div className="p-2">
        <div className="text-4xl font-bold">{calendar?.name}</div>
      <MarkdownRenderer markdown={calendar?.description ?? ""} />
    </div>
  );
}