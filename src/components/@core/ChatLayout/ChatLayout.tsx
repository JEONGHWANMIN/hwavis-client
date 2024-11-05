import { CopyOutlined } from '@ant-design/icons'
import { PropsWithChildren, useState } from 'react'
import HwanvisLogoIcon from '@/assets/svg/hwanvis-logo.svg'
import TokenIcon from '@/assets/svg/iost-token.svg'
import { Button, Flex, message, Select, Space } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Input from 'antd/es/input/Input'
import useApiKeyStore from '@/store/useApiKeyStore'
import useChatHistoryStore from '@/store/useChatHistoryStore'
import { formatDateTime } from '@/utils/formatDateTime'
import useAiTypeStore from '@/store/useAiTypeStore'

interface ApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (gptKey: string, claudeKey: string) => void
}

const ApiKeyModal = ({ isOpen, onClose, onSubmit }: ApiKeyModalProps) => {
  const { gptApiKey, claudeApiKey } = useApiKeyStore()
  const [gptInput, setGptInput] = useState(gptApiKey)
  const [claudeInput, setClaudeInput] = useState(claudeApiKey)
  const [messageApi, contextHolder] = message.useMessage()

  const handleCopyClick = async (key: string, type: string) => {
    try {
      await navigator.clipboard.writeText(key)
      messageApi.success(`${type} API Key가 클립보드에 복사되었습니다.`)
    } catch {
      messageApi.error('복사에 실패했습니다.')
    }
  }

  return (
    <Modal
      title={
        <div css={{ fontSize: '1.2rem', fontWeight: 'bold' }}>API Key 설정</div>
      }
      open={isOpen}
      okText={'등록'}
      cancelText={'취소'}
      onOk={() => onSubmit(gptInput, claudeInput)}
      onCancel={onClose}
    >
      {contextHolder}
      <div css={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* GPT API Key Section */}
        <div>
          <div css={{ marginBottom: '8px', fontWeight: 'bold' }}>
            GPT API Key
          </div>
          <Input
            value={gptInput}
            onChange={e => setGptInput(e.target.value)}
            placeholder="GPT API Key를 입력하세요"
            css={{ marginBottom: '8px' }}
          />
          {gptApiKey && (
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
                  현재 GPT API Key
                </span>
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopyClick(gptApiKey, 'GPT')}
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
                {gptApiKey}
              </div>
            </div>
          )}
        </div>

        {/* Claude API Key Section */}
        <div>
          <div css={{ marginBottom: '8px', fontWeight: 'bold' }}>
            Claude API Key
          </div>
          <Input
            value={claudeInput}
            onChange={e => setClaudeInput(e.target.value)}
            placeholder="Claude API Key를 입력하세요"
            css={{ marginBottom: '8px' }}
          />
          {claudeApiKey && (
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
                  현재 Claude API Key
                </span>
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopyClick(claudeApiKey, 'Claude')}
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
                {claudeApiKey}
              </div>
            </div>
          )}
        </div>
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
  const { createChat, getAllChatIds, deleteChat } = useChatHistoryStore()

  const { aiType, setAiType } = useAiTypeStore()
  const aiOptions = [
    { value: 'gpt', label: 'GPT-4o' },
    { value: 'claude', label: 'Claude-3.5-sonnet' },
  ]

  const chatIds = getAllChatIds()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const { setGptApiKey, setClaudeApiKey, hasAllKeys } = useApiKeyStore()

  const handleOk = (gptKey: string, claudeKey: string) => {
    setGptApiKey(gptKey)
    setClaudeApiKey(claudeKey)
    setIsModalOpen(false)
    message.success('API Key가 등록되었습니다.')
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
            <p>{hasAllKeys() ? 'API Key 수정' : 'API Key 등록'}</p>
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            <Button color="primary" variant="outlined" onClick={resetChat}>
              초기화
            </Button>
            <Select
              value={aiType}
              onChange={setAiType}
              options={aiOptions}
              css={{
                width: '200px',
                '.ant-select-selector': {
                  backgroundColor: '#2a2928 !important',
                  borderColor: '#424242 !important',
                },
                '.ant-select-selection-item': {
                  color: '#fff !important',
                },
              }}
            />
          </Space>
        </div>
        <div>{children}</div>
      </div>

      <ApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOk}
      />
    </div>
  )
}

export default ChatLayout
