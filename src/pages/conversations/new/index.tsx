import { Box, TextField, Typography, useTheme } from '@mui/material'
import router from 'next/router'
import { MagnifyingGlass } from 'phosphor-react'
import { useCallback, useState, ChangeEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DefaultErrorMessage } from '../../../components/common/DefaultErrorMessage'
import { DefaultSkeleton } from '../../../components/common/DefaultSkeleton'
import { Spacer } from '../../../components/common/Spacer'
import { ListLayout } from '../../../components/layout/ListLayout'
import { Conversation } from '../../../types/conversation'
import { User } from '../../../types/user'
import { fetchUsers } from '../../users/queries'
import { UserList } from '../../users/_components/UserList'
import { loggedUserId } from '../../_app'
import { createConversation, fetchConversationsByUserId } from '../queries'
import { ROUTES_CONVERSATIONS } from '../routes'

const NewConversation = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const queryClient = useQueryClient()
  const theme = useTheme()
  const { data: conversations, isLoading: isLoadingConversations } = useQuery<
    Conversation[]
  >([fetchConversationsByUserId.name, loggedUserId], () =>
    fetchConversationsByUserId({ userId: loggedUserId }),
  )

  const { isLoading, isError, data } = useQuery<User[]>(
    fetchUsers.name,
    fetchUsers,
    {
      onSuccess(data) {
        if (data && filteredUsers.length === 0) {
          setFilteredUsers(data.filter((user) => user.id !== loggedUserId))
        }
      },
    },
  )

  const { mutate: createConversationMutation } = useMutation(
    createConversation,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([
          fetchConversationsByUserId.name,
          loggedUserId,
        ])

        // Redirect to new conversation
        router.push({
          pathname: ROUTES_CONVERSATIONS.DETAILS,
          query: { conversationId: data.id },
        })
      },
    },
  )

  const handleUserClick = useCallback(
    (userId: number) => {
      if (isLoadingConversations) return

      const existingConversation = conversations?.find(
        (conversation) =>
          conversation.recipientId === userId ||
          conversation.senderId === userId,
      )

      if (existingConversation) {
        // Redirect to existing conversation
        router.push({
          pathname: ROUTES_CONVERSATIONS.DETAILS,
          query: { conversationId: existingConversation.id },
        })
      } else {
        // Create a new one
        createConversationMutation({
          userId: loggedUserId,
          senderId: loggedUserId,
          recipientId: userId,
        })
      }
    },
    [conversations, createConversationMutation, isLoadingConversations],
  )

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isLoading) return

      const searchValue = e.target.value
      if (searchValue?.length === 0) {
        setFilteredUsers(data ?? [])
      } else {
        setFilteredUsers(
          data?.filter((user) => {
            return user.nickname
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          }),
        )
      }
    },
    [data, isLoading],
  )

  if (isError) {
    return <DefaultErrorMessage />
  }

  if (isLoading) {
    return <DefaultSkeleton />
  }

  return (
    <ListLayout>
      <ListLayout.Header>
        <Typography variant='h6'>Select a user from the list</Typography>
      </ListLayout.Header>

      <ListLayout.Content>
        <Box sx={{ padding: theme.spacing(2) }}>
          <UserList
            users={filteredUsers}
            isLoading={isLoading}
            onUserClick={handleUserClick}
          />
        </Box>
      </ListLayout.Content>

      <ListLayout.Footer>
        <TextField
          label='Search'
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            endAdornment: <MagnifyingGlass size={32} weight='light' />,
          }}
        />
      </ListLayout.Footer>
    </ListLayout>
  )
}

export default NewConversation
