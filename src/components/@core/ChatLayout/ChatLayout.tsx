import { CopyOutlined } from '@ant-design/icons'
import { PropsWithChildren, useState } from 'react'
import HwanvisLogoIcon from '@/assets/svg/hwanvis-logo.svg'
import TokenIcon from '@/assets/svg/iost-token.svg'
import { Button, Flex, message } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Input from 'antd/es/input/Input'
import useApiKeyStore from '@/store/useApiKeyStore'
import useChatHistoryStore from '@/store/useChatHistoryStore'
import { formatDateTime } from '@/utils/formatDateTime'

interface ApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (key: string) => void
  currentApiKey: string | null
  inputValue: string
  setInputValue: (value: string) => void
}

const ApiKeyModal = ({
  isOpen,
  onClose,
  onSubmit,
  currentApiKey,
  inputValue,
  setInputValue,
}: ApiKeyModalProps) => {
  const [messageApi, contextHolder] = message.useMessage()

  const handleCopyClick = async () => {
    if (currentApiKey) {
      try {
        await navigator.clipboard.writeText(currentApiKey)
        messageApi.success('API Key가 클립보드에 복사되었습니다.')
      } catch {
        messageApi.error('복사에 실패했습니다.')
      }
    }
  }

  return (
    <Modal
      title={
        <div css={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          API Key {currentApiKey ? '수정' : '등록'}
        </div>
      }
      open={isOpen}
      okText={'등록'}
      cancelText={'취소'}
      onOk={() => onSubmit(inputValue)}
      onCancel={onClose}
    >
      {contextHolder}
      <div css={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="API Key를 입력하세요"
          css={{ marginBottom: '8px' }}
        />

        {currentApiKey && (
          <div
            css={{
              backgroundColor: '#1a1918',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #424242',
            }}
          >
            <div
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <span css={{ color: '#888', fontSize: '0.9rem' }}>
                현재 API Key
              </span>
              <Button
                type="text"
                icon={<CopyOutlined />}
                onClick={handleCopyClick}
                size="small"
                css={{ color: '#888' }}
              >
                복사
              </Button>
            </div>
            <div
              css={{
                backgroundColor: '#2a2928',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '0.9rem',
                color: '#87d068',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
              }}
            >
              {currentApiKey}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

interface ChatLayoutProps extends PropsWithChildren {
  resetChat: () => void
  currentChatId: number | null
  onChatChange: (chatId: number) => void
}

const ChatLayout = ({
  children,
  resetChat,
  currentChatId,
  onChatChange,
}: ChatLayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const setApiKey = useApiKeyStore(state => state.setApiKey)
  const apiKey = useApiKeyStore(state => state.apiKey)
  const { createChat, getAllChatIds, deleteChat } = useChatHistoryStore()

  const chatIds = getAllChatIds()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (inputValue.trim()) {
      setApiKey(inputValue)
      setInputValue('')
      setIsModalOpen(false)
    }
  }

  const handleCreateChat = () => {
    const newChatId = createChat()
    onChatChange(newChatId)
  }

  const handleDeleteChat = (chatId: number) => {
    deleteChat(chatId)
    if (currentChatId === chatId) {
      // 현재 채팅방이 삭제되면 가장 최근 채팅방으로 이동
      const remainingChatIds = getAllChatIds()
      if (remainingChatIds.length > 0) {
        onChatChange(remainingChatIds[0])
      }
    }
  }

  return (
    <div
      css={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div
        css={{
          width: '200px',
          backgroundColor: '#161514',
          padding: '32px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderRight: 'solid 1px #424242',
        }}
      >
        <div>
          <HwanvisLogoIcon />
        </div>

        {/* 채팅방 목록 */}
        <div
          css={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Button
            onClick={handleCreateChat}
            type="primary"
            css={{
              width: '100%',
              marginBottom: '12px',
            }}
          >
            + 새로운 대화
          </Button>

          {chatIds.map(chatId => (
            <Button
              key={chatId}
              onClick={() => onChatChange(chatId)}
              type={currentChatId === chatId ? 'primary' : 'default'}
              variant={'outlined'}
              css={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Flex
                justify="space-between"
                align="center"
                style={{ width: '100%' }}
              >
                <span>대화 {formatDateTime(chatId)}</span>
                {chatIds.length > 1 && (
                  <Button
                    size="small"
                    danger
                    type={'text'}
                    onClick={e => {
                      e.stopPropagation()
                      handleDeleteChat(chatId)
                    }}
                  >
                    x
                  </Button>
                )}
              </Flex>
            </Button>
          ))}
        </div>

        {/* API Key 버튼 */}
        <div>
          <Button
            onClick={showModal}
            type={'primary'}
            variant={'solid'}
            css={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
            }}
          >
            <TokenIcon width={32} height={32} />
            <p>{!apiKey ? 'API Key 등록' : 'API Key 수정'}</p>
          </Button>
        </div>
      </div>

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1A1918',
          flex: 1,
        }}
      >
        <div
          css={{
            height: '50px',
            padding: '12px 24px',
            borderBottom: 'solid 1px #424242',
          }}
        >
          <Button color="primary" variant="outlined" onClick={resetChat}>
            초기화
          </Button>
        </div>
        <div>{children}</div>
      </div>

      <ApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOk}
        currentApiKey={apiKey}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  )
}

export default ChatLayout
