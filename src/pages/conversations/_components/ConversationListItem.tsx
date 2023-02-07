import {
  Avatar,
  Box,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { Trash } from 'phosphor-react'
import { useCallback } from 'react'
import { ConfirmationButton } from '../../../components/common/ConfirmationButton'

type ConversationListItemProps = {
  userNickname: string
  conversationId: number
  additionalInfos?: string
  onDeleteConversation: (conversationId: number) => void
  onConversationClick: (conversationId: number) => void
} & ListItemButtonProps

export const ConversationListItemButton = ({
  userNickname,
  conversationId,
  additionalInfos,
  onConversationClick,
  onDeleteConversation,
  ...listItemButton
}: ConversationListItemProps) => {
  const avatarLetter = userNickname.substring(0, 1)
  const theme = useTheme()

  const handleClick = useCallback(() => {
    onConversationClick(conversationId)
  }, [onConversationClick, conversationId])

  const handleDeleteClick = useCallback(() => {
    onDeleteConversation(conversationId)
  }, [conversationId, onDeleteConversation])

  return (
    <ListItemButton
      {...listItemButton}
      sx={{
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: theme.shape.borderRadius,
      }}
      data-testid={`conversation-${conversationId}`}
    >
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          padding: theme.spacing(2),
        }}
      >
        <ListItemIcon sx={{ flex: '20%' }}>
          <Avatar>{avatarLetter}</Avatar>
        </ListItemIcon>
        <ListItemText
          sx={{ flex: '75%', display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant='subtitle1'>{userNickname}</Typography>
          {additionalInfos && (
            <Typography variant='body2'>{additionalInfos}</Typography>
          )}
        </ListItemText>
      </Box>

      <Box sx={{ flex: '5%' }}>
        <ConfirmationButton onConfirmClick={handleDeleteClick}>
          <Trash />
        </ConfirmationButton>
      </Box>
    </ListItemButton>
  )
}
