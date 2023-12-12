import { renderHook } from '@testing-library/react'
import 'jest-localstorage-mock'
import { ModalProvider, useModal } from './index'

const mock = {
  category: '',
  concluded: false,
  date: '',
  description: '',
  id: null,
  name: '',
  priority: '',
  time: '',
}

describe('', () => {
  it('estado inicial', () => {
    const wrapper: React.FC = ({
      children,
    }: {
      children?: React.ReactNode
    }) => <ModalProvider>{children}</ModalProvider>

    const { result } = renderHook(() => useModal(), { wrapper })

    expect(result.current.dataCard).toEqual(mock)
    expect(result.current.idCard).toEqual(null)
    expect(result.current.isForm).toEqual(false)
    expect(result.current.isVisible).toEqual(false)
    expect(typeof result.current.setDataCard).toEqual('function')
    expect(typeof result.current.setIdCard).toEqual('function')
    expect(typeof result.current.setIsForm).toEqual('function')
    expect(typeof result.current.setIsVisible).toEqual('function')
  })
})
