import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import MarkdownCodeBlock from '@/app/chat/MarkdownCodeBlock'

// Types
interface BaseProps {
  children?: ReactNode
  className?: string
}

interface LinkProps extends BaseProps {
  href?: string
  rel?: string
  target?: string
}

interface TableProps extends BaseProps {
  align?: 'left' | 'center' | 'right'
}

interface HeadingProps extends BaseProps {
  id?: string
}

interface MarkdownComponentsMap {
  code: React.ComponentType
  h1: React.ComponentType<HeadingProps>
  h2: React.ComponentType<HeadingProps>
  h3: React.ComponentType<HeadingProps>
  p: React.ComponentType<BaseProps>
  strong: React.ComponentType<BaseProps>
  em: React.ComponentType<BaseProps>
  ul: React.ComponentType<BaseProps>
  ol: React.ComponentType<BaseProps>
  li: React.ComponentType<BaseProps>
  a: React.ComponentType<LinkProps>
  blockquote: React.ComponentType<BaseProps>
  hr: React.ComponentType<BaseProps>
  table: React.ComponentType<TableProps>
  th: React.ComponentType<TableProps>
  td: React.ComponentType<TableProps>
  pre: React.ComponentType<BaseProps>
}

// Animations
const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`

// Styled Components
const Header1 = styled.h1<HeadingProps>`
  font-size: 2.3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 1em 0 1em;
  line-height: 1.3;
  letter-spacing: -0.03em;
  font-family: var(--font-lineSeedKrBd);
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 4px;
    margin-top: 0.3em;
    background: linear-gradient(90deg, #b39ddb, #9575cd, #7e57c2);
    background-size: 200% 200%;
    animation: ${gradientAnimation} 6s ease infinite;
    border-radius: 4px;
  }
`

const Header2 = styled.h2<HeadingProps>`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2a2a2a;
  margin: 2em 0 1.2em;
  line-height: 1.4;
  letter-spacing: -0.02em;
  font-family: var(--font-lineSeedKrBd);
  position: relative;
  padding-left: 1em;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.2em;
    bottom: 0.2em;
    width: 4px;
    background: #b39ddb;
    border-radius: 4px;
  }
