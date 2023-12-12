import styled from 'styled-components'
import { ContainerTheme } from '../ChangeTheme/styles'
import { NewAnotation } from '../NewAnotation/styles'
import { Input } from '../Search/styles'

export const Container = styled.header`
  position: relative;
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.color.shadow};

  > div {
    display: flex;
    align-items: center;
  }
`

export const Heading = styled.h1`
  margin-left: 16px;
  font-style: italic;
  > a {
    text-decoration: none;
  }
`

export const ContainerExtras = styled.div`
  @media (max-width: 820px) {
    > ${Input} {
      display: none;
    }
    > ${NewAnotation} {
      display: none;
    }
    > ${ContainerTheme} {
      display: none;
    }
  }
`
