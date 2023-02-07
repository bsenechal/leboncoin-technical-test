import { Skeleton } from '@mui/material'
import { Spacer } from './Spacer'

export const DefaultSkeleton = () => {
  return (
    <>
      <Skeleton />

      <Spacer />

      <Skeleton />

      <Spacer />

      <Skeleton />
    </>
  )
}
