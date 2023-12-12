import { CiCirclePlus } from 'react-icons/ci'
import { useModal } from '../../context/modals'
import * as S from './styles'

export default function NewAnotation() {
  const { setIsVisible, setIsForm } = useModal()

  const handleNewAnotation = () => {
    setIsForm(true)
    setIsVisible(true)
  }
  return (
    <S.NewAnotation onClick={handleNewAnotation} title="new-anotation">
      <S.Paragraph>Nova Anotação</S.Paragraph>
      <S.Icon>
        <CiCirclePlus />
      </S.Icon>
    </S.NewAnotation>
  )
}
