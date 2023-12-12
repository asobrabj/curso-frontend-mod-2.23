import { fireEvent, screen } from '@testing-library/react'
import Header from '.'
import { renderTheme } from '../../utils/styles-test'

jest.mock('../../context/localStorage/localStorage', () => ({
  useStorage: jest.fn(() => ({
    anotations: [],
    setAnotations: jest.fn(),
    getStorage: jest.fn(),
    getFilters: jest.fn(),
  })),
}))

describe('Header Component', () => {
  test('Renderiza o componente corretamente', () => {
    renderTheme(<Header changeTheme={() => {}} isDark={false} />)

    expect(screen.getByText('Anotações')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('filtrar anotações')).toBeInTheDocument()
    expect(screen.getByTitle('change theme')).toBeInTheDocument()
    expect(screen.getByTitle('new-anotation')).toBeInTheDocument()
  })
  test('Chama a função changeTheme quando o botão de troca de tema é clicado', () => {
    const changeThemeMock = jest.fn()
    renderTheme(<Header changeTheme={changeThemeMock} isDark={false} />)

    fireEvent.click(screen.getByTitle('change theme'))

    expect(changeThemeMock).toHaveBeenCalledTimes(1)
  })
  it('snapshot', () => {
    const { container } = renderTheme(<Header />)
    expect(container).toMatchSnapshot()
  })
})
