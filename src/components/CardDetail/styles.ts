import styled from 'styled-components'
import { Container as Checkbox } from '../Checkbox/styles'

export const Container = styled.div`
  position: relative;
  height: 300px;
  width: 500px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.shadow};

  > div {
    margin-bottom: 12px;
  }

  ${Checkbox} {
    margin-top: -8px;
  }
`
export const Paragraph = styled.p`
  margin: 12px 0;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
`
export const DateHour = styled(Paragraph)`
  color: ${(props) => props.theme.color.shadow};
`

export const ContainerDescription = styled.div`
  margin-top: 16px;
  overflow-wrap: break-word;
  max-width: 100%;
  height: 120px;
  overflow-y: auto;
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
