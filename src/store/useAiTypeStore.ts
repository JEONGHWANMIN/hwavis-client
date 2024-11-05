import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AiType = 'gpt' | 'claude'

interface AiTypeState {
  aiType: AiType
  setAiType: (type: AiType) => void
}

const useAiTypeStore = create<AiTypeState>()(
  persist(
    set => ({
      aiType: 'gpt',
      setAiType: type => set({ aiType: type }),
    }),
    {
      name: 'ai-type-storage',
    },
  ),
)

export default useAiTypeStore
