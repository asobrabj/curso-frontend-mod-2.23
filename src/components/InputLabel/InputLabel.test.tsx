import { fireEvent, screen } from '@testing-library/react'
import InputLabel from '.'
import { renderTheme } from '../../utils/styles-test'

describe('InputLabel Component', () => {
  it('deve renderizar corretamente', () => {
    const { container } = renderTheme(
      <InputLabel label="Nome" id="name" required />
    )
    expect(container).toMatchSnapshot()
  })

  it('deve chamar a função onChange ao digitar no input', () => {
    const onChangeMock = jest.fn()
    renderTheme(
      <InputLabel label="Nome" id="name" required onChange={onChangeMock} />
    )
    const input = screen.getByRole('textbox', {
      name: /Nome/i,
    }) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'John' } })

    expect(input.value).toBe('John')
    expect(input.value).not.toBe('lucas')
  })

  it('deve chamar a função onClick ao clicar no input', () => {
    const onClickMock = jest.fn()
    renderTheme(
      <InputLabel label="Nome" id="name" required onClick={onClickMock} />
    )
    const input = screen.getByRole('textbox', {
      name: /Nome/i,
    }) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'John' } })
    fireEvent.click(input)
    expect(onClickMock).toHaveBeenCalled()
  })

  it('deve exibir um asterisco (*) para campos obrigatórios', () => {
    const { getByText } = renderTheme(
      <InputLabel label="Nome" id="name" required />
    )
    const asterisk = getByText('*')
    expect(asterisk).toBeInTheDocument()
  })

  it('snapshot', () => {
    const onChangeMock = jest.fn()
    const { container } = renderTheme(
      <InputLabel
        label="Nome"
        id="name"
        required={false}
        onChange={onChangeMock}
      />
    )
    const input = screen.getByRole('textbox', {
      name: /Nome/i,
    }) as HTMLInputElement
    expect(input).not.toBeRequired()
    fireEvent.change(input, { target: { value: 'John' } })
    expect(container).toMatchSnapshot()
  })
})
