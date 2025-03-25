import ReactMarkdown from "react-markdown";


export function MarkdownRenderer({ markdown }: { markdown: string; }) {
  return (
    <div className="markdown-body prose prose-sm prose-gray">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
