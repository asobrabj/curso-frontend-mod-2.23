/* eslint-disable react-hooks/exhaustive-deps */
import { MdOutlineChecklistRtl } from 'react-icons/md'
import ChangeTheme from '../ChangeTheme'
import NewAnotation from '../NewAnotation'
import Search from '../Search'
import * as S from './styles'

interface ITheme {
  isDark: boolean
  changeTheme: () => void
}

export default function Header({ changeTheme, isDark }: ITheme) {
  return (
    <S.Container className="container">
      <div>
        <MdOutlineChecklistRtl />
        <S.Heading>
          {' '}
          <a href="/">Anotações</a>{' '}
        </S.Heading>
      </div>
      <S.ContainerExtras>
        <Search />
        <ChangeTheme changeTheme={changeTheme} isDark={isDark} />
        <NewAnotation />
      </S.ContainerExtras>
    </S.Container>
  )
}
