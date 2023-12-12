import { useModal } from '../../context/modals'
import CardDetail from '../CardDetail'
import FormAddAnotation from '../FormAddAnnotation'
import * as S from './styles'

export default function Modal() {
  const { isVisible, isForm } = useModal()

  return (
    <S.Container $visible={isVisible}>
      {isForm ? <FormAddAnotation /> : <CardDetail />}
    </S.Container>
  )
}
