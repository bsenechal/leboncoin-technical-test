import { Box, Typography, useTheme } from '@mui/material'
import { Spacer } from '../../../components/common/Spacer'
import { Message } from '../../../types/message'
import { MessageItem } from './MessageItem'

type MessagesListProps = {
  messages: Message[]
}

export const MessagesList = ({ messages }: MessagesListProps) => {
  const theme = useTheme()

  if (messages?.length === 0) {
    return (
      <>
        <Spacer />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: theme.spacing(2),
          }}
        >
          <Typography variant='subtitle1'>
            No message for the moment. Feel free to start a conversation
          </Typography>
        </Box>
      </>
    )
  }
  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      {messages?.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </Box>
  )
}
