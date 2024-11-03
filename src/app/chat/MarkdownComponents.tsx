import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import MarkdownCodeBlock from '@/app/chat/MarkdownCodeBlock'

// 기본 컴포넌트 props 타입 정의
interface ComponentProps {
  children?: ReactNode
  [key: string]: unknown
}

// 링크 컴포넌트를 위한 특별한 props 타입
interface LinkProps extends ComponentProps {
  href?: string
}

const Header1 = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  margin: 1.5em 0 1em 0;
`

const Header2 = styled.h2`
  font-size: 1.3em;
  font-weight: bold;
  margin: 1.4em 0 0.8em 0;
`

const Header3 = styled.h3`
  font-size: 1.1em;
  font-weight: bold;
  margin: 1.3em 0 0.6em 0;
`

const Paragraph = styled.p`
  margin-bottom: 1em;
  line-height: 1.6;
`

const Strong = styled.strong`
  font-weight: 600;
`

const Emphasis = styled.em`
  font-style: italic;
`

const UnorderedList = styled.ul`
  margin: 0 0 1em 1em;
  padding-left: 1em;
  list-style-type: disc;
`

const OrderedList = styled.ol`
  margin: 0 0 1em 1em;
  padding-left: 1em;
  list-style-type: decimal;
`

const ListItem = styled.li`
  margin: 0.5em 0;
`

const Link = styled.a`
  color: #0066cc;
  text-decoration: underline;
  &:hover {
    color: #0052a3;
  }
`

const Blockquote = styled.blockquote`
  border-left: 4px solid #e0e0e0;
  padding-left: 1em;
  margin: 1em 0;
  font-style: italic;
`

const HorizontalRule = styled.hr`
  margin: 2em 0;
  border: none;
  border-top: 1px solid #e0e0e0;
`

const Table = styled.table`
  width: 100%;
  margin: 1em 0;
  border-collapse: collapse;
`

const TableHeader = styled.th`
  padding: 0.5em;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  font-weight: 600;
`

const TableCell = styled.td`
  padding: 0.5em;
  border: 1px solid #e0e0e0;
`

// 컴포넌트 맵 타입 정의
interface MarkdownComponentsMap {
  [key: string]: React.FC<ComponentProps | LinkProps>
}

const MarkdownComponents: MarkdownComponentsMap = {
  code: MarkdownCodeBlock,
  h1: ({ children }) => <Header1>{children}</Header1>,
  h2: ({ children }) => <Header2>{children}</Header2>,
  h3: ({ children }) => <Header3>{children}</Header3>,
  p: ({ children }) => <Paragraph>{children}</Paragraph>,
  strong: ({ children }) => <Strong>{children}</Strong>,
  em: ({ children }) => <Emphasis>{children}</Emphasis>,
  ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
  ol: ({ children }) => <OrderedList>{children}</OrderedList>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  a: ({ children }) => (
    <Link target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  ),
  blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
  hr: () => <HorizontalRule />,
  table: ({ children }) => <Table>{children}</Table>,
  th: ({ children }) => <TableHeader>{children}</TableHeader>,
  td: ({ children }) => <TableCell>{children}</TableCell>,
  pre: ({ children }) => <>{children}</>,
}

export default MarkdownComponents
