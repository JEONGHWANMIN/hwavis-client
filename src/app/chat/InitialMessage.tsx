import {
  Avatar,
  AvatarWrapper,
  MessageBubble,
  MessageWrapper,
  RoleText,
} from '@/app/chat/styles'
import React from 'react'

const InitialMessage = () => (
  <MessageWrapper role={'hwanvis'}>
    <AvatarWrapper>
      <Avatar role={'hwanvis'}>{'H'}</Avatar>
      <RoleText>hwanvis</RoleText>
    </AvatarWrapper>
    <MessageBubble role={'hwanvis'}>
      환비스에게 궁금한것을 물어보세요
    </MessageBubble>
  </MessageWrapper>
)

export default InitialMessage
