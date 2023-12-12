/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useStorage } from '../../context/localStorage/localStorage'
import * as S from './styles'

export default function Search() {
  const [input, setInput] = useState<string>('')
  const { getFilters } = useStorage()

  useEffect(() => {
    getFilters(input)
  }, [input])

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInput(value)
  }

  return (
    <S.Input
      type="text"
      placeholder="filtrar anotações"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeInput(e)}
      value={input}
      name="search"
    />
  )
}
