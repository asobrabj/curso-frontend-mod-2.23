import { useStorage } from '../../context/localStorage/localStorage'
import * as S from './styles'

interface ITag {
  name: string
  text: string
  background: string
}

export default function Tag({ name, text, background }: ITag) {
  const { getTags } = useStorage()
  const translate = {
    categoria: 'category',
    prioridade: 'priority',
  }

  return (
    <S.Tag
      $background={background}
      onClick={() => getTags(translate[name], text)}
    >
      {text}
    </S.Tag>
  )
}
