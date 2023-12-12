import {
  act,
  fireEvent,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormAddAnotation, { IFormData } from '.'
import { useStorage } from '../../context/localStorage/localStorage'
import { useModal } from '../../context/modals'
import { renderTheme } from '../../utils/styles-test'

jest.mock('../../context/modals', () => ({
  useModal: jest.fn(() => ({
    setIsVisible: jest.fn(),
    idCard: null,
    setIdCard: jest.fn(),
    isVisible: true,
  })),
}))

jest.mock('../../context/localStorage/localStorage', () => ({
  useStorage: jest.fn(() => ({
    anotations: [],
    setAnotations: jest.fn(),
    getStorage: jest.fn(),
  })),
}))

const mock: IFormData[] = [
  {
    id: 0,
    name: 'teste',
    date: '2023-12-11',
    time: '00:00',
    description: ' um texto qualquer',
    concluded: false,
    category: 'estudo',
    priority: 'media',
  },
  {
    id: 1,
    name: 'testando',
    date: '2023-12-11',
    time: '00:00',
    description: ' um texto qualquer',
    concluded: false,
    category: 'finanças',
    priority: 'alta',
  },
]

describe('FormAddAnotation Component', () => {
  test('Renderização Inicial', () => {
    const { getByText } = renderTheme(<FormAddAnotation />)

    expect(getByText('formulario')).toBeInTheDocument()
    expect(getByText(/Nome/i)).toBeInTheDocument()
    expect(getByText('Salvar')).toBeInTheDocument()
    expect(getByText('Cancelar')).toBeInTheDocument()
  })

  test('Envio do Formulário', async () => {
    renderTheme(<FormAddAnotation />)

    const { result: resultModal } = renderHook(() => useModal())
    const { result: resultStorage } = renderHook(() => useStorage())

    const nameInput = screen.getByRole('textbox', {
      name: /Nome/i,
    }) as HTMLInputElement
    const dateInput = screen.getByTitle('title-date') as HTMLInputElement
    const timeInput = screen.getByTitle('title-time') as HTMLInputElement
    const selectCategory = screen.getByTestId(
      'select-category'
    ) as HTMLSelectElement
    const selectPriority = screen.getByTestId(
      'select-priority'
    ) as HTMLSelectElement
    expect(selectCategory).toBeInTheDocument()
    expect(selectPriority).toBeInTheDocument()
    expect(dateInput).toBeInTheDocument()
    expect(timeInput).toBeInTheDocument()
    expect(screen.getByText('Salvar')).toBeInTheDocument()
    const saveButton = screen.getByText('Salvar')

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Teste Nome' } })
      fireEvent.change(timeInput, { target: { value: '00:00' } })
      fireEvent.change(dateInput, { target: { value: '2023-12-25' } })
      fireEvent.click(saveButton)
    })

    expect(nameInput.value).toBe('Teste Nome')
    expect(timeInput.value).toBe('00:00')
    expect(dateInput.value).toBe('2023-12-25')

    waitFor(() => {
      expect(resultStorage.current.setAnotations).toHaveBeenCalledTimes(1)
      expect(resultModal.current.setIsVisible).toHaveBeenCalledTimes(1)
      expect(resultModal.current.setIsForm).toHaveBeenCalledTimes(1)
      expect(resultModal.current.isVisible).toBe(false)
    })
  })

  it('botao de cancelamento', () => {
    renderTheme(<FormAddAnotation />)
    const btnCancel = screen.getByRole('button', { name: 'Cancelar' })
    expect(btnCancel).toBeInTheDocument()

    act(() => {
      fireEvent.click(btnCancel)
    })
    waitFor(() => {
      const mockUseModal = useModal()
      expect(mockUseModal.setIsVisible).toHaveBeenCalled()
      expect(mockUseModal.setIdCard).toHaveBeenCalled()
      expect(mockUseModal.isVisible).toBe(true)
    })
  })

  it('icone para fechar formulario', () => {
    renderTheme(<FormAddAnotation />)
    const icon = screen.getByTitle('close form')
    act(() => {
      fireEvent.click(icon)
    })

    waitFor(() => {
      const mockUseModal = useModal()
      expect(mockUseModal.setIsVisible).toHaveBeenCalled()
      expect(mockUseModal.isVisible).toBe(true)
    })
  })

  test('Envio do Formulário com data errada', async () => {
    renderTheme(<FormAddAnotation />)

    const { result: resultModal } = renderHook(() => useModal())

    const nameInput = screen.getByRole('textbox', {
      name: /Nome/i,
    }) as HTMLInputElement
    const dateInput = screen.getByText(/Data/i) as HTMLInputElement
    const timeInput = screen.getByText(/Hora/i) as HTMLInputElement
    const selectCategory = screen.getByTestId(
      'select-category'
    ) as HTMLSelectElement
    const selectPriority = screen.getByTestId(
      'select-priority'
    ) as HTMLSelectElement
    expect(selectCategory).toBeInTheDocument()
    expect(selectPriority).toBeInTheDocument()
    expect(screen.getByText('Salvar')).toBeInTheDocument()
    const saveButton = screen.getByText('Salvar')
    const optionCategory = screen.getAllByTestId('options')[0]
    const optionPriority = screen.getAllByTestId('options')[6]

    act(() => {
      userEvent.type(nameInput, 'Teste Nome')
      userEvent.type(dateInput, '2022-11-31')
      userEvent.type(timeInput, '15:30')
      fireEvent.click(optionCategory)
      fireEvent.click(optionPriority)
      fireEvent.click(saveButton)
    })

    waitFor(() => {
      const error = screen.getByText(
        'Não é possivel selecionar uma data passada'
      )
      expect(error).toBeInTheDocument()
      expect(resultModal.current.isVisible).toBe(true)
      expect(optionPriority.textContent).toBe('media')
      expect(nameInput.value).toBe('Teste Nome')
      expect(dateInput.value).toBe('2023-12-31')
      expect(timeInput.value).toBe('15:30')
      expect(optionCategory.textContent).toBe('finanças')
    })
  })

  it('adicionando nova anotação', () => {
    localStorage.clear()
    renderTheme(<FormAddAnotation />)
    const { result } = renderHook(() => useStorage())
    const nameInput = screen.getByRole('textbox', {
      name: /Nome/i,
    }) as HTMLInputElement
    const dateInput = screen.getByText(/Data/i) as HTMLInputElement
    const timeInput = screen.getByText(/Hora/i) as HTMLInputElement
    const selectCategory = screen.getByTestId(
      'select-category'
    ) as HTMLSelectElement
    const selectPriority = screen.getByTestId(
      'select-priority'
    ) as HTMLSelectElement
    expect(selectCategory).toBeInTheDocument()
    expect(selectPriority).toBeInTheDocument()
    expect(screen.getByText('Salvar')).toBeInTheDocument()
    const saveButton = screen.getByText('Salvar')
    const optionCategory = screen.getAllByTestId('options')[0]
    const optionPriority = screen.getAllByTestId('options')[6]

    act(() => {
      userEvent.type(nameInput, 'Teste Nome')
      userEvent.type(dateInput, '2023-12-31')
      userEvent.type(timeInput, '15:30')
      fireEvent.click(optionCategory)
      fireEvent.click(optionPriority)
      fireEvent.click(saveButton)
    })

    waitFor(() => {
      expect(result.current.setAnotations).toHaveBeenCalled()
    })
  })
  it('inputNome', async () => {
    act(() => {
      renderTheme(<FormAddAnotation />)
    })
    const nameInput = screen.getByRole('textbox', {
      name: /Nome/i,
    }) as HTMLInputElement

    expect(nameInput).toBeInTheDocument()
    expect(nameInput.value).toBe('')

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'ab' } })
    })
    waitFor(() => {
      const input = screen.getByRole('textbox', {
        name: /Nome/i,
      }) as HTMLInputElement

      expect(input.value).toBe('ab')
    })
  })

  it('inputData', async () => {
    act(() => {
      renderTheme(<FormAddAnotation />)
    })
    const dataInput = screen.getByTitle('title-date') as HTMLInputElement

    expect(dataInput).toBeInTheDocument()

    act(() => {
      fireEvent.change(dataInput, { target: { value: '2023-12-31' } })
    })
    expect(dataInput.value).toBe('2023-12-31')
  })

  it('inputTime', async () => {
    act(() => {
      renderTheme(<FormAddAnotation />)
    })
    const timeInput = screen.getByLabelText(/Hora/i)

    expect(timeInput).toBeInTheDocument()

    act(() => {
      fireEvent.change(timeInput, { target: { value: '00:00' } })
    })
    expect(timeInput.value).toBe('00:00')
  })

  it('submeter formulario sem dados', () => {
    const { container } = renderTheme(<FormAddAnotation />)
    const { result } = renderHook(() => useModal())
    const btn = screen.getByText('Salvar')
    expect(container).toBeInTheDocument()
    act(() => {
      fireEvent.click(btn)
    })
    expect(container).toBeInTheDocument()

    expect(result.current.setIsVisible).not.toHaveBeenCalled()
    expect(result.current.setIdCard).not.toHaveBeenCalled()
    expect(result.current.isVisible).toBe(true)
  })

  it('textArea', () => {
    renderTheme(<FormAddAnotation />)
    const textarea = screen.getByTitle('message') as HTMLTextAreaElement
    act(() => {
      fireEvent.change(textarea, {
        target: { value: 'texto' },
      })
    })

    expect(textarea.value).toBe('texto')
  })

  it('submeter formulario data passada', async () => {
    renderTheme(<FormAddAnotation />)
    const btn = screen.getByText('Salvar')
    const nameInput = screen.getByRole('textbox', {
      name: /Nome/i,
    }) as HTMLInputElement
    const dateInput = screen.getByTitle('title-date') as HTMLInputElement
    const timeInput = screen.getByTitle('title-time') as HTMLInputElement

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Teste Nome' } })
      fireEvent.change(timeInput, { target: { value: '00:00' } })
      fireEvent.change(dateInput, { target: { value: '2023-10-25' } })
      fireEvent.click(btn)
    })

    const error = await screen.findByText(
      'Não é possivel selecionar uma data passada'
    )

    expect(error).toBeInTheDocument()
  })

  it('textArea', () => {
    renderTheme(<FormAddAnotation />)
    const textarea = screen.getByTitle('message') as HTMLTextAreaElement
    act(() => {
      fireEvent.change(textarea, {
        target: { value: 'texto' },
      })
    })

    expect(textarea.value).toBe('texto')
  })

  it('snapshot', () => {
    const { container } = renderTheme(<FormAddAnotation />)
    expect(container).toMatchSnapshot()
  })
})
