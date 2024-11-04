import styled from '@emotion/styled'
import dynamic from 'next/dynamic'

export const ChatBox = styled.div`
  width: 100%;
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

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

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
`

export const InputBox = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 0;
`

export const MessageWrapper = styled.div<{ role: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  gap: 4px;
`

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2px;
`

export const Avatar = styled.div<{ role: string }>`
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

export const RoleText = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`

export const MessageBubble = styled.div<{ role: string }>`
  max-width: ${({ role }) => (role === 'user' ? '60%' : '100%')};
  padding: 10px 15px;
  border-radius: 15px;
  background-color: ${({ role }) => (role === 'user' ? '#B39DDB' : '#dedee8')};
  color: ${({ role }) => (role === 'user' ? 'white' : 'black')};
  text-align: ${({ role }) => (role === 'user' ? 'right' : 'left')};
  word-break: break-word;
`

export const ChatContainer = dynamic(
  () =>
    Promise.resolve(styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 90vh;
      max-width: 800px;
      padding: 12px;
      margin-left: 24px;
    `),
  { ssr: false },
)
