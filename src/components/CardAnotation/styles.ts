import styled from 'styled-components'
import { Container as Checkbox } from '../Checkbox/styles'

export const Container = styled.div`
  height: 200px;
  width: 300px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.shadow};
  box-shadow: 2px 2px 7px 0px ${(props) => props.theme.color.hardShadow};

  ${Checkbox} {
    margin-top: -8px;
  }

  &:hover {
    box-shadow: 4px 4px 10px 3px ${(props) => props.theme.color.hardShadow};
  }

  @media (max-width: 820px) {
    width: 250px;
    margin-bottom: 20px;
  }
`

export const Paragraph = styled.p`
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  padding: 16px 0;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const DateHour = styled(Paragraph)`
  color: ${(props) => props.theme.color.darkShadow};
  font-weight: 400;
  margin: 12px 0;
  padding: 0;
`

export const ContainerButton = styled.div`
  padding: 8px 0;
`

export const Button = styled.button`
  padding: 8px;
  border-radius: 8px;
  margin-right: 16px;
  font-weight: bold;
  cursor: pointer;
`

export const ButtonEdit = styled(Button)`
  background-color: ${(props) => props.theme.color.blue};
`

export const ButtonDelete = styled(Button)`
  background-color: ${(props) => props.theme.color.red};
`

export const ContainerSpan = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > span {
    margin-top: 6px;
  }
`
