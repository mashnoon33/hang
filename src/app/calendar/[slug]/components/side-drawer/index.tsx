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
    <div className=" overflow-y-auto h-screen bg-gray-50">
      {!calendar ? (
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-12 bg-gray-300 rounded"></div>
          <div className="h-80 bg-gray-300 rounded mb-4"></div>
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>

        </div>
      ) : (
        <div className="p-4 mb-20">
          <div className="text-4xl mb-4 font-bold">{calendar.name}</div>
          <MarkdownRenderer markdown={calendar.description ?? ""} />
        </div>
      )}
    </div>
  );
}