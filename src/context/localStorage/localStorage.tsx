import { createContext, useContext, useEffect, useState } from 'react'
import { IFormData } from '../../components/FormAddAnnotation'
import IList from '../../types/lists'

export interface ILocalStorageContext {
  anotations: Array<IFormData> | null
  setAnotations: (data: IFormData | Array<IFormData>) => void
  getFilters: (value: string) => void
  getTags: (key: 'category' | 'priority', value: string) => void
  getStorage: (key: string) => Array<IFormData | IList> | string | null
  setStorage: (key: string, data: Array<IFormData | IList> | string) => void
}

interface ILocalStorageProvider {
  children: React.ReactNode
}

const LocalStorageContext = createContext<ILocalStorageContext>(
  {} as ILocalStorageContext
)

export function LocalStorageProvider({ children }: ILocalStorageProvider) {
  const [anotations, setAnotations] = useState<Array<IFormData> | null>([])

  useEffect(() => {
    const anotations = getStorage('anotations')
    setAnotations(anotations)
  }, [])

  const getTags = (key: 'category' | 'priority', value: string) => {
    const anotations = getStorage('anotations')
    const data = anotations?.filter(
      (item: IFormData) =>
        item[key]?.toLowerCase().includes(value.toLowerCase())
    )

    if (data) setAnotations(data)
    return
  }

  const getFilters = (value: string) => {
    const anotations = getStorage('anotations')
    const name = anotations?.filter((item: IFormData) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    )

    if (name) setAnotations(name)
    return
  }

  const setAnotationsFn = (data: IFormData | Array<IFormData>) => {
    const storage = getStorage('anotations')
    let newStorage: Array<IFormData> = []
    if (storage) {
      newStorage = [...storage, data]
    }

    if (data instanceof Array) {
      newStorage = data
    }

    setAnotations(newStorage)
    localStorage.setItem('anotations', JSON.stringify(newStorage))
  }

  const getStorage = (key: string) => {
    const storedData = localStorage.getItem(key)
    if (storedData) {
      return JSON.parse(storedData)
    }
    return []
  }

  const saveToStorage = (
    key: string,
    data: Array<IFormData | IList> | string
  ) => {
    localStorage.setItem(key, JSON.stringify(data))
    return
  }
  return (
    <LocalStorageContext.Provider
      value={{
        getTags,
        getFilters,
        anotations,
        setAnotations: setAnotationsFn,
        getStorage,
        setStorage: saveToStorage,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  )
}

export function useStorage() {
  return useContext(LocalStorageContext)
}
