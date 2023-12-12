import { useStorage } from '../../context/localStorage/localStorage'
import { useModal } from '../../context/modals'
import dataList from '../../model/list'
import IAnotation from '../../types/anotation'
import CheckBox from '../Checkbox'
import Tag from '../Tag'
import * as S from './styles'

export interface ICard extends IAnotation {
  id: number | null
}

export default function CardAnotation({
  id,
  name,
  date,
  time,
  category,
  priority,
  concluded,
  description,
}: ICard) {
  const { setIsVisible, setIsForm, setDataCard, setIdCard } = useModal()
  const { anotations, setAnotations } = useStorage()
  const [categories, priorities] = dataList
  const storage = anotations

  const openCardDetail = () => {
    setDataCard({
      id,
      name,
      date,
      time,
      category,
      priority,
      concluded,
      description,
    })
    setIsVisible(true)
    setIsForm(false)
  }

  const openForm = () => {
    setIdCard(id)
    if (storage instanceof Array) {
      const data = storage.find((item) => item.id === id)

      setDataCard(data as IAnotation)
    }
    setIsVisible(true)
    setIsForm(true)
  }

  const deleteAnotation = (id: number) => {
    const newAnotation = storage!.filter((item) => item.id !== id)
    setAnotations(newAnotation)
  }

  const categorySelected = categories.options.find(
    (item) => item.text === category
  )
  const prioritySelected = priorities.options.find(
    (item) => item.text === priority
  )

  return (
    <S.Container title="card">
      {category && (
        <Tag
          background={categorySelected?.background}
          name="categoria"
          text={categorySelected?.text}
        ></Tag>
      )}
      {priority && (
        <Tag
          background={prioritySelected?.background}
          name="prioridade"
          text={prioritySelected?.text}
        ></Tag>
      )}
      <S.ContainerSpan>
        <S.DateHour>
          {date}: {time}
        </S.DateHour>
        <span>
          <CheckBox checked={concluded} id={id as number} />
        </span>
      </S.ContainerSpan>
      <S.Paragraph onClick={openCardDetail} title="paragraph-name">
        {name}
      </S.Paragraph>
      <S.ContainerButton>
        <S.ButtonEdit
          type="button"
          onClick={openForm}
          data-testid="editar-button"
        >
          Editar
        </S.ButtonEdit>
        <S.ButtonDelete
          title="button delete"
          type="button"
          onClick={() => deleteAnotation(id!)}
        >
          Excluir
        </S.ButtonDelete>
      </S.ContainerButton>
    </S.Container>
  )
}
