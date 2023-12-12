import { fireEvent, waitFor } from '@testing-library/react'
import Tag from '.'
import { useStorage } from '../../context/localStorage/localStorage'
import { renderTheme } from '../../utils/styles-test'

// Mock do hook do contexto
jest.mock('../../context/localStorage/localStorage', () => ({
  ...jest.requireActual('../../context/localStorage/localStorage'), // Preserva as implementações não-mockadas
  useStorage: () => ({
    getTags: jest.fn(),
  }),
}))

describe('Tag Component', () => {
  test('Renderiza corretamente', () => {
    const { getByText } = renderTheme(
      <Tag name="categoria" text="Categoria 1" background="#ff0000" />
    )

    expect(getByText('Categoria 1')).toBeInTheDocument()
  })

  test('Chama a função getTags ao ser clicado', () => {
    const { getByText } = renderTheme(
      <Tag name="categoria" text="Categoria 1" background="#ff0000" />
    )
    const { getTags } = useStorage()

    fireEvent.click(getByText('Categoria 1'))
    waitFor(() => {
      expect(getTags).toHaveBeenCalledWith('category', 'Categoria 1')
    })
  })

  it('snapshot', () => {
    const { container } = renderTheme(<Tag />)

    expect(container).toMatchSnapshot()
  })
})
