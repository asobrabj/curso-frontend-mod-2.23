import { MdOutlineClose } from 'react-icons/md'
import { useModal } from '../../context/modals'
import dataList from '../../model/list'
import CheckBox from '../Checkbox'
import Tag from '../Tag'
import * as S from './styles'

export default function CardDetail() {
  const { setIsVisible, dataCard } = useModal()
  const [categories, priorities] = dataList

  const handleClose = () => {
    setIsVisible(false)
  }
  const { concluded, date, description, name, time, category, priority, id } =
    dataCard

  const categorySelected = categories.options.find(
    (item) => item.text === category
  )
  const prioritySelected = priorities.options.find(
    (item) => item.text === priority
  )
  return (
    <S.Container>
      <S.Icon onClick={handleClose}>
        <MdOutlineClose />
      </S.Icon>
      {category && (
        <Tag
          background={categorySelected!.background}
          name="categoria"
          text={categorySelected!.text}
        ></Tag>
      )}
      {priority && (
        <Tag
          background={prioritySelected!.background}
          name="prioridade"
          text={prioritySelected!.text}
        ></Tag>
      )}
      <S.DateHour>
        {date}: {time}
      </S.DateHour>
      <CheckBox checked={concluded} id={id as number} />
      <S.Paragraph>{name}</S.Paragraph>
      <S.ContainerDescription>{description}</S.ContainerDescription>
    </S.Container>
  )
}
