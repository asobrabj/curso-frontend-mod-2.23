import { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { useStorage } from '../../context/localStorage/localStorage'
import { useModal } from '../../context/modals'
import dataList from '../../model/list'
import InputLabel from '../InputLabel'
import SelectLabel from '../SelectLabel'
import TextAreaLabel from '../TextAreaLabel'
import * as S from './styles'

export interface IFormData {
  id: number
  name: string
  date: string
  time: string
  category?: string
  priority?: string
  description?: string
  concluded: boolean
}

export default function FormAddAnotation() {
  const { setIsVisible, idCard, setIdCard } = useModal()
  const { anotations, setAnotations, getStorage } = useStorage()
  const initialData = {
    id: 0,
    name: '',
    date: '',
    time: '',
    category: '',
    priority: '',
    description: '',
    concluded: false,
  }
  const [formData, setFormData] = useState<IFormData>(initialData)
  const [error, setError] = useState<boolean>(false)

  const category = dataList[0].options.map((option) => option.text)
  const priority = dataList[1].options.map((option) => option.text)

  const handleChange = ({
    target,
  }: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >) => {
    const { value, name } = target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { date, time } = formData
    const currentDate = new Date()
    const dateTime = new Date(`${date}T${time}`)
    const storage = anotations

    let newAnotations: Array<IFormData> | IFormData = []
    let newFormData = {} as IFormData
    let lastId = 0
    if (storage instanceof Array) {
      const anotationExist = storage.find((item) => item.id === idCard)

      if (!anotationExist) {
        let idExist = true
        while (idExist) {
          const id = Math.floor(Math.random() * 10000) + 1
          idExist = storage.some((item) => item.id === id)
          lastId = id
        }
        newFormData = { ...formData, id: lastId } as IFormData
        newAnotations = newFormData
      } else {
        newFormData = { ...formData, id: idCard as number }
        const storage = getStorage('anotations')
        newAnotations = (storage as Array<IFormData>).map((item) =>
          item.id === idCard ? { ...item, ...formData } : item
        ) as Array<IFormData>
      }
    }

    setFormData(newFormData)

    if (+currentDate < +dateTime) {
      setAnotations(newAnotations)
      setError(false)
      setIsVisible(false)
    } else {
      setError(true)
      return
    }
  }

  const cancelButton = () => {
    setIdCard(null)
    setIsVisible(false)
    setFormData(initialData)
  }

  return (
    <S.Container>
      <S.Icon onClick={() => setIsVisible(false)} title="close form">
        <MdOutlineClose />
      </S.Icon>
      <S.Form onSubmit={(e) => onSubmit(e)}>
        <S.Heading>formulario</S.Heading>
        <InputLabel
          id="name"
          label="Nome"
          required
          type="text"
          width="350"
          mgBottom="25"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={formData.name}
        />
        <S.ContainerFlex>
          <InputLabel
            id="date"
            label="Data"
            required
            type="date"
            width="150"
            mgBottom="25"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={formData.date}
          />
          <InputLabel
            id="time"
            label="Hora"
            required
            type="time"
            width="150"
            mgBottom="25"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={formData.time}
          />
        </S.ContainerFlex>
        <S.ContainerFlex>
          <SelectLabel
            id="category"
            label="Categoria"
            listOptions={category}
            required={false}
            width="150"
            mgBottom="25"
            tTransform="capitalize"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange(e)
            }
            value={formData.category}
          />
          <SelectLabel
            id="priority"
            label="Prioridade"
            listOptions={priority}
            required={false}
            width="150"
            mgBottom="25"
            tTransform="capitalize"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange(e)
            }
            value={formData.priority}
          />
        </S.ContainerFlex>
        <TextAreaLabel
          title="message"
          id="description"
          label="Descrição"
          required={false}
          width="350"
          mgBottom="25"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(e)
          }
          value={formData.description}
        />
        <S.ContainerFlex>
          <S.ButtonSave type="submit">Salvar</S.ButtonSave>
          <S.ButtonCancel type="button" onClick={cancelButton}>
            Cancelar
          </S.ButtonCancel>
        </S.ContainerFlex>
        {error && (
          <S.Paragraph>Não é possivel selecionar uma data passada</S.Paragraph>
        )}
      </S.Form>
    </S.Container>
  )
}
