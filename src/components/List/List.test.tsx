import { fireEvent, screen } from '@testing-library/react'
import List from '.'
import { useStorage } from '../../context/localStorage/localStorage'
import { renderTheme } from '../../utils/styles-test'

// Mockando o módulo useStorage
jest.mock('../../context/localStorage/localStorage', () => ({
  ...jest.requireActual('../../context/localStorage/localStorage'),
  useStorage: jest.fn(),
}))

describe('List Component', () => {
  it('deve renderizar corretamente', () => {
    const getTagsMock = jest.fn()
    ;(useStorage as jest.Mock).mockReturnValue({ getTags: getTagsMock })

    const testData = {
      name: 'categoria',
      options: [{ text: 'Opção 1' }, { text: 'Opção 2' }],
    }

    const { getByText } = renderTheme(<List {...testData} />)

    expect(getByText(testData.name)).toBeInTheDocument()

    testData.options.forEach((option) => {
      expect(getByText(option.text)).not.toBeVisible()
    })

    fireEvent.click(getByText(testData.name))

    testData.options.forEach((option) => {
      expect(getByText(option.text)).toBeVisible()
    })

    fireEvent.click(getByText(testData.options[0].text))
    expect(getTagsMock).toHaveBeenCalledWith(
      'category',
      testData.options[0].text
    )
  })
  it('deve lidar com propriedades não fornecidas', () => {
    renderTheme(<List name={''} options={[]} />)
    expect(screen.queryByText('categoria')).not.toBeInTheDocument()
  })
  it('snapshot', () => {
    const getTagsMock = jest.fn()
    ;(useStorage as jest.Mock).mockReturnValue({ getTags: getTagsMock })

    const testData = {
      name: 'categoria',
      options: [{ text: 'Opção 1' }, { text: 'Opção 2' }],
    }

    const { container } = renderTheme(<List {...testData} />)
    expect(container).toMatchSnapshot()
  })
})
