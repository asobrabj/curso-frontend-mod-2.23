import styled from 'styled-components'

export const Container = styled.main`
  padding: 32px;
  margin: auto;
  z-index: 0;
`
export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    display: block;
  }
`

export const ContainerArrows = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;

  > button {
    border: none;
    font-size: 23px;
    margin-right: 16px;
    cursor: pointer;

    &:active {
      font-size: 22px;
      &.mg {
        margin-right: 17px;
      }
    }

    &:disabled {
      cursor: auto;
      > svg {
        fill: #777;
      }
    }
  }
`
export const ContainerNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Icon = styled.i`
  font-size: 150px;
  color: ${(props) => props.theme.color.shadow};
`
export const Paragraph = styled.p`
  font-size: 32px;

  > span {
    font-style: italic;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`
