import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import ReactMarkdown from 'react-markdown';
import { EventDetailIsolate, TopNav } from '../event-detail';
import { useViewportWidth } from '@/lib/hooks/use-viewport-width';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="markdown-body prose prose-sm prose-gray">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
export function SideDrawer() {
  const { size } = useViewportWidth();
  return (
    <Sidebar>
      <SidebarContent>
        <TopNav />
        <EventDetailIsolate />
      </SidebarContent>
      {size === "sm" || size === "md" && <SidebarFooter >
        <Button>
          RSVP
        </Button>
      </SidebarFooter>}
    </Sidebar>
  );
}