import { PropsWithChildren, useState } from 'react'
import HwanvisLogoIcon from '@/assets/svg/hwanvis-logo.svg'
import TokenIcon from '@/assets/svg/iost-token.svg'
import { Button } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Input from 'antd/es/input/Input'
import useApiKeyStore from '@/store/useApiKeyStore'

interface ChatLayoutProps extends PropsWithChildren {
  resetChat: () => void
}

const ChatLayout = ({ children, resetChat }: ChatLayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const setApiKey = useApiKeyStore(state => state.setApiKey)
  const apiKey = useApiKeyStore(state => state.apiKey)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setApiKey(inputValue)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
          width: '120px',
          backgroundColor: '#161514',
          padding: '32px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: 'solid 1px #424242',
        }}
      >
        <div>
          <HwanvisLogoIcon />
        </div>
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
            + 대화 초기화
          </Button>
        </div>
        <div>{children}</div>
      </div>
      <Modal
        title="Api key 등록"
        open={isModalOpen}
        okText={'등록'}
        cancelText={'취소'}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="API Key를 입력하세요"
        />
        {apiKey && (
          <div>
            <div>현재 키</div>
            <div>{apiKey}</div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ChatLayout
