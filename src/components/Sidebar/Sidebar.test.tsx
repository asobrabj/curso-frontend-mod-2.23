import { screen } from '@testing-library/react'
import Sidebar from '.'
import dataList from '../../model/list'
import { renderTheme } from '../../utils/styles-test'

jest.mock('../../context/localStorage/localStorage', () => ({
  ...jest.requireActual('../../context/localStorage/localStorage'),
  useStorage: () => ({
    getFilters: jest.fn(),
  }),
}))

describe('Sidebar Component', () => {
  const mockChangeTheme = jest.fn()

  it('deve renderizar corretamente', () => {
    renderTheme(<Sidebar changeTheme={mockChangeTheme} isDark={false} />)

    const sidebarElement = screen.getByTestId('sidebar')
    expect(sidebarElement).toBeInTheDocument()

    dataList.forEach((item) => {
      const listElement = screen.getByText(item.name)
      expect(listElement).toBeInTheDocument()
    })

    const searchElement = screen.getByPlaceholderText('filtrar anotações')
    expect(searchElement).toBeInTheDocument()

    const newAnotationElement = screen.getByTitle('new-anotation')
    expect(newAnotationElement).toBeInTheDocument()

    const changeThemeElement = screen.getByTitle(/icon theme/i)
    expect(changeThemeElement).toBeInTheDocument()
  })

  it('snapshot', () => {
    const { container } = renderTheme(
      <Sidebar changeTheme={mockChangeTheme} isDark={false} />
    )

    expect(container).toMatchSnapshot()
  })
})
