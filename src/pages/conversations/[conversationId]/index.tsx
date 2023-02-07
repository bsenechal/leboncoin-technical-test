import {
  IconButton,
  Skeleton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { formatDistance } from 'date-fns'
import { useRouter } from 'next/router'
import { PaperPlaneTilt } from 'phosphor-react'
import { ChangeEvent, useCallback, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DefaultErrorMessage } from '../../../components/common/DefaultErrorMessage'
import { DefaultSkeleton } from '../../../components/common/DefaultSkeleton'
import { ListLayout } from '../../../components/layout/ListLayout'
import { Message } from '../../../types/message'
import { User } from '../../../types/user'
import {
  createMessage,
  fetchMessagesByConversationId,
} from '../../messages/queries'
import { MessagesList } from '../../messages/_components/MessagesList'
import { fetchUser } from '../../users/queries'
import { loggedUserId } from '../../_app'

const ConversationDetails = () => {
  const router = useRouter()
  const [message, setMessage] = useState<string>('')
  const queryClient = useQueryClient()
  const conversationId = parseInt(router.query.conversationId as string, 10)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const { mutate: createMessageMutation, isLoading: isSendingMessage } =
    useMutation(createMessage, {
      onSuccess: () => {
        queryClient.refetchQueries([
          fetchMessagesByConversationId.name,
          conversationId,
        ])

        setMessage('')
      },
    })
  const {
    isLoading: isLoadingMessages,
    isError: isErrorMessages,
    data: messages,
  } = useQuery<Message[]>(
    [fetchMessagesByConversationId.name, conversationId],
    () => fetchMessagesByConversationId({ conversationId }),
    {
      enabled: !!conversationId,
    },
  )

  const lastMessage = messages
    ?.sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 1)?.[0]
  const interlocutorId = messages?.find(
    (message) => message.authorId !== loggedUserId,
  )?.authorId

  const {
    isLoading: isLoadingInterlocutor,
    isError: isErrorInterlocutor,
    data: interlocutor,
  } = useQuery<User>(
    [fetchUser.name, interlocutorId],
    () => fetchUser({ userId: interlocutorId }),
    {
      enabled: !!interlocutorId,
    },
  )

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setMessage(e.target.value ?? '')
    },
    [setMessage],
  )

  const handleSendMessage = useCallback(() => {
    if (message.length === 0) return

    createMessageMutation({
      conversationId,
      body: message,
      authorId: loggedUserId,
    })
  }, [conversationId, createMessageMutation, message])

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  if (isErrorMessages) {
    return <DefaultErrorMessage />
  }

  if (isLoadingMessages) {
    return <DefaultSkeleton />
  }

  return (
    <ListLayout>
      <ListLayout.Header sx={{ justifyContent: 'space-between' }}>
        {isLoadingInterlocutor ? (
          <Skeleton />
        ) : (
          <>
            {interlocutor?.nickname && (
              <Typography variant='h6'>
                {interlocutor?.nickname} - You
              </Typography>
            )}
          </>
        )}

        {messages?.length > 0 && lastMessage?.timestamp && isDesktop && (
          <Typography variant='h6'>{`Last message ${formatDistance(
            lastMessage.timestamp,
            new Date(),
            {
              addSuffix: true,
            },
          )}`}</Typography>
        )}
      </ListLayout.Header>

      <ListLayout.Content>
        <MessagesList messages={messages} />
      </ListLayout.Content>

      <ListLayout.Footer>
        <TextField
          fullWidth
          label='Send message'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={message}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleSendMessage}
                disabled={isSendingMessage || message.length === 0}
                color='primary'
                data-testid='send-message-button'
              >
                <PaperPlaneTilt size={32} weight='light' />
              </IconButton>
            ),
          }}
        />
      </ListLayout.Footer>
    </ListLayout>
  )
}

export default ConversationDetails
