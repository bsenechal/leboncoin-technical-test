import { Box, BoxProps, useTheme } from '@mui/material'

export const ListLayout = (props: BoxProps) => {
  return <Box {...props} />
}

const Header = (props: BoxProps) => {
  const theme = useTheme()

  return (
    <Box
      {...props}
      sx={{
        borderTop: '2px solid',
        borderColor: theme.palette.common.black,
        padding: theme.spacing(2),
        height: theme.spacing(11),
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'grey.200',
        ...props.sx,
      }}
    />
  )
}

const Content = (props: BoxProps) => {
  const theme = useTheme()

  return (
    <Box
      {...props}
      sx={{
        height: `calc(100vh - ${theme.spacing(22)})`,
        overflowY: 'auto',
        ...props.sx,
      }}
    />
  )
}

const Footer = (props: BoxProps) => {
  const theme = useTheme()

  return (
    <Box
      {...props}
      sx={{
        padding: theme.spacing(2),
        height: theme.spacing(11),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        ...props.sx,
      }}
    />
  )
}

ListLayout.Header = Header
ListLayout.Footer = Footer
ListLayout.Content = Content
