import { List, ListProps } from '@mui/material'
import { DefaultSkeleton } from '../../../components/common/DefaultSkeleton'
import { User } from '../../../types/user'
import { UserListItemButton } from './UserListItem'

type UserListProps = {
  users: User[]
  isLoading?: boolean
  onUserClick: (userId: number) => void
} & ListProps

export const UserList = ({
  users,
  isLoading,
  onUserClick,
  ...listProps
}: UserListProps) => {
  if (isLoading) {
    return <DefaultSkeleton />
  }

  return (
    <List
      {...listProps}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {users?.map((user) => (
        <UserListItemButton
          key={user.id}
          userNickname={user.nickname}
          userId={user.id}
          onUserClick={onUserClick}
        />
      ))}
    </List>
  )
}