`

const Header3 = styled.h3<HeadingProps>`
  font-size: 1.2rem;
  font-weight: 600;
  color: #3a3a3a;
  margin: 1.8em 0 1em;
  line-height: 1.4;
  font-family: var(--font-lineSeedKrBd);
  background: linear-gradient(120deg, #b39ddb 0%, #9575cd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::selection {
    background: #b39ddb; // 드래그 배경색
    color: white; // 드래그된 텍스트 색상
    -webkit-text-fill-color: white; // gradient 텍스트를 위해 필요
  }

  /* gradient 효과를 span으로 감싸서 적용 */
  & > span {
    background: linear-gradient(120deg, #b39ddb 0%, #9575cd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* code 태그가 있을 경우 기본 스타일 적용 */
  & code {
    background: #2a2a3c;
    color: #b9b9c3 !important; /* code 블록의 색상 강제 적용 */
    -webkit-text-fill-color: #b9b9c3 !important; /* gradient 효과 override */
    padding: 0.2em 0.6em;
    border-radius: 4px;
    font-size: 0.6em;
    font-family: var(--font-lineSeedKrRg);
    border: 1px solid #4a4a5c;
  }
`

const Paragraph = styled.p<BaseProps>`
  margin-bottom: 1.2em;
  line-height: 1.8;
  color: #4a4a4a;
  font-size: 0.95rem; // 1.1rem에서 0.95rem으로 축소
  font-family: var(--font-lineSeedKrRg);

  &:last-child {
    margin-bottom: 0;
  }

  & code {
    background: #2a2a3c;
    color: #b9b9c3 !important; /* code 블록의 색상 강제 적용 */
    -webkit-text-fill-color: #b9b9c3 !important; /* gradient 효과 override */
    padding: 0.2em 0.6em;
    border-radius: 4px;
    font-size: 0.7em;
    font-family: var(--font-lineSeedKrRg);
    border: 1px solid #4a4a5c;
  }
`

const Strong = styled.strong<BaseProps>`
  font-weight: 600;
  color: #2a2a2a;
  font-family: var(--font-lineSeedKrBd);
  background: linear-gradient(120deg, #b39ddb 0%, #9575cd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::selection {
    background: #b39ddb; // 드래그 배경색
    color: white; // 드래그된 텍스트 색상
    -webkit-text-fill-color: white; // gradient 텍스트를 위해 필요
  }
`

const Emphasis = styled.em<BaseProps>`
  font-style: italic;
  color: #3a3a3a;
  font-family: var(--font-lineSeedKrRg);
`

const UnorderedList = styled.ul<BaseProps>`
  margin: 2em 0 2em;
  padding-left: 1.2em;
  list-style-type: none;
  font-size: 1rem; // 새로 추가

  & > li {
    position: relative;
    padding-left: 1em;
    margin-bottom: 0.8em;

    &::before {
      content: '';
      position: absolute;
      left: -0.5em;
      top: 0.6em;
      width: 8px;
      height: 8px;
      background-color: #b39ddb;
      border-radius: 50%;
      transform: scale(0.8);
      transition: transform 0.2s ease;
    }

    &:hover::before {
      transform: scale(1);
    }
  }
`

const OrderedList = styled.ol<BaseProps>`
  margin: 1.5em 0 2em;
  padding-left: 1.2em;
  counter-reset: item;
  list-style-type: none;
  font-size: 0.95rem; // 새로 추가

  & > li {
    position: relative;
    counter-increment: item;
    padding-left: 1.4em;
    margin-bottom: 0.8em;

    &::before {
      content: counter(item);
      position: absolute;
      left: -1em;
      top: 0.1em;
      width: 1.8em;
      height: 1.8em;
      background: #b39ddb;
      color: white;
      font-weight: 600;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9em;
      transition: transform 0.2s ease;
    }

    &:hover::before {
      transform: scale(1.1);
    }
  }
`

const ListItem = styled.li<BaseProps>`
  line-height: 1.8;
  color: #4a4a4a;
  font-family: var(--font-lineSeedKrRg);
`

const Blockquote = styled.blockquote<BaseProps>`
  margin: 2em 0;
  padding: 2.5em 2em 2em 3.5em; // 왼쪽 패딩 증가, 상단 패딩 조정
  background: linear-gradient(to right, #f8f4ff, #ffffff);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(179, 157, 219, 0.1);
  position: relative;
  font-family: var(--font-lineSeedKrRg);
  font-size: 0.95rem;

  &::before {
    content: '"';
    position: absolute;
    left: 0.8em; // 왼쪽 위치 조정
    top: 0.6em; // 상단 위치 조정
    font-size: 3em; // 크기 약간 증가
    color: #b39ddb;
    font-family: Georgia, serif;
    line-height: 1; // 추가: 라인 높이 조정
  }

  & > p {
    margin: 0;
    color: #5e35b1;
    font-style: italic;
    line-height: 1.8;
    word-break: keep-all; // 추가: 한글 단어 단위 줄바꿈
    white-space: pre-wrap; // 추가: 공백 유지하며 줄바꿈
  }
`

const HorizontalRule = styled.hr`
  margin: 3em 0;
  border: none;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(179, 157, 219, 0),
    rgba(179, 157, 219, 0.6) 50%,
    rgba(179, 157, 219, 0)
  );
`

const Table = styled.table<TableProps>`
  width: 100%;
  margin: 2em 0;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(179, 157, 219, 0.1);
  text-align: ${props => props.align || 'left'};
  font-family: var(--font-lineSeedKrRg);
  font-size: 0.95rem; // 새로 추가
`

const TableHeader = styled.th<TableProps>`
  padding: 1em 1.5em;
  background: linear-gradient(to right, #b39ddb, #9575cd);
  color: white;
  font-weight: 600;
  font-family: var(--font-lineSeedKrBd);
  text-align: ${props => props.align || 'left'};
`

const TableCell = styled.td<TableProps>`
  padding: 1em 1.5em;
  border-bottom: 1px solid rgba(179, 157, 219, 0.2);
  color: #4a4a4a;
  text-align: ${props => props.align || 'left'};
  transition: background-color 0.2s ease;

  tr:hover & {
    background-color: rgba(179, 157, 219, 0.05);
  }

  tr:last-child & {
    border-bottom: none;
  }
`

const PreBlock = styled.pre<BaseProps>`
  margin: 4px 0;
  border-radius: 16px;
  overflow: hidden;
  font-size: 1.2rem; // 새로 추가
`

// Component Map
const MarkdownComponents: MarkdownComponentsMap = {
  code: MarkdownCodeBlock,
  h1: ({ children, ...props }: HeadingProps) => (
    <Header1 {...props}>{children}</Header1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <Header2 {...props}>{children}</Header2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <Header3 {...props}>{children}</Header3>
  ),
  p: ({ children, ...props }: BaseProps) => (
    <Paragraph {...props}>{children}</Paragraph>
  ),
  strong: ({ children, ...props }: BaseProps) => (
    <Strong {...props}>{children}</Strong>
  ),
  em: ({ children, ...props }: BaseProps) => (
    <Emphasis {...props}>{children}</Emphasis>
  ),
  ul: ({ children, ...props }: BaseProps) => (
    <UnorderedList {...props}>{children}</UnorderedList>
  ),
  ol: ({ children, ...props }: BaseProps) => (
    <OrderedList {...props}>{children}</OrderedList>
  ),
  li: ({ children, ...props }: BaseProps) => (
    <ListItem {...props}>{children}</ListItem>
  ),
  a: ({ href, children, ...props }: LinkProps) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: BaseProps) => (
    <Blockquote {...props}>{children}</Blockquote>
  ),
  hr: () => <HorizontalRule />,
  table: ({ children, ...props }: TableProps) => (
    <Table {...props}>{children}</Table>
  ),
  th: ({ children, ...props }: TableProps) => (
    <TableHeader {...props}>{children}</TableHeader>
  ),
  td: ({ children, ...props }: TableProps) => (
    <TableCell {...props}>{children}</TableCell>
  ),
  pre: ({ children, ...props }: BaseProps) => (
    <PreBlock {...props}>{children}</PreBlock>
  ),
}

export default MarkdownComponents
