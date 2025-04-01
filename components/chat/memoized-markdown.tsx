import { marked } from 'marked'
import { memo, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const safeMarkdown = markdown || ''
  const tokens = marked.lexer(safeMarkdown)
  return tokens.map((token) => token.raw)
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        components={{
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                // @ts-expect-error - Known type mismatch between libraries
                style={oneDark}
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false
    return true
  }
)

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock'

export const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content])

  return blocks.map((block, index) => (
    <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
  ))
})

MemoizedMarkdown.displayName = 'MemoizedMarkdown'
