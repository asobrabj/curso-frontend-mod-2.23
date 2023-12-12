import { fireEvent, screen } from '@testing-library/react'
import Search from '.'
import { useStorage } from '../../context/localStorage/localStorage'
import { renderTheme } from '../../utils/styles-test'

jest.mock('../../context/localStorage/localStorage', () => ({
  useStorage: jest.fn(() => ({ getFilters: jest.fn() })),
}))

describe('Search Component', () => {
  it('deve renderizar corretamente', () => {
    renderTheme(<Search />)
    const inputElement = screen.getByPlaceholderText('filtrar anotações')
    expect(inputElement).toBeInTheDocument()
  })

  it('deve chamar getFilters ao digitar no input', () => {
    const mockGetFilters = jest.fn()
    useStorage.mockReturnValue({ getFilters: mockGetFilters })

    renderTheme(<Search />)
    const inputElement = screen.getByPlaceholderText('filtrar anotações')

    fireEvent.change(inputElement, { target: { value: 'filtro' } })

    expect(mockGetFilters).toHaveBeenCalledWith('filtro')
  })

  it('deve atualizar o estado do input corretamente', () => {
    renderTheme(<Search />)
    const inputElement = screen.getByPlaceholderText(
      'filtrar anotações'
    ) as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: 'filtro' } })

    expect(inputElement.value).toBe('filtro')
  })
  it('snapshot', () => {
    const { container } = renderTheme(<Search />)
    expect(container).toMatchSnapshot()
  })
})
