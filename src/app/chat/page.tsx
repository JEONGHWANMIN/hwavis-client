'use client'

import { ChatLayout } from '@/components/@core/ChatLayout'
import TextArea from 'antd/es/input/TextArea'
import { Button, Flex, message, Spin } from 'antd'
import SearchIcon from '@/assets/svg/search-icon.svg'
import React, { FormEvent, KeyboardEvent, useState } from 'react'
import styled from '@emotion/styled'
import useKeyComposing from '@/hooks/useKeyComposing'
import useApiKeyStore from '@/store/useApiKeyStore'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import 'katex/dist/katex.min.css'
import MarkdownComponents from '@/app/chat/MarkdownComponents'
import { axiosInstance } from '@/api/axiosInstance'

export interface GptMessage {
  role: string
  content: string
}

export interface CreatePromptDto {
  apiKey: string
  messages: GptMessage[]
}

const ChatPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [chats, setChats] = useState<GptMessage[]>([])
  const apiKey = useApiKeyStore(state => state.apiKey)

  const resetChat = () => setChats([])

  const showError = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    })
  }

  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e) e.preventDefault()

    if (!apiKey) {
      showError('api key를 등록해주세요')
      return
    }
    if (text.trim().length === 0) {
      showError('검색어를 입력해주세요.')
      return
    }

    setIsLoading(true)

    const userMessage = { role: 'user', content: text.trim() }

    setChats(prevChats => [...prevChats, userMessage])
    setText('')

    try {
      const response = await axiosInstance.post<{ message: GptMessage }>(
        '/hwanvis',
        {
          apiKey: apiKey,
          messages: [...chats, userMessage],
        },
      )

      setChats(prevChats => [
        ...prevChats,
        {
          role: response.data.message?.role,
          content: response.data.message?.content,
        },
      ])
    } catch (error) {
      // 에러 처리
      setChats(prevChats => [
        ...prevChats,
        {
          role: 'assistant',
          content: '죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.',
        },
      ])
      console.error('API 요청 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const { isComposing, keyComposingEvents } = useKeyComposing()

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <ChatLayout resetChat={resetChat}>
      {contextHolder}
      <ChatContainer>
        <ChatBox>
          {chats.length > 0 ? (
            <>
              {chats.map((chat, index) => (
                <MessageWrapper key={index} role={chat.role}>
                  <AvatarWrapper>
                    <Avatar role={chat.role}>
                      {chat.role.charAt(0).toUpperCase()}
                    </Avatar>
                    <RoleText>
                      {chat.role === 'assistant' ? 'hwanvis' : chat.role}
                    </RoleText>
                  </AvatarWrapper>
                  <MessageBubble
                    role={chat.role === 'assistant' ? 'hwanvis' : chat.role}
                  >
                    <ReactMarkdown
                      components={MarkdownComponents}
                      rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
                      remarkPlugins={[remarkMath]}
                    >
                      {chat.content.replace(/\\n/g, '\n')}
                    </ReactMarkdown>
                  </MessageBubble>
                </MessageWrapper>
              ))}
            </>
          ) : (
            <MessageWrapper role={'hwanvis'}>
              <AvatarWrapper>
                <Avatar role={'hwanvis'}>{'H'}</Avatar>
                <RoleText>hwanvis</RoleText>
              </AvatarWrapper>
              <MessageBubble role={'hwanvis'}>
                환비스에게 궁금한것을 물어보세요
              </MessageBubble>
            </MessageWrapper>
          )}
        </ChatBox>
        {isLoading && (
          <Flex gap="middle">
            <Spin tip="Loading" size="large">
              {'content'}
            </Spin>
          </Flex>
        )}
        <InputBox>
          <form onSubmit={handleSubmit}>
            <TextArea
              disabled={isLoading}
              onKeyDown={handleKeyDown}
              onChange={e => setText(e.target.value)}
              value={text}
              size={'large'}
              placeholder="환비스에게 뭐든 물어보세요"
              showCount
              rows={2}
              {...keyComposingEvents}
              css={{
                borderRadius: '16px',
                backgroundColor: '#424242 !important',
                width: '100%',
                paddingRight: '100px',
                overflow: 'auto',
                resize: 'none',
                color: 'white',
                '.ant-input::placeholder': { color: '#61605aff !important' },
                ':hover': { backgroundColor: '#525252' },
                ':focus': { backgroundColor: '#3a3a3a', outline: 'none' },
              }}
            />
            <Button
              disabled={isLoading}
              htmlType={'submit'}
              type={'primary'}
              css={{
                position: 'absolute',
                top: '50%',
                right: '16px',
                transform: 'translateY(-50%)',
                borderRadius: '999px',
                zIndex: 1,
              }}
            >
              <SearchIcon width={18} height={18} />
            </Button>
          </form>
        </InputBox>
      </ChatContainer>
    </ChatLayout>
  )
}

export default ChatPage

// Styled Components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  max-width: 800px;
  padding: 12px;
`

const ChatBox = styled.div`
  width: 100%;
  flex: 1; /* 남은 공간을 모두 차지 */
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Chrome, Safari, Opera를 위한 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  /* Firefox를 위한 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
`

const InputBox = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 0;
`

const MessageWrapper = styled.div<{ role: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  gap: 4px;
`

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2px;
`

const Avatar = styled.div<{ role: string }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ role }) => (role === 'user' ? '#B39DDB' : '#e5e5ea')};
  color: ${({ role }) => (role === 'user' ? 'white' : 'black')};
  font-weight: bold;
`

const RoleText = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`

const MessageBubble = styled.div<{ role: string }>`
  max-width: ${({ role }) => (role === 'user' ? '60%' : '100%')};
  padding: 10px 15px;
  border-radius: 15px;
  background-color: ${({ role }) => (role === 'user' ? '#B39DDB' : '#dedee8')};
  color: ${({ role }) => (role === 'user' ? 'white' : 'black')};
  text-align: ${({ role }) => (role === 'user' ? 'right' : 'left')};
`
