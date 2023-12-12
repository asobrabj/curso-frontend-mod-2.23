import { fireEvent } from '@testing-library/react'
import TextAreaLabel, { ITextAreaLabel } from '.'
import { renderTheme } from '../../utils/styles-test'

const mockOnChange = jest.fn()

const defaultProps: ITextAreaLabel = {
  required: false,
  label: 'Test Label',
  id: 'test-id',
  onChange: mockOnChange,
}

describe('TextAreaLabel Component', () => {
  test('Renderiza corretamente', () => {
    const { getByLabelText } = renderTheme(<TextAreaLabel {...defaultProps} />)

    expect(getByLabelText('Test Label')).toBeInTheDocument()
  })

  test('Chama a função onChange corretamente', () => {
    const { getByLabelText } = renderTheme(<TextAreaLabel {...defaultProps} />)
    const textArea = getByLabelText('Test Label')

    fireEvent.change(textArea, { target: { value: 'Texto de teste' } })

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object))
  })

  test('Renderiza o indicador de campo obrigatório', () => {
    const { getByText } = renderTheme(
      <TextAreaLabel {...defaultProps} required />
    )

    expect(getByText('*')).toBeInTheDocument()
  })
  it('snapshot', () => {
    const { container } = renderTheme(<TextAreaLabel />)

    expect(container).toMatchSnapshot()
  })
})
