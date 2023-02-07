import { Box, useMediaQuery, useTheme } from '@mui/material'
import { formatDistance } from 'date-fns'
import { Conversation } from '../../../types/conversation'
import { loggedUserId } from '../../_app'
import { ConversationListItemButton } from './ConversationListItem'

const formatAdditionalInfos = (isMobile: boolean, timestamp: number) => {
  const formattedDate = formatDistance(timestamp, new Date(), {
    addSuffix: true,
  })
  return isMobile ? formattedDate : `Last message sent ${formattedDate}`
}

type ConversationsListProps = {
  conversations: Conversation[]
  onConversationClick: (conversationId: number) => void
  onDeleteConversation: (conversationId: number) => void
}

export const ConversationsList = ({
  conversations,
  onConversationClick,
  onDeleteConversation,
}: ConversationsListProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        padding: theme.spacing(2),
      }}
    >
      {conversations?.map((conversation) => {
        const userNickname =
          conversation.senderId === loggedUserId
            ? conversation.recipientNickname
            : conversation.senderNickname
        return (
          <ConversationListItemButton
            key={conversation.id}
            userNickname={userNickname}
            additionalInfos={formatAdditionalInfos(
              isMobile,
              conversation.lastMessageTimestamp,
            )}
            conversationId={conversation.id}
            onConversationClick={onConversationClick}
            onDeleteConversation={onDeleteConversation}
          />
        )
      })}
    </Box>
  )
}
