import { Box, Breakpoint, useTheme } from '@mui/material'
import { ReactElement } from 'react'

const useConvertMUISizeToPx = (size: string): string => {
  const theme = useTheme()
  switch (size) {
    case 'xxl':
      return `${theme.spacing(16)}`
    case 'xl':
      return `${theme.spacing(8)}`
    case 'lg':
      return `${theme.spacing(4)}`
    case 'md':
      return `${theme.spacing(2)}`
    case 'sm':
      return `${theme.spacing(1)}`
    case 'xs':
      return `${theme.spacing(0.5)}`
    default:
      return ''
  }
}

export enum SpacerType {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export const spacerSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
} as const

type SpacerProps = {
  type?: SpacerType
  size?: Breakpoint | 'xxl'
}

export function Spacer({
  type = SpacerType.vertical,
  size = spacerSize.md,
}: SpacerProps): ReactElement {
  const isVertical = type === 'vertical'
  const convertedSize = useConvertMUISizeToPx(size)

  return (
    <Box
      sx={{
        width: isVertical ? convertedSize : '100%',
        height: isVertical ? convertedSize : '100%',
      }}
    />
  )
}
