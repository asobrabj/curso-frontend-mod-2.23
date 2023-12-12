import dataList from '../../model/list'
import ChangeTheme from '../ChangeTheme'
import List from '../List'
import NewAnotation from '../NewAnotation'
import Search from '../Search'
import * as S from './styles'

interface ITheme {
  isDark: boolean
  changeTheme: () => void
}

export default function Sidebar({ changeTheme, isDark }: ITheme) {
  return (
    <S.Container data-testid="sidebar">
      {dataList.map((item, index) => (
        <List key={index} {...item} />
      ))}
      <S.ContainerExtras>
        <Search />
        <NewAnotation />
        <ChangeTheme changeTheme={changeTheme} isDark={isDark} />
      </S.ContainerExtras>
    </S.Container>
  )
}
