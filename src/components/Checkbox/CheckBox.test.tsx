// import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckBox from '.'
// import { screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import * as localStorageModule from '../../context/localStorage/localStorage'
import { renderTheme } from '../../utils/styles-test'

jest.mock('../../context/localStorage/localStorage', () => ({
  useStorage: jest.fn(() => ({
    getStorage: jest.fn(() => []),
    setAnotations: jest.fn(() => []),
  })),
}))

describe('CheckBox Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar corretamente', () => {
    const { container } = renderTheme(<CheckBox id={1} checked={false} />)
    expect(container).toMatchSnapshot()
  })

  it('deve atualizar o estado isChecked ao clicar no checkbox', () => {
    const { getByLabelText } = renderTheme(<CheckBox id={1} checked={false} />)
    const checkbox = getByLabelText('concluido')

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('deve atualizar as anotações ao clicar no checkbox', () => {
    const mockGetStorage = jest.fn(() => [{ id: 1, concluded: false }])
    const mockSetAnotations = jest.fn()

    const spyUseStorage = jest.spyOn(localStorageModule, 'useStorage')
    spyUseStorage.mockReturnValue({
      getStorage: mockGetStorage,
      setAnotations: mockSetAnotations,
    })

    const { getByLabelText } = renderTheme(<CheckBox id={1} checked={false} />)
    const checkbox = getByLabelText('concluido')

    fireEvent.click(checkbox)

    expect(mockGetStorage).toHaveBeenCalledWith('anotations')
    expect(mockSetAnotations).toHaveBeenCalledWith([{ id: 1, concluded: true }])

    spyUseStorage.mockRestore()
  })
})
