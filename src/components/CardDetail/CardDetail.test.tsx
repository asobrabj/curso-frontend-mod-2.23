import { fireEvent, screen, waitFor } from '@testing-library/react'
import { IModalContext, ModalProvider, useModal } from '../../context/modals'
import { renderTheme } from '../../utils/styles-test'
import CardDetail from './'

jest.mock('../../context/modals')

const mockUseModal = useModal as jest.MockedFunction<typeof useModal>

const mockData = {
  id: 1,
  name: 'Test Card',
  date: '2023-12-20',
  time: '00:00',
  category: 'Categoria1',
  priority: 'Alta',
  concluded: false,
  description: 'Teste Jest',
}

const mockModalContext: IModalContext = {
  setIsVisible: jest.fn(),
  setIsForm: jest.fn(),
  setDataCard: jest.fn(),
  setIdCard: jest.fn(),
  isVisible: false,
  isForm: false,
  dataCard: mockData,
  idCard: null
}

describe('CardDetail Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar corretamente com os dados fornecidos', () => {
    mockUseModal.mockReturnValueOnce(mockModalContext)

    renderTheme(
      <ModalProvider>
        <CardDetail />
      </ModalProvider>
    )
    waitFor(() => {
      expect(screen.getByText(mockData.name)).toBeInTheDocument()
      expect(
        screen.getByText(`${mockData.date}: ${mockData.time}`)
      ).toBeInTheDocument()
      expect(screen.getByText(mockData.description)).toBeInTheDocument()
      expect(screen.getByLabelText('checkbox')).toBeInTheDocument()
    })
  })

  it('deve chamar a função setIsVisible ao fechar o card', () => {
    mockUseModal.mockReturnValueOnce(mockModalContext)

    renderTheme(
      <ModalProvider>
        <CardDetail />
      </ModalProvider>
    )

    waitFor(() => {
      fireEvent.click(screen.getByLabelText('Fechar'))
      expect(mockUseModal.setIsVisible).toHaveBeenCalledWith(false)
    })
  })
  it('deve exibir a categoria e a prioridade corretamente', () => {
    mockUseModal.mockReturnValueOnce(mockModalContext)


    renderTheme(
      <ModalProvider>
        <CardDetail />
      </ModalProvider>
    )
    waitFor(() => {
      expect(
        screen.getByText(`Categoria: ${mockData.category}`)
      ).toBeInTheDocument()
      expect(
        screen.getByText(`Prioridade: ${mockData.priority}`)
      ).toBeInTheDocument()
    })
  })

  it('deve exibir mensagem se não houver descrição', () => {
    mockUseModal.mockReturnValueOnce({...mockModalContext, dataCard:{...mockData, description: undefined}})

    renderTheme(
      <ModalProvider>
        <CardDetail />
      </ModalProvider>
    )
    waitFor(() => {
      expect(
        screen.getByText('Nenhuma descrição disponível.')
      ).toBeInTheDocument()
    })
  })

  it('snapshot', () => {
    const { container } = renderTheme(
      <ModalProvider>
        <CardDetail />
      </ModalProvider>
    )
    expect(container).toMatchSnapshot()
  })
})
