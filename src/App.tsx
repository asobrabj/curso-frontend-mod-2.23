import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import ContainerMain from './components/ContainerMain'
import Header from './components/Header'
import Modal from './components/Modal'
import { LocalStorageProvider } from './context/localStorage/localStorage'
import { ModalProvider } from './context/modals'
import { GlobalStyle } from './styles/GlobalStyles'
import darkTheme from './styles/darkTheme'
import ligthTheme from './styles/ligthTeme'

export default function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const themeIsDark = window.localStorage.getItem('theme')
    if (themeIsDark) setIsDark(JSON.parse(themeIsDark))
  }, [])

  const changeTheme = () => {
    window.localStorage.setItem('theme', JSON.stringify(!isDark))
    setIsDark((v) => !v)
  }

  return (
    <ModalProvider>
      <LocalStorageProvider>
        <ThemeProvider theme={isDark ? darkTheme : ligthTheme}>
          <GlobalStyle />
          <Header isDark={isDark} changeTheme={changeTheme} />
          <ContainerMain isDark={isDark} changeTheme={changeTheme} />
          <Modal />
        </ThemeProvider>
      </LocalStorageProvider>
    </ModalProvider>
  )
}
