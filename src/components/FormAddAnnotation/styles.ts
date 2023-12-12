import styled from 'styled-components'
import { Button } from '../CardAnotation/styles'

export const Container = styled.div`
  position: relative;
  padding: 16px;
  height: 500px;
  width: 350px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.shadow};
`
export const Icon = styled.i`
  position: absolute;
  right: 8px;
  top: 5px;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  color: ${(props) => props.theme.color.red};
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Heading = styled.h2`
  font-style: italic;
  text-align: center;
  margin-bottom: 24px;
`

export const ContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ButtonSave = styled(Button)`
  background-color: ${(props) => props.theme.color.green};
`

export const ButtonCancel = styled(Button)`
  background-color: ${(props) => props.theme.color.red};
`

export const Paragraph = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: red;
`
