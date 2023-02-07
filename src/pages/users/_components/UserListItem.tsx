import {
  Avatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { useCallback } from 'react'

type UserListItemProps = {
  userNickname: string
  userId: number
  additionalInfos?: string
  onUserClick: (userId: number) => void
} & ListItemButtonProps

export const UserListItemButton = ({
  userNickname,
  userId,
  additionalInfos,
  onUserClick,
  ...listItemButton
}: UserListItemProps) => {
  const avatarLetter = userNickname.substring(0, 1)
  const theme = useTheme()

  const handleClick = useCallback(() => {
    onUserClick(userId)
  }, [onUserClick, userId])

  return (
    <ListItemButton
      {...listItemButton}
      onClick={handleClick}
      sx={{
        display: 'flex',
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
      }}
    >
      <ListItemIcon sx={{ flex: '20%' }}>
        <Avatar>{avatarLetter}</Avatar>
      </ListItemIcon>

      <ListItemText
        sx={{ flex: '80%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant='subtitle1'>{userNickname}</Typography>
        {additionalInfos && (
          <Typography variant='body2'>{additionalInfos}</Typography>
        )}
      </ListItemText>
    </ListItemButton>
  )
}
