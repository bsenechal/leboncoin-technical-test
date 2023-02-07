import { Container } from '@mui/material'
import { ReactElement } from 'react'

type DefaultLayoutProps = {
  children: ReactElement
}
export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Container
      disableGutters
      maxWidth='md'
      sx={{
        border: '1px solid',
        borderColor: 'grey.200',
        height: '100vh',
      }}
    >
      {children}
    </Container>
  )
}
