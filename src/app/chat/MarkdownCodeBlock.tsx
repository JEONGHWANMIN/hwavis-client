import React, { ReactNode } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface ComponentProps {
  children?: ReactNode
  inline?: boolean
  className?: string
  [key: string]: unknown
}

const MarkdownCodeBlock: React.FC<ComponentProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''

  const stringifyJSXElement = (element: ReactNode): string => {
    if (typeof element === 'string') return element
    if (typeof element === 'number') return String(element)
    if (!element) return ''

    if (React.isValidElement(element)) {
      const props = element.props
      if (props.children) {
        return Array.isArray(props.children)
          ? props.children.map(stringifyJSXElement).join('')
          : stringifyJSXElement(props.children)
      }
      return ''
    }

    if (Array.isArray(element)) {
      return element.map(stringifyJSXElement).join('')
    }

    return String(element)
  }

  const getCodeContent = (children: ReactNode): string => {
    if (typeof children === 'string') return children
    return stringifyJSXElement(children)
  }

  const codeContent = getCodeContent(children)

  if (inline) {
    return (
      <code className={className} {...props}>
        {codeContent}
      </code>
    )
  }

  return (
    <div className="my-4">
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        className="rounded-lg !bg-gray-900 !p-4"
        customStyle={{
          margin: 0,
          fontSize: '14px',
          lineHeight: '1.5',
        }}
        {...props}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  )
}

export default MarkdownCodeBlock
