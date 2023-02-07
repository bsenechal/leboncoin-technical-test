// material
import { CssBaseline } from '@mui/material'
import {
  createTheme,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material/styles'
import { ReactNode, useMemo } from 'react'

// hooks
import breakpoints from './breakpoints'
import palette from './palette'
import shadows, { customShadows } from './shadows'
//
import shape from './shape'
import typography from './typography'

// ----------------------------------------------------------------------

type ThemeConfigProps = {
  children: ReactNode
}

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: { ...palette.light, mode: 'light' },
      shape,
      typography,
      breakpoints,
      shadows: shadows.light,
      customShadows: customShadows.light,
    }),
    [],
  )

  const theme = createTheme(themeOptions)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
