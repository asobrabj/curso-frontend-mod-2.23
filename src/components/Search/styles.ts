import styled from 'styled-components'

export const Input = styled.input`
  margin-left: 120px;
  border: 1px solid;
  border-radius: 8px;
  width: 300px;
  padding: 8px;
  font-size: 16px;
  font-weight: bold;

  &::placeholder {
    color: ${(props) => props.theme.color.shadow};
  }
`
