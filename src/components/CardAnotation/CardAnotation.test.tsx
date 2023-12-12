import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CardAnotation, { ICard } from '.'
import {
  LocalStorageProvider,
  useStorage,
} from '../../context/localStorage/localStorage'
import { ModalProvider, useModal } from '../../context/modals'
import { renderTheme } from '../../utils/styles-test'

jest.mock('../../context/modals')
jest.mock('../../context/localStorage/localStorage')

const mockUseModal = useModal as jest.MockedFunction<
  typeof useModal & { setDataCard: jest.Mock } & { setIsVisible: jest.Mock } & {
    setIsForm: jest.Mock
  } & {
    setIdCard: jest.Mock
  }
>
const mockUseStorage = useStorage as jest.MockedFunction<
  typeof useStorage & { setAnotations: jest.Mock }
>

const mockData: ICard = {
  id: 1,
  name: 'Test Card',
  date: '2023-12-20',
  time: '00:00',
  category: 'Categoria1',
  priority: 'Alta',
  concluded: false,
  description: 'Teste Jest',
}

describe('CardAnotation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar corretamente', async () => {
    renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <CardAnotation {...mockData} />
        </LocalStorageProvider>
      </ModalProvider>
    )
    waitFor(() => {
      expect(screen.getByText(new RegExp(mockData.name))).toBeInTheDocument()
      expect(screen.getByTitle('card')).toBeInTheDocument()
      expect(screen.getByLabelText('checkbox')).toBeInTheDocument()
    })
  })

  it('deve abrir o detalhe do card ao clicar no nome', () => {
    renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <CardAnotation {...mockData} />
        </LocalStorageProvider>
      </ModalProvider>
    )

    waitFor(() => {
      userEvent.click(screen.getByText(mockData.name))
      expect(mockUseModal.setDataCard).toHaveBeenCalledWith(mockData)
      expect(mockUseModal.setIsVisible).toHaveBeenCalledWith(true)
      expect(mockUseModal.setIsForm).toHaveBeenCalledWith(false)
    })
  })

  it('deve abrir o formulário ao clicar no botão de editar', async () => {
    renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <CardAnotation {...mockData} />
        </LocalStorageProvider>
      </ModalProvider>
    )

    waitFor(() => {
      act(() => {
        fireEvent.click(screen.getByText('Editar'))
      })
      expect(mockUseModal.setIdCard).toHaveBeenCalledWith(mockData.id)
      expect(mockUseModal.setDataCard).toHaveBeenCalledWith(mockData)
      expect(mockUseModal.setIsVisible).toHaveBeenCalledWith(true)
      expect(mockUseModal.setIsForm).toHaveBeenCalledWith(true)
    })
  })

  it('deve excluir a anotação ao clicar no botão de excluir', () => {
    renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <CardAnotation {...mockData} />
        </LocalStorageProvider>
      </ModalProvider>
    )

    waitFor(() => {
      fireEvent.click(screen.getByText('Excluir'))
      expect(mockUseStorage.setAnotations).toHaveBeenCalledWith([])
    })
  })
  it('deve deletar a anotação correta ao clicar no botão de excluir', async () => {
    renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <CardAnotation {...mockData} />
        </LocalStorageProvider>
      </ModalProvider>
    )
    waitFor(() => {
      fireEvent.click(screen.getByText('Excluir'))
      expect(mockUseStorage.setAnotations).toHaveBeenCalledWith([])
    })
  })

  it('deve renderizar as tags de categoria e prioridade corretamente', async () => {
    renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <CardAnotation {...mockData} />
        </LocalStorageProvider>
      </ModalProvider>
    )

    waitFor(() => {
      expect(screen.getByText(mockData.category)).toBeInTheDocument()
      expect(screen.getByText(mockData.priority)).toBeInTheDocument()
    })
  })

  it('deve renderizar a data e hora corretamente', async () => {
    renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <CardAnotation {...mockData} />
        </LocalStorageProvider>
      </ModalProvider>
    )

    waitFor(() => {
      expect(
        screen.getByText(`${mockData.date}: ${mockData.time}`)
      ).toBeInTheDocument()
    })
  })

  it('deve renderizar o checkbox corretamente', async () => {
    renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <CardAnotation {...mockData} />
        </LocalStorageProvider>
      </ModalProvider>
    )

    waitFor(() => {
      expect(screen.getByLabelText('checkbox')).toBeInTheDocument()
      expect(screen.getByLabelText('checkbox')).toHaveAttribute(
        'checked',
        'false'
      )
    })
  })

  it('deve chamar as funções corretas ao abrir o detalhe do card', () => {
    renderTheme(
      <ModalProvider>
        <CardAnotation {...mockData} />
      </ModalProvider>
    )

    waitFor(() => {
      fireEvent.click(screen.getByText(mockData.name))

      expect(mockUseModal.setDataCard).toHaveBeenCalledWith({
        id: mockData.id,
        name: mockData.name,
        date: mockData.date,
        time: mockData.time,
        category: mockData.category,
        priority: mockData.priority,
        concluded: mockData.concluded,
        description: mockData.description,
      })
      expect(mockUseModal.setIsVisible).toHaveBeenCalledWith(true)
      expect(mockUseModal.setIsForm).toHaveBeenCalledWith(false)
    })
  })

  it('snapshot', () => {
    const { container } = renderTheme(
      <ModalProvider>
        <CardAnotation {...mockData} />
      </ModalProvider>
    )
    expect(container).toMatchSnapshot()
  })
})
