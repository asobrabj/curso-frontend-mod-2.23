import { act, fireEvent, waitFor } from '@testing-library/react'
import NewAnotation from '.'
import { useModal } from '../../context/modals'
import { renderTheme } from '../../utils/styles-test'

jest.mock('../../context/modals', () => ({
  ...jest.requireActual('../../context/modals'), // Preserva as implementações não-mockadas
  useModal: () => ({
    setIsVisible: jest.fn(),
    setIsForm: jest.fn(),
  }),
}))

describe('NewAnotation Component', () => {
  test('Renderiza o componente corretamente', () => {
    const { getByText, getByTitle } = renderTheme(<NewAnotation />)

    expect(getByText('Nova Anotação')).toBeInTheDocument()
    expect(getByTitle('new-anotation')).toBeInTheDocument()
  })

  test('Chama as funções setIsForm e setIsVisible quando clicado', () => {
    const { getByTitle } = renderTheme(<NewAnotation />)
    act(() => {
      fireEvent.click(getByTitle('new-anotation'))
    })
    waitFor(() => {
      expect(useModal().setIsForm).toHaveBeenCalledWith(true)
      expect(useModal().setIsVisible).toHaveBeenCalledWith(true)
    })
  })
  it('snapshot', () => {
    const { container } = renderTheme(<NewAnotation />)
    expect(container).toMatchSnapshot()
  })
})
