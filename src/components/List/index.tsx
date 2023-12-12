import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { useStorage } from '../../context/localStorage/localStorage'
import * as S from './styles'

interface IListItem {
  name: string
  options: {
    text: string
  }[]
}

export default function List({ name, options }: IListItem) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { getTags } = useStorage()

  const translate = {
    categoria: 'category',
    prioridade: 'priority',
  }

  return (
    <S.Container>
      <S.List>
        <S.ListItem
          className="paragraph"
          $visible
          onClick={() => setIsVisible((v) => !v)}
        >
          <i>{!isVisible ? <IoIosArrowForward /> : <IoIosArrowDown />}</i>
          {name}
        </S.ListItem>

        {options?.length > 0 &&
          options.map((option, index) => (
            <S.ListItem
              $visible={isVisible}
              key={index}
              onClick={() => getTags(translate[name], option.text)}
            >
              {option.text}
            </S.ListItem>
          ))}
      </S.List>
    </S.Container>
  )
}
