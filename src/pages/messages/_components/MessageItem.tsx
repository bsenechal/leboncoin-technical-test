import { Box, Skeleton, Typography, useTheme } from '@mui/material'
import { MUIStyledCommonProps } from '@mui/system'
import { useQuery } from 'react-query'
import { Message } from '../../../types/message'
import { User } from '../../../types/user'
import { fetchUser } from '../../users/queries'
import { loggedUserId } from '../../_app'

type MessageItemProps = {
  message: Message
}
export const MessageItem = ({ message }: MessageItemProps) => {
  const theme = useTheme()

  const {
    isLoading,
    isError,
    data: author,
  } = useQuery<User>([fetchUser.name, message.authorId], () =>
    fetchUser({ userId: message.authorId }),
  )

  const isMessageAuthorCurrentUser = loggedUserId === author?.id

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: isMessageAuthorCurrentUser
            ? 'flex-end'
            : 'flex-start',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {author?.nickname && !isMessageAuthorCurrentUser && (
                <Typography variant='subtitle2'>{author?.nickname}</Typography>
              )}
            </>
          )}

          <Box
            sx={{
              border: `1px solid ${theme.palette.grey[100]}`,
              borderRadius: theme.shape.borderRadius,
              width: 'fit-content',
              ...(isMessageAuthorCurrentUser
                ? {
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.primary.light,
                  }
                : {
                    color: theme.palette.common.black,
                    backgroundColor: 'grey.300',
                  }),
              padding: theme.spacing(1, 2),
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography variant='body2'>{message.body}</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
