import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import SelectLabel, { ISelectLabel } from '.'
import { renderTheme } from '../../utils/styles-test'

describe('SelectLabel Component', () => {
  const mockOptions: string[] = ['Option 1', 'Option 2', 'Option 3']

  const renderSelectLabel = (props: Partial<ISelectLabel> = {}) => {
    const defaultProps: ISelectLabel = {
      listOptions: mockOptions,
      required: false,
      label: 'Select Label',
      id: 'select-label',
      onChange: jest.fn(),
      value: '',
    }

    const mergedProps = { ...defaultProps, ...props }

    return renderTheme(<SelectLabel {...mergedProps} />)
  }

  it('deve renderizar corretamente', () => {
    renderSelectLabel()

    const selectLabelElement = screen.getByTestId('select-select-label')
    expect(selectLabelElement).toBeInTheDocument()
  })

  it('deve exibir as opções ao clicar no trigger', () => {
    renderSelectLabel()

    const triggerElement = screen.getByText('Select Label')
    act(() => {
      fireEvent.click(triggerElement)
    })

    waitFor(() => {
      const option1 = screen.getByText('Option 1')
      const option2 = screen.getByText('Option 2')
      const option3 = screen.getByText('Option 3')
      expect(option1).toBeInTheDocument()
      expect(option2).toBeInTheDocument()
      expect(option3).toBeInTheDocument()
    })
  })
  it('snapshot', () => {
    const { container } = renderTheme(<SelectLabel listOptions={mockOptions} required={false} label={''} id={''} />)
    expect(container).toMatchSnapshot()
  })
})
