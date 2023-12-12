import { useState } from 'react'
import { useStorage } from '../../context/localStorage/localStorage'
import { IFormData } from '../FormAddAnnotation'
import * as S from './styles'

interface ICheck {
  id: number
  checked: boolean
}

export default function CheckBox({ checked, id }: ICheck) {
  const [isChecked, setIsChecked] = useState(checked)
  const { getStorage, setAnotations } = useStorage()

  const handleChecked = () => {
    const newCheck = !isChecked
    setIsChecked(newCheck)

    const data = getStorage('anotations')
    const newAnotations = (data as Array<IFormData>).map((item: IFormData) =>
      item.id === id ? { ...item, concluded: newCheck } : item
    ) as Array<IFormData>

    setAnotations(newAnotations)
  }

  return (
    <S.Container>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
        id="concluded"
      />
      <label htmlFor="concluded">concluido</label>
    </S.Container>
  )
}
