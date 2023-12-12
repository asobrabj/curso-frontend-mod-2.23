import { act, fireEvent, screen } from '@testing-library/react'
import App from './App'
import { renderTheme } from './utils/styles-test'

localStorage.clear()

describe('App Component', () => {
  it('renderiza o aplicativo sem erros', () => {
    renderTheme(<App />)
    expect(screen.getByText('Anotações')).toBeInTheDocument()
  })

  it('change theme', async () => {
    renderTheme(<App />)
    const initialTheme = true
    const handleTheme = screen.getAllByTestId('change theme')[0]
    act(() => {
      fireEvent.click(handleTheme)
    })
    const currentTime = localStorage.getItem('theme')
    const themeInLocalStorage = currentTime ? JSON.parse(currentTime) : []
    expect(themeInLocalStorage).toBe(!initialTheme)
  })
})
