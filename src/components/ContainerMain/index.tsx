import Anotations from '../Anotations'
import Sidebar from '../Sidebar'
import * as S from './styles'

interface ITheme {
  isDark: boolean
  changeTheme: () => void
}

export default function ContainerMain({ changeTheme, isDark }: ITheme) {
  return (
    <S.Container className="container">
      <Sidebar changeTheme={changeTheme} isDark={isDark} />
      <Anotations />
    </S.Container>
  )
}
