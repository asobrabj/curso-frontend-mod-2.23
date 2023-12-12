import { fireEvent, screen } from '@testing-library/react'
import ContainerMain from '.'
import { LocalStorageProvider } from '../../context/localStorage/localStorage'
import { ModalProvider } from '../../context/modals'
import { renderTheme } from '../../utils/styles-test'

jest.mock('../../context/localStorage/localStorage', () => {
  const originalModule = jest.requireActual(
    '../../context/localStorage/localStorage'
  )

  const mockUseStorage = jest.fn(() => ({
    ...originalModule,
    getFilters: jest.fn(),
  }))

  return {
    ...originalModule,
    useStorage: mockUseStorage,
  }
})
describe('ContainerMain Component', () => {
  it('deve renderizar corretamente', () => {
    const { container } = renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <ContainerMain changeTheme={() => {}} isDark={false} />
        </LocalStorageProvider>
      </ModalProvider>
    )

    expect(container.querySelector('.container')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTitle('container-cards')).toBeInTheDocument()
  })

  it('deve chamar a função changeTheme ao ser clicado', () => {
    const changeThemeMock = jest.fn()
    renderTheme(<ContainerMain changeTheme={changeThemeMock} isDark={false} />)

    fireEvent.click(screen.getByTitle('change theme'))

    expect(changeThemeMock).toHaveBeenCalled()
  })
  it('snapshot', () => {
    const { container } = renderTheme(
      <ModalProvider>
        <ContainerMain />
      </ModalProvider>
    )
    expect(container).toMatchSnapshot()
  })
})
