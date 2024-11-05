'use client'

import { ChatLayout } from '@/components/@core/ChatLayout'
import { Flex, message, Spin } from 'antd'
import React, { FormEvent, KeyboardEvent, useState, useEffect } from 'react'
import useKeyComposing from '@/hooks/useKeyComposing'
import useApiKeyStore from '@/store/useApiKeyStore'
import useChatHistoryStore from '@/store/useChatHistoryStore'
import 'katex/dist/katex.min.css'
import { axiosInstance } from '@/api/axiosInstance'
import { ChatContainer, ChatBox } from './styles' // 스타일 컴포넌트들을 별도 파일로 분리
import Message from './Message'
import InitialMessage from '@/app/chat/InitialMessage'
import ChatInput from './ChatInput'
import useAiTypeStore from '@/store/useAiTypeStore'

export interface PromptResponse {
  content: string
  role: string
}

const ChatPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [currentChatId, setCurrentChatId] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const aiType = useAiTypeStore(state => state.aiType)
  const { gptApiKey, claudeApiKey } = useApiKeyStore()
  const { createChat, addMessage, getAllMessages, getAllChatIds, clearChat } =
    useChatHistoryStore()

  // 채팅 초기화 훅
  useEffect(() => {
    const chatIds = getAllChatIds()
    const chatId = chatIds.length > 0 ? chatIds[0] : createChat()
    setCurrentChatId(chatId)
    setMounted(true)
  }, [createChat, getAllChatIds])

  const chats = currentChatId ? getAllMessages(currentChatId) : []

  // 메시지 제한 알림 훅
  useEffect(() => {
    if (chats.length === 8) {
      messageApi.open({
        type: 'info',
        content:
          '곧 메시지 제한에 도달합니다. 새로운 대화를 시작하시면 원활한 대화가 가능합니다.',
        duration: 5,
      })
    }
  }, [chats.length, messageApi])

  // 유틸리티 함수들
  const resetChat = () => currentChatId && clearChat(currentChatId)

  const showError = (message: string) => {
    messageApi.open({ type: 'error', content: message })
  }

  const validateSubmission = () => {
    if (aiType === 'claude' && !claudeApiKey) {
      showError('claude api key를 등록해주세요')
      return false
    }
    if (aiType === 'gpt' && !gptApiKey) {
      showError('gpt api key를 등록해주세요')
      return false
    }
    if (text.trim().length === 0) {
      showError('검색어를 입력해주세요.')
      return false
    }
    if (chats.length >= 10) {
      messageApi.open({
        type: 'warning',
        content: 'API 비용 절감을 위해 새로운 대화를 시작해주세요.',
        duration: 5,
      })
      return false
    }
    return true
  }

  // 메시지 전송 핸들러
  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e) e.preventDefault()
    if (!currentChatId || !validateSubmission()) return

    setIsLoading(true)

    const userMessage = {
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    }

    addMessage(currentChatId, userMessage)
    setText('')

    try {
      const messages = chats.map(({ role, content }) => ({ role, content }))
      const { role, content } = userMessage
      const response = await axiosInstance.post<PromptResponse>('/hwanvis', {
        apiKey: aiType === 'claude' ? claudeApiKey : gptApiKey,
        messages: [...messages, { role, content }],
        type: aiType,
      })

      addMessage(currentChatId, {
        role: response.data.role,
        content: response.data.content || '',
        timestamp: Date.now(),
      })
    } catch (error) {
      showError('죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.')
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

  if (!mounted) return null

  return (
    <ChatLayout
      resetChat={resetChat}
      currentChatId={currentChatId}
      onChatChange={setCurrentChatId}
    >
      {contextHolder}
      <ChatContainer>
        <ChatBox>
          {chats.length > 0 ? (
            chats.map((chat, index) => (
              <Message key={chat.timestamp} chat={chat} index={index} />
            ))
          ) : (
            <InitialMessage />
          )}
        </ChatBox>
        {isLoading && (
          <Flex gap="middle">
            <Spin tip="Loading" size="large">
              {'content'}
            </Spin>
          </Flex>
        )}
        <ChatInput
          text={text}
          setText={setText}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          keyComposingEvents={keyComposingEvents}
          handleKeyDown={handleKeyDown}
        />
      </ChatContainer>
    </ChatLayout>
  )
}

export default ChatPage
