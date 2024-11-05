import React, { ReactNode, useState } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps {
  children?: ReactNode
  inline?: boolean
  className?: string
  [key: string]: unknown
}

const slideIn = keyframes`
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
`

const CodeWrapper = styled.div`
  position: relative;
  margin: 0.4em 0;
  animation: ${slideIn} 0.4s ease-out;
  border-radius: 16px;
  overflow: hidden;
  background: #1e1e2e;
  border: 1px solid #2a2a3c;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em; // 패딩 축소
  background: #2a2a3c;
  border-bottom: 1px solid #6c4ab6; // 보더 두께 감소
`

const LanguageTag = styled.span`
  font-size: 0.75rem; // 폰트 크기 축소
  color: #b9b9c3;
  font-family: var(--font-lineSeedKrRg);
  padding: 0.25em 0.75em; // 패딩 축소
  background: #1e1e2e;
  border-radius: 12px; // 반경 축소
  border: 1px solid #6c4ab6;
  letter-spacing: 0.5px;
`

const CopyButton = styled.button<{ copied: boolean }>`
  background: ${props => (props.copied ? '#6C4AB6' : 'transparent')};
  border: 1px solid ${props => (props.copied ? '#6C4AB6' : '#4A4A5C')};
  color: ${props => (props.copied ? '#fff' : '#B9B9C3')};
  font-size: 0.75rem; // 폰트 크기 축소
  padding: 0.25em 0.75em; // 패딩 축소
  border-radius: 12px; // 반경 축소
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4em; // gap 축소
  font-family: var(--font-lineSeedKrRg);
  transition: all 0.3s ease;

  &:hover {
    background: ${props => (props.copied ? '#8A6AD1' : '#2A2A3C')};
    border-color: #6c4ab6;
    color: #fff;
  }

  svg {
    width: 0.9em; // 아이콘 크기 축소
    height: 0.9em;
    stroke-width: 2.5;
  }
`

const InlineCode = styled.code`
  background: #2a2a3c;
  color: #b9b9c3;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.85em;
  font-family: 'JetBrains Mono', Consolas, var(--font-lineSeedKrRg);
  border: 1px solid rgba(74, 74, 92, 0.4);
  display: inline-block;
  line-height: 1.4;
  margin: 0 0.1em;
  white-space: pre-wrap;
  word-break: break-word;
  vertical-align: middle;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  /* 여러 줄일 때의 스타일 */
  &:has(br),
  &:has(div) {
    display: block;
    padding: 0.8em 1em;
    margin: 0.8em 0;
    width: 100%;
    overflow-x: auto;
  }

  &::selection {
    background: rgba(185, 185, 195, 0.2);
  }
`

const CodeBlock: React.FC<CodeBlockProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''

  const getCodeContent = (children: ReactNode): string => {
    if (typeof children === 'string') return children
    if (typeof children === 'number') return String(children)
    if (!children) return ''

    if (React.isValidElement(children)) {
      const props = children.props
      if (props.children) {
        return Array.isArray(props.children)
          ? props.children.map(getCodeContent).join('')
          : getCodeContent(props.children)
      }
      return ''
    }

    if (Array.isArray(children)) {
      return children.map(getCodeContent).join('')
    }

    return String(children)
  }

  const codeContent = getCodeContent(children)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (inline || !language) {
    return <InlineCode {...props}>{codeContent}</InlineCode>
  }

  return (
    <CodeWrapper>
      <ControlBar>
        <LanguageTag>{language.toUpperCase()}</LanguageTag>
        <CopyButton onClick={handleCopy} copied={isCopied}>
          {isCopied ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              복사 완료
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              코드 복사
            </>
          )}
        </CopyButton>
      </ControlBar>
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        customStyle={{
          margin: 0,
          padding: '2em',
          fontSize: '0.95rem',
          lineHeight: '1.5',
        }}
        {...props}
      >
        {codeContent}
      </SyntaxHighlighter>
    </CodeWrapper>
  )
}

export default CodeBlock
