import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Popover,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useCallback } from 'react'

import { Spacer } from './Spacer'

type ConfirmationButtonProps = {
  onConfirmClick: () => void
} & ButtonProps

export const ConfirmationButton = ({
  onConfirmClick,
  ...buttonProps
}: ConfirmationButtonProps) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    },
    [],
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <IconButton {...buttonProps} onClick={handleClick} />

      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Box sx={{ padding: theme.spacing(2) }}>
          <Typography sx={{ p: 2 }}>Do you really want to continue?</Typography>

          <Spacer />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button onClick={handleClose} variant='outlined'>
              Cancel
            </Button>

            <Button onClick={onConfirmClick} variant='contained'>
              Confirm
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  )
}
