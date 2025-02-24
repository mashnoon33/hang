import React from 'react';
import ReactMarkdown from 'react-markdown';

const sampleMarkdown = `
![Sample Image](https://placehold.co/400x600@2x.png)

This is a sample markdown file.

## Features

- **Bold Text**
- *Italic Text*
- [Link](https://example.com)
- \`Inline Code\`
- \`\`\`
  Code Block
  \`\`\`

## List

1. First item
2. Second item
3. Third item

## Blockquote

> This is a blockquote.

## Image

`;

export function MarkdownRenderer() {
  return (
    <div className="markdown-body">
      <ReactMarkdown>{sampleMarkdown}</ReactMarkdown>
    </div>
  );
}
