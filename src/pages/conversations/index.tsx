import { Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import router from 'next/router'
import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { DefaultErrorMessage } from '../../components/common/DefaultErrorMessage'
import { ListLayout } from '../../components/layout/ListLayout'
import { Conversation } from '../../types/conversation'
import { loggedUserId } from '../_app'
import { deleteConversation, fetchConversationsByUserId } from './queries'
import { ROUTES_CONVERSATIONS } from './routes'
import { ConversationsList } from './_components/ConversationList'

const ConversationsPage = () => {
  const queryClient = useQueryClient()
  const { isError, data: conversations } = useQuery<Conversation[]>(
    [fetchConversationsByUserId.name, loggedUserId],
    () => fetchConversationsByUserId({ userId: loggedUserId }),
  )

  const { mutate: deleteConversationMutation } = useMutation(
    deleteConversation,
    {
      onSuccess: (data) => {
        queryClient.refetchQueries([
          fetchConversationsByUserId.name,
          loggedUserId,
        ])

        toast.error('Your conversation has been successfully deleted')
      },

      onError: () => {
        toast.error('There was an error while deleting. Please contact support')
      },
    },
  )

  const handleStartNewConversation = useCallback(() => {
    router.push(ROUTES_CONVERSATIONS.NEW)
  }, [])

  const handleConversationClick = useCallback((conversationId: number) => {
    router.push({
      pathname: ROUTES_CONVERSATIONS.DETAILS,
      query: { conversationId },
    })
  }, [])

  const handleDeleteConversation = useCallback(
    (conversationId: number) => {
      deleteConversationMutation({ conversationId })
    },
    [deleteConversationMutation],
  )

  if (isError) {
    return <DefaultErrorMessage />
  }

  return (
    <ListLayout>
      <ListLayout.Header>
        <Typography variant='h6'>Your latest conversations</Typography>
      </ListLayout.Header>
      <ListLayout.Content>
        <ConversationsList
          conversations={conversations}
          onConversationClick={handleConversationClick}
          onDeleteConversation={handleDeleteConversation}
        />
      </ListLayout.Content>

      <ListLayout.Footer>
        <Button
          variant='contained'
          onClick={handleStartNewConversation}
          size='large'
          fullWidth
        >
          Start a new conversation
        </Button>
      </ListLayout.Footer>
    </ListLayout>
  )
}

export default ConversationsPage
