import { Box, Typography, useTheme } from '@mui/material'
import { Bug } from 'phosphor-react'
import { Spacer } from './Spacer'

type DefaultErrorMessageProps = {
  errorMessage?: string
}
export const DefaultErrorMessage = ({
  errorMessage,
}: DefaultErrorMessageProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '30vh',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Bug
        size={theme.spacing(12)}
        weight='light'
        color={theme.palette.primary.main}
      />
      <Spacer />
      <Typography variant='h6'>
        {errorMessage ??
          'Oh no! an error has occurred. Please try again or contact our support'}
      </Typography>
    </Box>
  )
}
