import {
  Avatar,
  AvatarWrapper,
  MessageBubble,
  MessageWrapper,
  RoleText,
} from '@/app/chat/styles'
import React from 'react'
import useApiKeyStore from '@/store/useApiKeyStore'
import useAiTypeStore from '@/store/useAiTypeStore'

const InitialMessage = () => {
  const aiType = useAiTypeStore(state => state.aiType)
  const { gptApiKey, claudeApiKey } = useApiKeyStore()
  const isNotValidKey =
    (aiType === 'gpt' && !gptApiKey) || (aiType === 'claude' && !claudeApiKey)
  return (
    <MessageWrapper role={'hwanvis'}>
      <AvatarWrapper>
        <Avatar role={'hwanvis'}>{'H'}</Avatar>
        <RoleText>hwanvis</RoleText>
      </AvatarWrapper>
      <MessageBubble role={'hwanvis'}>
        {isNotValidKey ? '왼쪽 하단에서 API KEY를 등록해주세요.' : `반갑다냥`}
      </MessageBubble>
    </MessageWrapper>
  )
}

export default InitialMessage
