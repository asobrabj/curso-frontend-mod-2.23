import { screen } from '@testing-library/react'
import { renderTheme } from '../../utils/styles-test'
import ChangeTheme from '.'

describe('ChangeTheme', () => {
  it('deve renderizar o componente corretamente', () => {
    renderTheme(<ChangeTheme isDark={false} changeTheme={() => {}} />)
    const div = screen.getByTitle(/change theme/i)
    expect(div).toBeInTheDocument()
  })

  it('deve renderizar o componente corretamente', () => {
    renderTheme(<ChangeTheme isDark={false} changeTheme={() => {}} />)
    const div = screen.getByTitle(/icon theme/i)
    expect(div).toBeInTheDocument()
  })

  it('snapshot', () => {
    const { container } = renderTheme(
      <ChangeTheme isDark={false} changeTheme={() => {}} />
    )
    expect(container).toMatchSnapshot()
  })
})
