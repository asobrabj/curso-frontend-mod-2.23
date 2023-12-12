import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.shadow};
  font-weight: bold;
  > input {
    margin-right: 8px;
  }
`
