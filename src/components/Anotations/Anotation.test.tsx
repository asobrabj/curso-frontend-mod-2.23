import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import Anotations from '.'
import {
  ILocalStorageContext,
  LocalStorageProvider,
  useStorage,
} from '../../context/localStorage/localStorage'
import { IModalContext, ModalProvider, useModal } from '../../context/modals'
import { renderTheme } from '../../utils/styles-test'

jest.mock('../../context/modals')
jest.mock('../../context/localStorage/localStorage')

const mockUseModal = useModal as jest.MockedFunction<typeof useModal>
const mockUseStorage = useStorage as jest.MockedFunction<typeof useStorage>

jest.mock('../../context/localStorage/localStorage', () => {
  const originalModule = jest.requireActual(
    '../../context/localStorage/localStorage'
  )
  return {
    ...originalModule,
    useStorage: jest.fn(() => ({
      anotations: [], // ou os dados desejados para esse teste
    })),
  }
})

jest.mock('../../context/modals', () => {
  const originalModule = jest.requireActual('../../context/modals')
  return {
    ...originalModule,
    useModal: jest.fn(() => ({
      setIsVisible: jest.fn(),
      setIsForm: jest.fn(),
      // Outras funções ou valores que seu componente usa
    })),
  }
})

const mockData = {
  concluded: false,
  date: '2023-12-20',
  name: 'teste',
  time: '00:00',
  category: 'Alimentacao',
  description: 'teste jest',
  priority: 'urgente',
}

const mockModalContext: IModalContext = {
  setIsVisible: jest.fn(),
  setIsForm: jest.fn(),
  setDataCard: jest.fn(),
  setIdCard: jest.fn(),
  isVisible: false,
  isForm: false,
  dataCard: {
    id: null,
    concluded: false,
    date: '',
    description: '',
    name: '',
    category: '',
    priority: '',
    time: '',
  },
  idCard: null
}
const mockLocalStorageContext: ILocalStorageContext = {
  anotations: [
    { id: 1, ...mockData },
    { id: 2, ...mockData },
    { id: 3, ...mockData },
    { id: 4, ...mockData },
    { id: 5, ...mockData },
    { id: 6, ...mockData },
    { id: 7, ...mockData },
  ],
  setAnotations: jest.fn(),
  getFilters: jest.fn(),
  getTags: jest.fn(),
  getStorage: jest.fn(),
  setStorage: jest.fn(),
}

describe('Anotations Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar corretamente quando há anotações', () => {
    mockUseStorage.mockReturnValue(mockLocalStorageContext)

    renderTheme(
      <ModalProvider>
        <LocalStorageProvider>
          <Anotations />
        </LocalStorageProvider>
      </ModalProvider>
    )

    expect(screen.queryByTitle('not-found')).not.toBeInTheDocument()
  })

  it('deve renderizar corretamente quando não há anotações', () => {
    mockUseStorage.mockReturnValue({...mockLocalStorageContext, anotations: []})

    renderTheme(<Anotations />)

    expect(screen.queryByTestId('container-cards')).not.toBeInTheDocument()
    expect(screen.getByTitle('not-found')).toBeInTheDocument()
  })

  it('deve chamar as funções corretas ao clicar nas setas de navegação', () => {
    mockUseStorage.mockReturnValue(mockLocalStorageContext)

    renderTheme(<Anotations />)

    let cards = screen.getAllByTitle('card')
    expect(cards.length).toBe(6)
    act(() => {
      fireEvent.click(screen.getByLabelText('next'))
    })
    cards = screen.getAllByTitle('card')
    expect(cards.length).not.toBe(6)
    expect(cards.length).toBe(1)

    fireEvent.click(screen.getByLabelText('prev'))

    cards = screen.getAllByTitle('card')
    expect(cards.length).not.toBe(1)
    expect(cards.length).toBe(6)
  })

  it('editar card', async () => {
    mockUseStorage.mockReturnValue(mockLocalStorageContext)
    mockUseModal.mockReturnValue(mockModalContext)

    renderTheme(<Anotations />)
    const btn = screen.getAllByText('Editar')[0]

    await act(async () => {
      fireEvent.click(btn)
    })
    waitFor(() => {
      expect(mockModalContext.setIsVisible).toHaveBeenCalledWith(true)
      expect(mockModalContext.setIsForm).toHaveBeenCalledWith(true)
      expect(mockLocalStorageContext.setAnotations).toHaveBeenCalledWith(
        expect.any(Function)
      )
    })
  })

  it('card detail', async () => {
    mockUseStorage.mockReturnValue(mockLocalStorageContext)
    mockUseModal.mockReturnValue(mockModalContext)

    renderTheme(<Anotations />)
    const btn = screen.getAllByTitle('paragraph-name')[0]

    await act(async () => {
      fireEvent.click(btn)
    })
    waitFor(() => {
      expect(mockModalContext.setIsVisible).toHaveBeenCalledWith(true)
      expect(mockModalContext.setIsForm).toHaveBeenCalledWith(true)
      expect(mockLocalStorageContext.setAnotations).toHaveBeenCalledWith(
        expect.any(Function)
      )
    })
  })

  it('delet', async () => {
    mockUseStorage.mockReturnValue(mockLocalStorageContext)
    mockUseModal.mockReturnValue(mockModalContext)

    renderTheme(<Anotations />)
    const btn = screen.getAllByTitle('button delete')[0]

    await act(async () => {
      fireEvent.click(btn)
    })
    waitFor(() => {
      expect(mockModalContext.setIsVisible).toHaveBeenCalledWith(true)
      expect(mockModalContext.setIsForm).toHaveBeenCalledWith(true)
      expect(mockLocalStorageContext.setAnotations).toHaveBeenCalledWith(
        expect.any(Function)
      )
    })
  })

  it('Adicionar', async () => {
    mockUseStorage.mockReturnValue({...mockLocalStorageContext, anotations: []})
    mockUseModal.mockReturnValue(mockModalContext)

    renderTheme(<Anotations />)
    const btn = screen.getByText('Click aqui para adicionar')
    await act(async () => {
      fireEvent.click(btn)
    })
    waitFor(() => {
      expect(mockModalContext.setIsVisible).toHaveBeenCalledWith(true)
      expect(mockModalContext.setIsForm).toHaveBeenCalledWith(true)
      expect(mockLocalStorageContext.setAnotations).toHaveBeenCalledWith(
        expect.any(Function)
      )
    })
  })

  it('snapshot', () => {
    mockUseStorage.mockReturnValue({...mockLocalStorageContext})

    const { container } = renderTheme(<Anotations />)
    expect(container).toMatchSnapshot()
  })
})
