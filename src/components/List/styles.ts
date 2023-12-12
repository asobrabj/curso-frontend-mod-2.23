import styled from 'styled-components'

interface IListStyle {
  $visible: boolean
}

export const Container = styled.div``
export const Form = styled.form``

export const ListItem = styled.li<IListStyle>`
  padding: 16px;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid ${(props) => props.theme.color.shadow};
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  transition: opacity 1s ease-in-out;
`

export const List = styled.ul`
  text-transform: capitalize;
  cursor: pointer;
  > .paragraph {
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    padding: 16px 0;
    border-bottom: 1px solid ${(props) => props.theme.color.shadow};

    > i {
      margin-right: 5px;
    }
  }
`

export const Button = styled.button`
  border: none;
  font-size: 32px;
  color: ${(props) => props.theme.color.greenDark};
  cursor: pointer;
`
