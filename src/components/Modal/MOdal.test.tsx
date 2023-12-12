import { screen } from '@testing-library/react'
import { useModal } from '../../context/modals'
import { renderTheme } from '../../utils/styles-test'
import Modal from '../Modal'

const mockUseModal = useModal as jest.Mock
jest.mock('../../context/modals', () => ({
  useModal: jest.fn(),
}))

// Mock dos componentes CardDetail e FormAddAnotation
jest.mock('../CardDetail', () => jest.fn(() => <div>CardDetail Component</div>))
jest.mock('../FormAddAnnotation', () =>
  jest.fn(() => <div>FormAddAnnotation Component</div>)
)

describe('Modal Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar o componente CardDetail quando isVisible é true e isForm é false', () => {
    mockUseModal.mockReturnValue({ isVisible: true, isForm: false })

    renderTheme(<Modal />)

    expect(screen.getByText('CardDetail Component')).toBeInTheDocument()
    expect(
      screen.queryByText('FormAddAnnotation Component')
    ).not.toBeInTheDocument()
  })

  it('deve renderizar o componente FormAddAnnotation quando isVisible é true e isForm é true', () => {
    mockUseModal.mockReturnValue({ isVisible: true, isForm: true })

    renderTheme(<Modal />)

    expect(screen.getByText('FormAddAnnotation Component')).toBeInTheDocument()
    expect(screen.queryByText('CardDetail Component')).not.toBeInTheDocument()
  })

  it('deve renderizar null quando isVisible é false', () => {
    mockUseModal.mockReturnValue({ isVisible: false, isForm: false })

    renderTheme(<Modal />)

    expect(screen.queryByText('CardDetail Component')).toBeInTheDocument()
    expect(
      screen.queryByText('FormAddAnnotation Component')
    ).not.toBeInTheDocument()
  })
  it('snapshot', () => {
    const { container } = renderTheme(<Modal />)
    expect(container).toMatchSnapshot()
  })
})
