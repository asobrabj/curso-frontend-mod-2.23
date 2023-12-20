import { fireEvent, screen } from '@testing-library/react'
import Search from '.'
import { ILocalStorageContext } from '../../context/localStorage/localStorage'
import { renderTheme } from '../../utils/styles-test'

const mockStorage: ILocalStorageContext = {
  anotations: [],
  setAnotations: jest.fn(),
  getFilters: jest.fn(),
  getTags: jest.fn(),
  getStorage: jest.fn(),
  setStorage: jest.fn(),
}

jest.mock('../../context/localStorage/localStorage', () => ({
  useStorage: jest.fn(() => mockStorage),
}))


describe('Search Component', () => {
  it('deve renderizar corretamente', () => {
    renderTheme(<Search />)
    const inputElement = screen.getByPlaceholderText('filtrar anotações')
    expect(inputElement).toBeInTheDocument()
  })

  it('deve chamar getFilters ao digitar no input', () => {

    renderTheme(<Search />)
    const inputElement = screen.getByPlaceholderText('filtrar anotações')

    fireEvent.change(inputElement, { target: { value: 'filtro' } })

    expect(mockStorage.getFilters).toHaveBeenCalledWith('filtro')
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
