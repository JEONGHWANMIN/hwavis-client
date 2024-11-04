import {
  Avatar,
  AvatarWrapper,
  MessageBubble,
  MessageWrapper,
  RoleText,
} from '@/app/chat/styles'
import ReactMarkdown, { Components } from 'react-markdown'
import MarkdownComponents from '@/app/chat/MarkdownComponents'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import React from 'react'
import { GptMessage } from '@/app/chat/page'

const Message = ({ chat, index }: { chat: GptMessage; index: number }) => (
  <MessageWrapper key={`${chat.timestamp}-${index}`} role={chat.role}>
    <AvatarWrapper>
      <Avatar role={chat.role}>{chat.role.charAt(0).toUpperCase()}</Avatar>
      <RoleText>{chat.role === 'assistant' ? 'hwanvis' : chat.role}</RoleText>
    </AvatarWrapper>
    <MessageBubble role={chat.role === 'assistant' ? 'hwanvis' : chat.role}>
      <ReactMarkdown
        components={MarkdownComponents as Partial<Components>}
        rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
        remarkPlugins={[remarkMath]}
      >
        {chat.content.replace(/\\n/g, '\n')}
      </ReactMarkdown>
    </MessageBubble>
  </MessageWrapper>
)

export default Message
