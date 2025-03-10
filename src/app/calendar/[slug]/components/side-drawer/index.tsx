import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import ReactMarkdown from 'react-markdown';
import { EventDetailIsolate, TopNav } from '../event-detail';
export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="markdown-body prose prose-sm prose-gray">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
export function SideDrawer() {
  return (
    <Sidebar>
      <SidebarContent>
        <TopNav />
        <EventDetailIsolate />
      </SidebarContent>
    </Sidebar>
  );
}
