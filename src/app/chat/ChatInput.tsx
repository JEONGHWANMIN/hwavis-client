import React, { FormEvent, KeyboardEvent } from 'react'
import useKeyComposing from '@/hooks/useKeyComposing'
import { InputBox } from '@/app/chat/styles'
import TextArea from 'antd/es/input/TextArea'
import { Button } from 'antd'
import SearchIcon from '@/assets/svg/search-icon.svg'

interface ChatInputProps {
  text: string
  setText: (text: string) => void
  isLoading: boolean
  onSubmit: (
    e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>,
  ) => void
  keyComposingEvents: ReturnType<typeof useKeyComposing>['keyComposingEvents']
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void
}

const ChatInput = ({
  text,
  setText,
  isLoading,
  onSubmit,
  keyComposingEvents,
  handleKeyDown,
}: ChatInputProps) => {
  return (
    <InputBox>
      <form onSubmit={onSubmit}>
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
            overflow: 'hidden',
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
  )
}

export default ChatInput
