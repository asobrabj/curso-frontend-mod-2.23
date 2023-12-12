import styled from 'styled-components'
import { ContainerTheme } from '../ChangeTheme/styles'
import { NewAnotation } from '../NewAnotation/styles'
import { Input } from '../Search/styles'

export const Container = styled.nav`
  border-right: 1px solid ${(props) => props.theme.color.shadow};
  width: 240px;
  height: 100%;
  text-align: center;
`

export const ContainerExtras = styled.div`
  display: none;
  position: relative;
  height: 150px;

  > ${Input} {
    margin-top: 10px;
    margin-left: 0;
    width: 200px;
  }

  > ${NewAnotation} {
    margin: 10px 0;
    top: 50px;
    left: 20px;
    padding: 2px;
  }

  > ${ContainerTheme} {
    margin-left: 20px;
    margin-top: 60px;
  }

  @media (max-width: 820px) {
    display: block;
  }

  border-bottom: 1px solid ${(props) => props.theme.color.shadow};
`
