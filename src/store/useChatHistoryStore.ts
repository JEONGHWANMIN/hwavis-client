import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GptMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatHistoryState {
  messages: Record<number, GptMessage[]>
  createChat: () => number
  addMessage: (chatId: number, message: GptMessage) => void
  clearChat: (chatId: number) => void
  getAllMessages: (chatId: number) => GptMessage[]
  getAllChatIds: () => number[]
  deleteChat: (chatId: number) => void
}

const MAX_CHAT_ROOMS = 15
const generateUniqueId = (): number => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return Number(`${timestamp}${random.toString().padStart(3, '0')}`)
}

const useChatHistoryStore = create<ChatHistoryState>()(
  persist(
    (set, get) => ({
      messages: {
        [generateUniqueId()]: [],
      },

      createChat: () => {
        const state = get()
        const chatIds = state.getAllChatIds()

        // 채팅방이 15개 이상이면 가장 오래된 채팅방을 삭제
        if (chatIds.length >= MAX_CHAT_ROOMS) {
          const oldestChatId = chatIds[chatIds.length - 1]
          state.deleteChat(oldestChatId)
        }

        const newId = generateUniqueId()
        set(state => ({
          messages: {
            ...state.messages,
            [newId]: [],
          },
        }))
        return newId
      },

      addMessage: (chatId: number, message: GptMessage) =>
        set(state => ({
          messages: {
            ...state.messages,
            [chatId]: [...(state.messages[chatId] || []), message],
          },
        })),

      deleteChat: (chatId: number) =>
        set(state => {
          const chatIds = Object.keys(state.messages)

          if (chatIds.length <= 1) {
            return state
          }

          const { [chatId]: _deletedChat, ...restMessages } = state.messages

          if (_deletedChat && Object.keys(restMessages).length === 0) {
            return state
          }

          return {
            messages: restMessages,
          }
        }),

      clearChat: (chatId: number) =>
        set(state => ({
          messages: {
            ...state.messages,
            [chatId]: [],
          },
        })),

      getAllMessages: (chatId: number) => {
        const state = get()
        return state.messages[chatId] || []
      },

      getAllChatIds: () => {
        const state = get()
        return Object.keys(state.messages)
          .map(Number)
          .sort((a, b) => b - a) // 최신 순으로 정렬
      },
    }),
    {
      name: 'chat-history',
    },
  ),
)

export default useChatHistoryStore
