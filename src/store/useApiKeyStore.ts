import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ApiKeyState {
  gptApiKey: string
  claudeApiKey: string
  setGptApiKey: (key: string) => void
  setClaudeApiKey: (key: string) => void
  hasAllKeys: () => boolean
}

const useApiKeyStore = create<ApiKeyState>()(
  persist(
    (set, get) => ({
      gptApiKey: '',
      claudeApiKey: '',
      setGptApiKey: (key: string) => set({ gptApiKey: key }),
      setClaudeApiKey: (key: string) => set({ claudeApiKey: key }),
      hasAllKeys: () => {
        const state = get()
        return state.gptApiKey.length > 0 && state.claudeApiKey.length > 0
      },
    }),
    {
      name: 'api-key-storage',
    },
  ),
)

export default useApiKeyStore
