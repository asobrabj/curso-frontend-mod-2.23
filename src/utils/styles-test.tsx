import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/darkTheme'

export const renderTheme = (Children: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}> {Children} </ThemeProvider>)
}
