import { IoMoon, IoSunnySharp } from 'react-icons/io5'
import * as S from './styles'

interface ITheme {
  isDark: boolean
  changeTheme: () => void
}

export default function ChangeTheme({ changeTheme, isDark }: ITheme) {
  return (
    <S.ContainerTheme
      onClick={changeTheme}
      title="change theme"
      data-testid="change theme"
    >
      <i title="icon theme">{isDark ? <IoSunnySharp /> : <IoMoon />}</i>
    </S.ContainerTheme>
  )
}
