import { createContext, useContext, useState } from 'react'
import IAnotation from '../../types/anotation'

export interface IModalContext {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  isForm: boolean
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>
  dataCard: IAnotation
  setDataCard: React.Dispatch<React.SetStateAction<IAnotation>>
  idCard: number | null
  setIdCard: React.Dispatch<React.SetStateAction<number | null>>
}

interface IModalProvider {
  children: React.ReactNode
}

const ModalContext = createContext<IModalContext>({} as IModalContext)

export function ModalProvider({ children }: IModalProvider) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isForm, setIsForm] = useState<boolean>(false)
  const [idCard, setIdCard] = useState<number | null>(null)
  const [dataCard, setDataCard] = useState<IAnotation>({
    id: null,
    concluded: false,
    date: '',
    description: '',
    name: '',
    category: '',
    priority: '',
    time: '',
  })

  return (
    <ModalContext.Provider
      value={{
        idCard,
        setIdCard,
        isVisible,
        setIsVisible,
        isForm,
        setIsForm,
        dataCard,
        setDataCard,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
