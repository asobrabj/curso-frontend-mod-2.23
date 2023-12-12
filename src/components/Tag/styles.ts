import styled from 'styled-components'

interface ITagStyle {
  $background: string
}

export const Tag = styled.span<ITagStyle>`
  text-transform: capitalize;
  padding: 2px 9px;
  background-color: ${(props) => props.theme.color[props.$background]};
  border: 1px solid ${(props) => props.theme.color.shadow};
  border-radius: 10px;
  font-weight: bold;
  margin-right: 8px;
  cursor: pointer;
`
