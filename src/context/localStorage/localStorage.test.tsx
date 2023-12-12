import { act, renderHook, waitFor } from '@testing-library/react'
import 'jest-localstorage-mock'
import { IFormData } from '../../components/FormAddAnnotation'
import { LocalStorageProvider, useStorage } from './localStorage'

const mock: IFormData[] = [
  {
    id: 0,
    name: 'teste',
    date: '2023-12-11',
    time: '00:00',
    description: ' um texto qualquer',
    concluded: false,
    category: ' categoria1',
    priority: 'prioridade1',
  },
  {
    id: 1,
    name: 'testando',
    date: '2023-12-11',
    time: '00:00',
    description: ' um texto qualquer',
    concluded: false,
    category: ' categoria2',
    priority: 'prioridade2',
  },
]

describe('useStorage', () => {
  it('estado inicial', () => {
    const wrapper: React.FC = ({
      children,
    }: {
      children?: React.ReactNode
    }) => <LocalStorageProvider>{children}</LocalStorageProvider>

    const { result } = renderHook(() => useStorage(), { wrapper })
    const {
      anotations,
      getFilters,
      getStorage,
      getTags,
      setAnotations,
      setStorage,
    } = result.current

    expect(anotations).toEqual([])
    expect(typeof getFilters).toBe('function')
    expect(typeof getStorage).toBe('function')
    expect(typeof getTags).toBe('function')
    expect(typeof setAnotations).toBe('function')
    expect(typeof setStorage).toBe('function')
  })

  it('getStorage', () => {
    const wrapper: React.FC = ({
      children,
    }: {
      children?: React.ReactNode
    }) => <LocalStorageProvider>{children}</LocalStorageProvider>

    const { result } = renderHook(() => useStorage(), { wrapper })

    expect(result.current.getStorage('anotations')).toEqual([])
  })

  it('getStorage com dados', () => {
    localStorage.setItem('anotations', JSON.stringify([mock]))
    const wrapper: React.FC = ({
      children,
    }: {
      children?: React.ReactNode
    }) => <LocalStorageProvider>{children}</LocalStorageProvider>

    const { result } = renderHook(() => useStorage(), { wrapper })

    expect(result.current.getStorage('anotations')).toEqual([mock])
  })
  it('setStorage', () => {
    const wrapper: React.FC = ({
      children,
    }: {
      children?: React.ReactNode
    }) => <LocalStorageProvider>{children}</LocalStorageProvider>

    const { result } = renderHook(() => useStorage(), { wrapper })
    result.current.setStorage('anotations', [...mock])

    expect(result.current.getStorage('anotations')).toEqual([...mock])
  })
  it('getFilters', () => {
    const wrapper: React.FC = ({
      children,
    }: {
      children?: React.ReactNode
    }) => <LocalStorageProvider>{children}</LocalStorageProvider>

    const { result } = renderHook(() => useStorage(), { wrapper })
    act(() => {
      result.current.getFilters(mock[1].name)
    })
    waitFor(() => {
      expect(result.current.anotations).toEqual(mock[1])
    })
  })
  it('getFilters category', () => {
    const wrapper: React.FC = ({
      children,
    }: {
      children?: React.ReactNode
    }) => <LocalStorageProvider>{children}</LocalStorageProvider>

    const { result } = renderHook(() => useStorage(), { wrapper })
    act(() => {
      return result.current.getTags('category', mock[1]?.category)
    })
    waitFor(() => {
      expect(result.current.anotations).toEqual(mock[1])
    })

    act(() => {
      return result.current.getTags('category', mock[0]?.category)
    })
    waitFor(() => {
      expect(result.current.anotations).toEqual(mock[0])
    })
  })
  it('getFilters prioridade', () => {
    const wrapper: React.FC = ({
      children,
    }: {
      children?: React.ReactNode
    }) => <LocalStorageProvider>{children}</LocalStorageProvider>

    const { result } = renderHook(() => useStorage(), { wrapper })
    act(() => {
      return result.current.getTags('priority', mock[1]?.priority)
    })
    waitFor(() => {
      expect(result.current.anotations).toEqual(mock[1])
    })

    act(() => {
      return result.current.getTags('priority', mock[0]?.priority)
    })
    waitFor(() => {
      expect(result.current.anotations).toEqual(mock[0])
    })
  })
  it('SetAnotations', () => {
    const wrapper: React.FC = ({
      children,
    }: {
      children?: React.ReactNode
    }) => <LocalStorageProvider>{children}</LocalStorageProvider>

    const { result } = renderHook(() => useStorage(), { wrapper })
    act(() => {
      return result.current.setAnotations(mock)
    })
    waitFor(() => {
      expect(result.current.anotations).toEqual(mock)
    })
  })
})
